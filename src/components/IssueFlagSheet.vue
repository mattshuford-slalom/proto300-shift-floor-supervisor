<script setup>
import { ref, computed } from 'vue'
import { useIssuesStore } from '../stores/issues'
import { useShiftStore } from '../stores/shift'
import { ISSUE_CATEGORIES } from '../utils/meta'

const model = defineModel({ type: Boolean, default: false })

const issues = useIssuesStore()
const shift = useShiftStore()

const category = ref('equipment')
const description = ref('')
const line = ref(shift.line)

const canSubmit = computed(() => description.value.trim().length > 0)

function submit() {
  if (!canSubmit.value) return
  issues.addIssue({
    category: category.value,
    description: description.value.trim(),
    line: line.value,
  })
  reset()
  model.value = false
}

function reset() {
  category.value = 'equipment'
  description.value = ''
  line.value = shift.line
}
</script>

<template>
  <v-bottom-sheet v-model="model" inset>
    <v-card class="rounded-t-xl">
      <div class="d-flex align-center pa-4 pb-2">
        <v-icon color="error" class="mr-2">mdi-flag-variant</v-icon>
        <span class="text-h6 font-weight-bold">Flag an Issue</span>
        <v-spacer />
        <v-btn icon="mdi-close" variant="text" @click="model = false" />
      </div>

      <v-divider />

      <div class="pa-4">
        <div class="text-caption text-medium-emphasis mb-2">Category</div>
        <div class="d-flex flex-wrap ga-2 mb-4">
          <v-chip
            v-for="cat in ISSUE_CATEGORIES"
            :key="cat.value"
            :color="cat.color"
            :prepend-icon="cat.icon"
            :variant="category === cat.value ? 'flat' : 'outlined'"
            size="large"
            label
            @click="category = cat.value"
          >
            {{ cat.label }}
          </v-chip>
        </div>

        <v-select
          v-model="line"
          :items="shift.lines"
          label="Line"
          variant="outlined"
          density="comfortable"
          prepend-inner-icon="mdi-map-marker-outline"
          class="mb-2"
        />

        <v-textarea
          v-model="description"
          label="Describe the issue"
          variant="outlined"
          rows="3"
          auto-grow
          autofocus
          class="mb-4"
        />

        <v-btn
          block
          size="x-large"
          color="error"
          prepend-icon="mdi-flag-checkered"
          :disabled="!canSubmit"
          @click="submit"
        >
          Report Issue
        </v-btn>
      </div>
    </v-card>
  </v-bottom-sheet>
</template>
