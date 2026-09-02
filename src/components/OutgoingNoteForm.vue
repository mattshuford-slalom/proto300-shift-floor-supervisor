<script setup>
import { computed } from 'vue'
import { useHandoffStore } from '../stores/handoff'
import { ISSUE_CATEGORIES, formatTime } from '../utils/meta'

const store = useHandoffStore()

const notes = computed({
  get: () => store.outgoing.notes,
  set: (v) => store.setNotes(v),
})

const quickInserts = [
  'Line running clean, no issues.',
  'Equipment flagged for maintenance — see issues.',
  'Short-staffed, covered with overtime.',
  'Rework units staged near QC bay.',
]

function insertSnippet(text) {
  const sep = store.outgoing.notes && !store.outgoing.notes.endsWith(' ') ? ' ' : ''
  store.setNotes(store.outgoing.notes + sep + text)
}
</script>

<template>
  <v-card variant="elevated" elevation="2" class="pa-4">
    <div class="d-flex align-center mb-3">
      <v-icon color="secondary" class="mr-2">mdi-account-arrow-left</v-icon>
      <span class="text-h6 font-weight-bold">Your Handoff Note</span>
    </div>

    <template v-if="!store.outgoing.submitted">
      <v-textarea
        v-model="notes"
        label="Notes for the incoming supervisor"
        variant="outlined"
        rows="4"
        auto-grow
        counter
        class="mb-2"
      />

      <div class="text-caption text-medium-emphasis mb-2">Quick add</div>
      <div class="d-flex flex-wrap ga-2 mb-4">
        <v-chip
          v-for="snip in quickInserts"
          :key="snip"
          variant="tonal"
          color="secondary"
          size="small"
          prepend-icon="mdi-plus"
          @click="insertSnippet(snip)"
        >
          {{ snip.length > 26 ? snip.slice(0, 26) + '…' : snip }}
        </v-chip>
      </div>

      <div class="text-caption text-medium-emphasis mb-2">Tag categories</div>
      <div class="d-flex flex-wrap ga-2 mb-4">
        <v-chip
          v-for="cat in ISSUE_CATEGORIES"
          :key="cat.value"
          :color="cat.color"
          :prepend-icon="cat.icon"
          :variant="store.outgoing.tags.includes(cat.value) ? 'flat' : 'outlined'"
          size="large"
          label
          @click="store.toggleTag(cat.value)"
        >
          {{ cat.label }}
        </v-chip>
      </div>

      <v-btn
        block
        size="x-large"
        color="primary"
        prepend-icon="mdi-send"
        :disabled="!store.canSubmit"
        @click="store.submit()"
      >
        Submit Handoff
      </v-btn>
    </template>

    <template v-else>
      <v-alert type="success" variant="tonal" class="mb-3" icon="mdi-check-circle">
        Handoff submitted at {{ formatTime(store.outgoing.submittedAt) }}
      </v-alert>
      <p class="text-body-1 mb-3" style="line-height: 1.6">{{ store.outgoing.notes }}</p>
      <div class="d-flex flex-wrap ga-2 mb-4">
        <v-chip
          v-for="tag in store.outgoing.tags"
          :key="tag"
          variant="tonal"
          size="small"
          label
        >
          {{ tag }}
        </v-chip>
      </div>
      <v-btn variant="tonal" color="primary" prepend-icon="mdi-pencil" block size="large" @click="store.edit()">
        Edit Note
      </v-btn>
    </template>
  </v-card>
</template>
