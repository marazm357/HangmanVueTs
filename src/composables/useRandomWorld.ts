import { getRandomName } from "@/api/getRandomName"
import { onMounted, ref } from "vue"

export const useRandomWorld = () => {
  const word = ref('')
  const getRandomWorld = async () => {
  try {
    const name = await getRandomName()
    word.value = name.toLowerCase()
  } catch (e) {
    console.log(e)
    word.value = ''
  }
  
}
  onMounted(() => {
    getRandomWorld()
  })
  return {
    word,
    getRandomWorld
  }
}