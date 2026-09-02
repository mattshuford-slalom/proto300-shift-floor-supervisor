<script setup>
import { useHandoffStore } from '../stores/handoff'
import { useIssuesStore } from '../stores/issues'
import IncomingNotesPanel from '../components/IncomingNotesPanel.vue'
import OutgoingNoteForm from '../components/OutgoingNoteForm.vue'
import { categoryMeta, formatTime } from '../utils/meta'

const handoff = useHandoffStore()
const issues = useIssuesStore()
</script>

<template>
  <div>
    <IncomingNotesPanel :incoming="handoff.incoming" />

    <OutgoingNoteForm />

    <div class="d-flex align-center mt-6 mb-2">
      <v-icon color="error" class="mr-2">mdi-flag-variant-outline</v-icon>
      <span class="text-h6 font-weight-bold">Flagged Issues</span>
      <v-spacer />
      <v-chip v-if="issues.openCount" color="error" variant="tonal" size="small" label>
        {{ issues.openCount }} open
      </v-chip>
    </div>

    <v-card
      v-for="issue in issues.sorted"
      :key="issue.id"
      class="mb-2 pa-3"
      variant="elevated"
      elevation="1"
    >
      <div class="d-flex align-center">
        <v-avatar :color="categoryMeta(issue.category).color" size="40" class="mr-3">
          <v-icon color="white" size="20">{{ categoryMeta(issue.category).icon }}</v-icon>
        </v-avatar>
        <div class="flex-grow-1">
          <div class="d-flex align-center">
            <span class="text-caption text-medium-emphasis font-weight-medium mr-2">{{ issue.id }}</span>
            <span class="text-caption text-medium-emphasis">{{ issue.line }} · {{ formatTime(issue.timestamp) }}</span>
          </div>
          <div class="text-body-2">{{ issue.description }}</div>
        </div>
        <v-btn
          :icon="issue.status === 'open' ? 'mdi-checkbox-blank-circle-outline' : 'mdi-check-circle'"
          :color="issue.status === 'open' ? 'medium-emphasis' : 'success'"
          variant="text"
          @click="issues.resolve(issue.id)"
        />
      </div>
    </v-card>

    <v-card v-if="issues.issues.length === 0" class="pa-6 text-center" variant="tonal" color="surface-variant">
      <v-icon size="40" class="mb-2 text-medium-emphasis">mdi-flag-outline</v-icon>
      <div class="text-body-2 text-medium-emphasis">No issues flagged this shift.</div>
    </v-card>
  </div>
</template>
