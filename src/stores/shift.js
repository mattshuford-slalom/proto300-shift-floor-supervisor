import { defineStore } from 'pinia'

const SHIFTS = ['Day Shift', 'Swing Shift', 'Night Shift']
const LINES = ['Line A', 'Line B', 'Line C', 'Line D']

export const useShiftStore = defineStore('shift', {
  state: () => ({
    supervisor: 'A. Morgan',
    shift: 'Day Shift',
    line: 'Line A',
    shifts: SHIFTS,
    lines: LINES,
    date: '2026-09-02',
  }),
  getters: {
    shiftLabel: (state) => `${state.shift} · ${state.line}`,
  },
  actions: {
    setShift(shift) {
      this.shift = shift
    },
    setLine(line) {
      this.line = line
    },
  },
})
