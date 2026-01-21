export const useSpaceships = () => {
  const spaceships = ref([])

  const loadSpaceships = () => {
    const stored = localStorage.getItem('spaceships')
    if (stored) {
      spaceships.value = JSON.parse(stored)
    }
  }

  const saveSpaceship = (spaceship: any) => {
    spaceships.value.push(spaceship)
    localStorage.setItem('spaceships', JSON.stringify(spaceships.value))
  }

  return {
    spaceships: readonly(spaceships),
    loadSpaceships,
    saveSpaceship
  }
}