import { ref } from 'vue'

const activeInfoBoxId = ref<string | null>(null)
let idCounter = 0

export const useInfoBox = () => {
  const id = `infobox-${++idCounter}`

  const open = () => {
    activeInfoBoxId.value = id
  }

  const close = () => {
    if (activeInfoBoxId.value === id) {
      activeInfoBoxId.value = null
    }
  }

  const isOpen = () => activeInfoBoxId.value === id

  return {
    id,
    open,
    close,
    isOpen
  }
}
