<script setup>
import { computed } from 'vue'
import { STATUS_META, PRIORITY_META } from '../utils/meta'

const props = defineProps({
  order: { type: Object, required: true },
})
const emit = defineEmits(['advance'])

const status = computed(() => STATUS_META[props.order.status])
const priority = computed(() => PRIORITY_META[props.order.priority])
const progress = computed(() =>
  props.order.quantity ? Math.round((props.order.completed / props.order.quantity) * 100) : 0,
)
</script>

<template>
  <v-card
    class="wo-card mb-3"
    :class="`border-status-${order.status}`"
    variant="elevated"
    elevation="2"
  >
    <div class="d-flex">
      <div class="status-rail" :class="`bg-${status.color}`"></div>
      <div class="flex-grow-1 pa-4">
        <div class="d-flex align-center justify-space-between mb-1">
          <span class="text-caption text-medium-emphasis font-weight-medium">{{ order.id }}</span>
          <v-chip :color="priority.color" size="small" variant="tonal" label>
            {{ priority.label }} priority
          </v-chip>
        </div>

        <h3 class="text-h6 font-weight-bold mb-1">{{ order.title }}</h3>

        <div class="d-flex align-center text-body-2 text-medium-emphasis mb-3">
          <v-icon size="18" class="mr-1">mdi-map-marker-outline</v-icon>
          <span class="mr-3">{{ order.line }}</span>
          <v-icon size="18" class="mr-1">mdi-clock-outline</v-icon>
          <span>Due {{ order.dueTime }}</span>
        </div>

        <div class="d-flex align-center mb-1">
          <span class="text-caption text-medium-emphasis">
            {{ order.completed }} / {{ order.quantity }} units
          </span>
          <v-spacer />
          <span class="text-caption font-weight-bold">{{ progress }}%</span>
        </div>
        <v-progress-linear
          :model-value="progress"
          :color="status.color"
          height="8"
          rounded
          class="mb-3"
        />

        <div class="d-flex align-center">
          <v-icon size="18" class="mr-1 text-medium-emphasis">mdi-account-outline</v-icon>
          <span class="text-body-2 text-medium-emphasis">{{ order.assignee }}</span>
          <v-spacer />
          <v-btn
            :color="status.color"
            :prepend-icon="status.icon"
            variant="tonal"
            size="large"
            class="advance-btn"
            @click="emit('advance', order.id)"
          >
            {{ status.label }}
          </v-btn>
        </div>

        <div v-if="order.note" class="note-strip mt-3 pa-2 text-body-2">
          <v-icon size="16" class="mr-1">mdi-note-text-outline</v-icon>
          {{ order.note }}
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.wo-card {
  overflow: hidden;
}
.status-rail {
  width: 6px;
  flex: 0 0 6px;
}
.advance-btn {
  min-height: 48px;
}
.note-strip {
  background: rgba(var(--v-theme-on-surface), 0.05);
  border-radius: 10px;
  color: rgba(var(--v-theme-on-surface), 0.75);
}
</style>
