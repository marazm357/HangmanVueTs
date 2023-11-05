<script setup lang="ts">
import GameHeader from '@/components/GameHeader.vue'
import GameFigure from '@/components/GameFigure.vue'
import GameWrongLetters from '@/components/GameWrongLetters.vue';
import GameWord from '@/components/GameWord.vue';
import GamePopup from '@/components/GamePopup.vue'
import GameNotification from '@/components/GameNotification.vue'
import { ref, watch } from 'vue';
import { useRandomWorld } from '@/composables/useRandomWorld';
import { useLetters } from './composables/useLetters';
import { useNotification } from './composables/useNotification';

const { word, getRandomWorld } = useRandomWorld()
const { letters, correctLetters, wrongLetters, isLose, isWin, addLetter, resetLetters } = useLetters(word)
const { notification, showNotification } = useNotification()
const popup = ref<InstanceType<typeof GamePopup> | null>(null)
const restart = async () => {
  await getRandomWorld()
  resetLetters()
  popup.value?.close()
}

watch(wrongLetters, ()=> {
  if (isLose.value) {
    popup.value?.open('lose')
  }
})

watch(correctLetters, ()=> {
  if (isWin.value){
    popup.value?.open('win')
  }
})

window.addEventListener('keydown', ({ key }) => {
  if (isLose.value || isWin.value) {
    return
  }

  if (letters.value.includes(key)) {
    showNotification()
  }
  
  addLetter(key)
})
</script>

<template>
<div id="app">
  <GameHeader></GameHeader>
  <div class="game-container">
    <GameFigure :wrong-letters-count="wrongLetters.length"></GameFigure>
    <GameWrongLetters :wrong-letters="wrongLetters"></GameWrongLetters>
    <GameWord :word="word" :correct-letters="correctLetters"></GameWord>
  </div>
  <GamePopup ref="popup" :word="word" @restart="restart"></GamePopup>
  <!-- Container for final message -->
  <GameNotification ref="notification"></GameNotification>

  <!-- Notification -->
  
</div>
</template>

<style scoped>

</style>
@/api/getRandomName