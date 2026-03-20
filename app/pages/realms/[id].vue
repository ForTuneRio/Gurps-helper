<template>
  <div>
    <div class="mb-4 flex items-center gap-2">
      <button
        @click="goBackToList"
        class="inline-flex items-center gap-2 rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100 dark:bg-blue-900/40 dark:text-blue-200 dark:hover:bg-blue-900/60"
      >
        <span aria-hidden="true">←</span>
        Back to list
      </button>
      <button
        v-if="canShare && !isViewOnly"
        type="button"
        @click="shareRealm"
        class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Share URL
      </button>
      <button
        v-if="canSaveRealm && !isViewOnly"
        type="submit"
        form="realm-form"
        :disabled="loading"
        class="inline-flex items-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {{ loading ? 'Saving...' : 'Save' }}
      </button>
    </div>

    <div v-if="shareMessage" class="mb-3 rounded-md bg-indigo-50 px-3 py-2 text-sm text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200">
      {{ shareMessage }}
    </div>

    <div v-if="isViewOnly && !isNew" class="mb-3 rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
      You are viewing this realm in read-only mode.
    </div>

    <div v-if="isNew" class="p-4">
      <RealmBuilder :read-only="isViewOnly" @dirty="realmBuilderDirty = $event" @saved-meta="onBuilderSavedMeta" />
    </div>
    <div v-else>
      <div v-if="loading && !realmAccess" class="py-8 text-gray-600 dark:text-gray-300">Loading realm...</div>
      <div v-else-if="loadError" class="py-8 text-red-600 dark:text-red-400">{{ loadError }}</div>
      <div v-else-if="!realmAccess" class="py-8 text-red-600 dark:text-red-400">Realm not found.</div>
      <div v-else class="p-4">
        <RealmBuilder
          :realm-id="canSaveRealm ? realmId : undefined"
          :realm-data="realmAccess.realm"
          :read-only="isViewOnly"
          :base-version="realmVersion"
          @dirty="realmBuilderDirty = $event"
          @saved-meta="onBuilderSavedMeta"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed, ref, watch } from 'vue'
import { useRealms } from '~/composables/useRealms'

const user = useSupabaseUser()
// Use watch with a small delay so transient auth token refreshes during rapid saves
// don't falsely trigger a redirect to login.
let authRedirectTimer: ReturnType<typeof setTimeout> | null = null
watch(user, (val) => {
  if (val) {
    if (authRedirectTimer) {
      clearTimeout(authRedirectTimer)
      authRedirectTimer = null
    }
    return
  }
  authRedirectTimer = setTimeout(() => {
    if (!user.value) navigateTo('/auth/login')
  }, 2000)
}, { immediate: true })

const route = useRoute()
const realmId = computed(() => String(route.params.id || ''))
const isNew = computed(() => realmId.value === 'new')
const shareToken = computed(() => {
  const raw = route.query.share
  return typeof raw === 'string' ? raw : ''
})

const { getRealmForRoute, enableRealmSharing, loading } = useRealms()
const realmBuilderDirty = ref(false)
const realmAccess = ref<Awaited<ReturnType<typeof getRealmForRoute>>>(null)
const loadError = ref('')
const shareMessage = ref('')
const realmVersion = ref(1)
const liveRefreshTimer = ref<number | null>(null)

const canSaveRealm = computed(() => {
  if (isNew.value) return true
  return Boolean(realmAccess.value?.isOwner)
})

const canShare = computed(() => !isNew.value && Boolean(realmAccess.value?.isOwner))

const isViewOnly = computed(() => {
  if (isNew.value) return false
  return Boolean(shareToken.value) || !canSaveRealm.value
})

const loadRealm = async () => {
  if (isNew.value) return

  loadError.value = ''
  try {
    const data = await getRealmForRoute(realmId.value, shareToken.value || undefined)
    realmAccess.value = data
    if (data) {
      realmVersion.value = data.version
    }
  } catch (e: any) {
    realmAccess.value = null
    loadError.value = e?.message || 'Failed to load realm.'
  }
}

const syncLiveRefreshTimer = () => {
  if (liveRefreshTimer.value !== null) {
    window.clearInterval(liveRefreshTimer.value)
    liveRefreshTimer.value = null
  }

  if (!isViewOnly.value || isNew.value) return

  liveRefreshTimer.value = window.setInterval(() => {
    void loadRealm()
  }, 15 * 1000)
}

onMounted(async () => {
  await loadRealm()
  syncLiveRefreshTimer()
})

onUnmounted(() => {
  if (liveRefreshTimer.value !== null) {
    window.clearInterval(liveRefreshTimer.value)
  }
})

watch([realmId, shareToken], async () => {
  if (isNew.value) return
  await loadRealm()
  syncLiveRefreshTimer()
})

watch(isViewOnly, () => {
  syncLiveRefreshTimer()
})

const shareRealm = async () => {
  if (!canShare.value) return

  shareMessage.value = ''
  try {
    const { shareUrl } = await enableRealmSharing(realmId.value)
    await navigator.clipboard.writeText(shareUrl)
    shareMessage.value = 'Share URL copied to clipboard.'
  } catch (e: any) {
    shareMessage.value = e?.message || 'Failed to create share URL.'
  }
}

const onBuilderSavedMeta = (payload: { version: number; updatedAt: string | null }) => {
  realmVersion.value = payload.version
  if (realmAccess.value) {
    realmAccess.value = {
      ...realmAccess.value,
      version: payload.version,
      updatedAt: payload.updatedAt
    }
  }
}

const goBackToList = () => {
  if (realmBuilderDirty.value && canSaveRealm.value && !isViewOnly.value) {
    const confirmed = window.confirm('You have unsaved changes. Do you want to leave without saving?')
    if (!confirmed) return
  }
  navigateTo('/realms')
}
</script>
