<script setup>
import { computed } from 'vue'
import { useWorkOrdersStore } from '../stores/workOrders'
import WorkOrderCard from '../components/WorkOrderCard.vue'
import StatusFilterChips from '../components/StatusFilterChips.vue'

const store = useWorkOrdersStore()

const openCount = computed(
  () => store.counts.blocked + store.counts['in-progress'],
)
</script>

<template>
  <div>
    <v-alert
      v-if="openCount > 0"
      color="primary"
      variant="tonal"
      density="comfortable"
      class="mb-3 guidance"
      icon="mdi-gesture-tap-button"
    >
      <div class="text-body-2 font-weight-medium">
        {{ openCount }} work order{{ openCount === 1 ? '' : 's' }} need your attention
      </div>
      <div class="text-caption">
        Move each card forward with its button. On in-progress orders you can log
        units or add progress notes before marking complete.
      </div>
    </v-alert>
    <v-alert
      v-else
      color="success"
      variant="tonal"
      density="comfortable"
      class="mb-3"
      icon="mdi-check-decagram"
    >
      <div class="text-body-2 font-weight-medium">All work orders are closed out</div>
      <div class="text-caption">Nothing left to action this shift.</div>
    </v-alert>

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
        @advance="store.advance"
        @reopen="store.reopen"
        @log-units="store.logUnits"
        @add-update="store.addUpdate"
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
