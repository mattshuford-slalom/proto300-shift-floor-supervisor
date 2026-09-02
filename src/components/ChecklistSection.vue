<script setup>
import { computed } from 'vue'

const props = defineProps({
  section: { type: Object, required: true },
  progress: { type: Number, required: true },
})
const emit = defineEmits(['toggle'])

const done = computed(() => props.section.items.filter((i) => i.checked).length)
</script>

<template>
  <v-card class="mb-4" variant="elevated" elevation="2">
    <div class="d-flex align-center pa-4 pb-2">
      <v-avatar :color="progress === 100 ? 'success' : 'surface-variant'" size="44" class="mr-3">
        <v-icon :color="progress === 100 ? 'white' : 'primary'">{{ section.icon }}</v-icon>
      </v-avatar>
      <div class="flex-grow-1">
        <div class="text-subtitle-1 font-weight-bold">{{ section.title }}</div>
        <div class="text-caption text-medium-emphasis">{{ done }} of {{ section.items.length }} checked</div>
      </div>
      <v-icon v-if="progress === 100" color="success" size="28">mdi-check-circle</v-icon>
    </div>

    <v-progress-linear
      :model-value="progress"
      :color="progress === 100 ? 'success' : 'primary'"
      height="4"
    />

    <v-list class="py-0" bg-color="transparent">
      <template v-for="(item, idx) in section.items" :key="item.id">
        <v-list-item
          class="checklist-item px-4"
          :class="{ 'item-checked': item.checked }"
          @click="emit('toggle', section.id, item.id)"
        >
          <template #prepend>
            <v-checkbox-btn
              :model-value="item.checked"
              :color="item.checked ? 'success' : 'primary'"
              @click.stop="emit('toggle', section.id, item.id)"
            />
          </template>
          <v-list-item-title class="text-body-1 text-wrap" :class="{ 'text-decoration-line-through text-medium-emphasis': item.checked }">
            {{ item.label }}
          </v-list-item-title>
          <template #append>
            <v-chip v-if="item.required" size="x-small" color="error" variant="tonal" label>
              Required
            </v-chip>
          </template>
        </v-list-item>
        <v-divider v-if="idx < section.items.length - 1" />
      </template>
    </v-list>
  </v-card>
</template>

<style scoped>
.checklist-item {
  min-height: 56px;
}
.item-checked {
  background: rgba(var(--v-theme-success), 0.06);
}
</style>
