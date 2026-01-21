export const useRealms = () => {
  const realms = ref([])

  const loadRealms = () => {
    const stored = localStorage.getItem('realms')
    if (stored) {
      realms.value = JSON.parse(stored)
    }
  }

  const saveRealm = (realm: any) => {
    realms.value.push(realm)
    localStorage.setItem('realms', JSON.stringify(realms.value))
  }

  return {
    realms: readonly(realms),
    loadRealms,
    saveRealm
  }
}