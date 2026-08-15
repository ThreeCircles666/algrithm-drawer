import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { AlgorithmId, LibraryItem } from '@/types/algorithm'
import { ALGORITHM_METAS, BUILTIN_LIBRARY } from '@/mock/algorithms'

const STORAGE_KEY = 'codeviz-library-generated'

function readGenerated(): LibraryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as LibraryItem[]
  } catch {
    return []
  }
}

export const useLibraryStore = defineStore('library', () => {
  const generated = ref<LibraryItem[]>(readGenerated())

  const items = computed(() => {
    const generatedIds = new Set(generated.value.map((item) => item.id))
    const builtins = BUILTIN_LIBRARY.filter((item) => !generatedIds.has(item.id))
    return [...generated.value, ...builtins]
  })

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(generated.value))
  }

  function saveAlgorithm(id: AlgorithmId) {
    const meta = ALGORITHM_METAS[id]
    const exists = generated.value.some((item) => item.id === id)
    if (exists) {
      generated.value = generated.value.map((item) =>
        item.id === id ? { ...item, savedAt: new Date().toISOString() } : item,
      )
    } else {
      generated.value = [
        {
          ...meta,
          source: 'generated',
          savedAt: new Date().toISOString(),
        },
        ...generated.value,
      ]
    }
    persist()
  }

  function isSaved(id: AlgorithmId) {
    return generated.value.some((item) => item.id === id)
  }

  return { items, generated, saveAlgorithm, isSaved }
})
