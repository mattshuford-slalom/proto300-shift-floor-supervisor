import { defineStore } from 'pinia'
import seed from '../data/issues.json'

let counter = 300

export const useIssuesStore = defineStore('issues', {
  state: () => ({
    issues: JSON.parse(JSON.stringify(seed)),
  }),
  getters: {
    openCount: (state) => state.issues.filter((i) => i.status === 'open').length,
    sorted: (state) =>
      [...state.issues].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
  },
  actions: {
    addIssue({ category, description, line }) {
      this.issues.unshift({
        id: `ISS-${++counter}`,
        category,
        description,
        line,
        timestamp: new Date().toISOString(),
        status: 'open',
      })
    },
    resolve(id) {
      const issue = this.issues.find((i) => i.id === id)
      if (issue) issue.status = issue.status === 'open' ? 'resolved' : 'open'
    },
  },
})
