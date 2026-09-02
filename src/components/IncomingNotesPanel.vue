<script setup>
import { categoryMeta, formatTime } from '../utils/meta'

defineProps({
  incoming: { type: Object, required: true },
})
</script>

<template>
  <v-card class="mb-4 incoming-card" variant="elevated" elevation="2">
    <div class="incoming-header pa-4">
      <div class="d-flex align-center mb-1">
        <v-icon color="white" class="mr-2">mdi-account-arrow-right</v-icon>
        <span class="text-overline text-white">Handoff Received</span>
        <v-spacer />
        <span class="text-caption text-white">{{ formatTime(incoming.timestamp) }}</span>
      </div>
      <div class="text-body-2 text-white">
        From <strong>{{ incoming.fromSupervisor }}</strong> · {{ incoming.shiftId }}
      </div>
    </div>

    <div class="pa-4">
      <p class="text-body-1 mb-3" style="line-height: 1.6">{{ incoming.notes }}</p>
      <div class="d-flex flex-wrap ga-2">
        <v-chip
          v-for="tag in incoming.tags"
          :key="tag"
          :color="categoryMeta(tag).color"
          :prepend-icon="categoryMeta(tag).icon"
          variant="tonal"
          size="small"
          label
        >
          {{ categoryMeta(tag).label }}
        </v-chip>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.incoming-card {
  overflow: hidden;
}
.incoming-header {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-secondary)));
}
</style>
