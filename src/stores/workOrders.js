import { defineStore } from 'pinia'
import seed from '../data/workOrders.json'

const STATUS_ORDER = ['blocked', 'in-progress', 'complete']

export const useWorkOrdersStore = defineStore('workOrders', {
  state: () => ({
    orders: JSON.parse(JSON.stringify(seed)).map((o) => ({ ...o, updates: [] })),
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
    logUnits(id, delta) {
      const order = this.orders.find((o) => o.id === id)
      if (!order) return
      const prev = order.completed
      order.completed = Math.min(order.quantity, Math.max(0, order.completed + delta))
      const applied = order.completed - prev
      if (applied !== 0) {
        order.updates.unshift({
          time: new Date().toISOString(),
          type: 'units',
          text: `${applied > 0 ? '+' : ''}${applied} units logged (${order.completed}/${order.quantity})`,
        })
      }
    },
    addUpdate(id, text) {
      const order = this.orders.find((o) => o.id === id)
      if (!order) return
      const t = text.trim()
      if (!t) return
      order.updates.unshift({ time: new Date().toISOString(), type: 'note', text: t })
    },
    setStatus(id, status) {
      const order = this.orders.find((o) => o.id === id)
      if (!order) return
      order.status = status
      if (status === 'complete') order.completed = order.quantity
    },
  },
})
