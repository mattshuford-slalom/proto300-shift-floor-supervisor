import { defineStore } from 'pinia'
import seed from '../data/checklist.json'

export const useChecklistStore = defineStore('checklist', {
  state: () => ({
    shiftId: seed.shiftId,
    sections: JSON.parse(JSON.stringify(seed.sections)),
  }),
  getters: {
    allItems: (state) => state.sections.flatMap((s) => s.items),
    totalCount() {
      return this.allItems.length
    },
    checkedCount() {
      return this.allItems.filter((i) => i.checked).length
    },
    requiredRemaining() {
      return this.allItems.filter((i) => i.required && !i.checked).length
    },
    progress() {
      return this.totalCount ? Math.round((this.checkedCount / this.totalCount) * 100) : 0
    },
    isComplete() {
      return this.requiredRemaining === 0
    },
    sectionProgress: (state) => (sectionId) => {
      const section = state.sections.find((s) => s.id === sectionId)
      if (!section) return 0
      const done = section.items.filter((i) => i.checked).length
      return section.items.length ? Math.round((done / section.items.length) * 100) : 0
    },
  },
  actions: {
    toggleItem(sectionId, itemId) {
      const section = this.sections.find((s) => s.id === sectionId)
      const item = section?.items.find((i) => i.id === itemId)
      if (item) item.checked = !item.checked
    },
    reset() {
      this.sections.forEach((s) => s.items.forEach((i) => (i.checked = false)))
    },
    completeAll() {
      this.sections.forEach((s) => s.items.forEach((i) => (i.checked = true)))
    },
  },
})
