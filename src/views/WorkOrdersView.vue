<script setup>
import { useWorkOrdersStore } from '../stores/workOrders'
import WorkOrderCard from '../components/WorkOrderCard.vue'
import StatusFilterChips from '../components/StatusFilterChips.vue'

const store = useWorkOrdersStore()
</script>

<template>
  <div>
    <div class="sticky-filters pb-2">
      <StatusFilterChips
        :active="store.activeFilter"
        :counts="store.counts"
        @select="store.setFilter"
      />
    </div>

    <v-slide-y-transition group tag="div">
      <WorkOrderCard
        v-for="order in store.filtered"
        :key="order.id"
        :order="order"
        @advance="store.cycleStatus"
      />
    </v-slide-y-transition>

    <v-card
      v-if="store.filtered.length === 0"
      class="pa-8 text-center"
      variant="tonal"
      color="surface-variant"
    >
      <v-icon size="48" class="mb-2 text-medium-emphasis">mdi-clipboard-check-outline</v-icon>
      <div class="text-body-1 text-medium-emphasis">No work orders in this status.</div>
    </v-card>

    <div class="text-center text-caption text-medium-emphasis mt-2 mb-2">
      Tap a status button to advance the work order
    </div>
  </div>
</template>

<style scoped>
.sticky-filters {
  position: sticky;
  top: 0;
  z-index: 3;
  background: rgb(var(--v-theme-background));
  margin: 0 -16px;
  padding: 8px 16px 0;
}
</style>
