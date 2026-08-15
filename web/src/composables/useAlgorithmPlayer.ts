import { computed, onUnmounted, ref, watch, type Ref } from 'vue'
import type { AlgorithmStep } from '@/types/algorithm'

const SPEED_MS: Record<number, number> = {
  0.5: 1600,
  1: 800,
  1.5: 530,
  2: 400,
}

export const SPEED_OPTIONS = [0.5, 1, 1.5, 2]

export function useAlgorithmPlayer<T>(steps: Ref<AlgorithmStep<T>[]>) {
  const currentIndex = ref(0)
  const isPlaying = ref(false)
  const speed = ref(1)
  let timer: ReturnType<typeof setTimeout> | null = null

  const currentStep = computed(() => steps.value[currentIndex.value] ?? null)
  const total = computed(() => steps.value.length)
  const isFirst = computed(() => currentIndex.value <= 0)
  const isLast = computed(() => currentIndex.value >= Math.max(steps.value.length - 1, 0))

  function clearTimer() {
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }
  }

  function scheduleNext() {
    clearTimer()
    if (!isPlaying.value) return
    if (currentIndex.value >= steps.value.length - 1) {
      isPlaying.value = false
      return
    }
    timer = setTimeout(() => {
      currentIndex.value += 1
      scheduleNext()
    }, SPEED_MS[speed.value] ?? 800)
  }

  function play() {
    if (steps.value.length === 0) return
    if (currentIndex.value >= steps.value.length - 1) {
      currentIndex.value = 0
    }
    isPlaying.value = true
    scheduleNext()
  }

  function pause() {
    isPlaying.value = false
    clearTimer()
  }

  function next() {
    pause()
    if (currentIndex.value < steps.value.length - 1) {
      currentIndex.value += 1
    }
  }

  function prev() {
    pause()
    if (currentIndex.value > 0) {
      currentIndex.value -= 1
    }
  }

  function reset() {
    pause()
    currentIndex.value = 0
  }

  function setSpeed(value: number) {
    speed.value = value
    if (isPlaying.value) scheduleNext()
  }

  watch(steps, () => {
    reset()
  })

  onUnmounted(() => {
    clearTimer()
  })

  return {
    currentIndex,
    currentStep,
    isPlaying,
    speed,
    total,
    isFirst,
    isLast,
    play,
    pause,
    next,
    prev,
    reset,
    setSpeed,
  }
}
