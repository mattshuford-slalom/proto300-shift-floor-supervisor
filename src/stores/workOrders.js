import { defineStore } from 'pinia'
import seed from '../data/workOrders.json'

const STATUS_ORDER = ['blocked', 'in-progress', 'complete']

export const useWorkOrdersStore = defineStore('workOrders', {
  state: () => ({
    orders: JSON.parse(JSON.stringify(seed)),
    activeFilter: 'all',
  }),
  getters: {
    filtered: (state) => {
      const list =
        state.activeFilter === 'all'
          ? state.orders
          : state.orders.filter((o) => o.status === state.activeFilter)
      return [...list].sort(
        (a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status),
      )
    },
    counts: (state) => ({
      all: state.orders.length,
      blocked: state.orders.filter((o) => o.status === 'blocked').length,
      'in-progress': state.orders.filter((o) => o.status === 'in-progress').length,
      complete: state.orders.filter((o) => o.status === 'complete').length,
    }),
  },
  actions: {
    setFilter(filter) {
      this.activeFilter = filter
    },
    advance(id) {
      const order = this.orders.find((o) => o.id === id)
      if (!order) return
      const idx = STATUS_ORDER.indexOf(order.status)
      if (idx < STATUS_ORDER.length - 1) {
        order.status = STATUS_ORDER[idx + 1]
        if (order.status === 'complete') order.completed = order.quantity
      }
    },
    reopen(id) {
      const order = this.orders.find((o) => o.id === id)
      if (!order) return
      order.status = 'in-progress'
    },
    setStatus(id, status) {
      const order = this.orders.find((o) => o.id === id)
      if (!order) return
      order.status = status
      if (status === 'complete') order.completed = order.quantity
    },
  },
})
