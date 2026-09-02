<script setup>
import { STATUS_META } from '../utils/meta'

defineProps({
  active: { type: String, required: true },
  counts: { type: Object, required: true },
})
const emit = defineEmits(['select'])

const filters = [
  { value: 'all', label: 'All', color: 'primary', icon: 'mdi-view-grid-outline' },
  { value: 'blocked', label: STATUS_META.blocked.label, color: STATUS_META.blocked.color, icon: STATUS_META.blocked.icon },
  { value: 'in-progress', label: STATUS_META['in-progress'].label, color: STATUS_META['in-progress'].color, icon: STATUS_META['in-progress'].icon },
  { value: 'complete', label: STATUS_META.complete.label, color: STATUS_META.complete.color, icon: STATUS_META.complete.icon },
]
</script>

<template>
  <div class="filter-scroll d-flex ga-2 pb-1">
    <v-chip
      v-for="f in filters"
      :key="f.value"
      :color="f.color"
      :variant="active === f.value ? 'flat' : 'tonal'"
      size="large"
      :prepend-icon="f.icon"
      class="filter-chip"
      @click="emit('select', f.value)"
    >
      {{ f.label }}
      <v-avatar
        class="ml-2"
        size="22"
        :color="active === f.value ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.08)'"
      >
        <span class="text-caption font-weight-bold">{{ counts[f.value] ?? 0 }}</span>
      </v-avatar>
    </v-chip>
  </div>
</template>

<style scoped>
.filter-scroll {
  overflow-x: auto;
  scrollbar-width: none;
}
.filter-scroll::-webkit-scrollbar {
  display: none;
}
.filter-chip {
  min-height: 44px;
  flex: 0 0 auto;
}
</style>
