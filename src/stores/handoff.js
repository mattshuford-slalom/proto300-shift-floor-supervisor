import { defineStore } from 'pinia'
import seed from '../data/handoffNotes.json'

export const useHandoffStore = defineStore('handoff', {
  state: () => ({
    incoming: { ...seed.incoming },
    outgoing: {
      notes: '',
      tags: [],
      submitted: false,
      submittedAt: null,
    },
  }),
  getters: {
    canSubmit: (state) => state.outgoing.notes.trim().length > 0,
  },
  actions: {
    toggleTag(tag) {
      const idx = this.outgoing.tags.indexOf(tag)
      if (idx === -1) this.outgoing.tags.push(tag)
      else this.outgoing.tags.splice(idx, 1)
    },
    setNotes(text) {
      this.outgoing.notes = text
    },
    submit() {
      if (!this.canSubmit) return
      this.outgoing.submitted = true
      this.outgoing.submittedAt = new Date().toISOString()
    },
    edit() {
      this.outgoing.submitted = false
      this.outgoing.submittedAt = null
    },
  },
})
