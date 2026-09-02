<script setup>
import { ref } from 'vue'
import { useChecklistStore } from '../stores/checklist'
import ChecklistSection from '../components/ChecklistSection.vue'
import ChecklistProgressBar from '../components/ChecklistProgressBar.vue'

const store = useChecklistStore()
const snackbar = ref(false)
</script>

<template>
  <div>
    <ChecklistProgressBar
      :progress="store.progress"
      :checked="store.checkedCount"
      :total="store.totalCount"
      :required-remaining="store.requiredRemaining"
      :complete="store.isComplete && store.checkedCount > 0"
    />

    <ChecklistSection
      v-for="section in store.sections"
      :key="section.id"
      :section="section"
      :progress="store.sectionProgress(section.id)"
      @toggle="store.toggleItem"
    />

    <div class="d-flex ga-2 mb-2">
      <v-btn
        variant="tonal"
        color="primary"
        size="large"
        class="flex-grow-1"
        prepend-icon="mdi-check-all"
        @click="store.completeAll(); snackbar = true"
      >
        Check All
      </v-btn>
      <v-btn
        variant="tonal"
        color="error"
        size="large"
        class="flex-grow-1"
        prepend-icon="mdi-restore"
        @click="store.reset()"
      >
        Reset
      </v-btn>
    </div>

    <v-snackbar v-model="snackbar" :timeout="2000" color="success" location="top">
      <v-icon class="mr-2">mdi-shield-check</v-icon>
      Checklist marked complete
    </v-snackbar>
  </div>
</template>
