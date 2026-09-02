<script setup>
import { ref, computed } from 'vue'
import { STATUS_META, PRIORITY_META, NEXT_ACTION, formatTime } from '../utils/meta'

const props = defineProps({
  order: { type: Object, required: true },
})
const emit = defineEmits(['advance', 'reopen', 'log-units', 'add-update'])

const status = computed(() => STATUS_META[props.order.status])
const priority = computed(() => PRIORITY_META[props.order.priority])
const nextAction = computed(() => NEXT_ACTION[props.order.status])
const progress = computed(() =>
  props.order.quantity ? Math.round((props.order.completed / props.order.quantity) * 100) : 0,
)

const showNote = ref(false)
const noteText = ref('')

function submitNote() {
  if (!noteText.value.trim()) return
  emit('add-update', props.order.id, noteText.value)
  noteText.value = ''
  showNote.value = false
}
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
          <div class="d-flex ga-2">
            <v-chip :color="priority.color" size="small" variant="tonal" label>
              {{ priority.label }} priority
            </v-chip>
            <v-chip :color="status.color" :prepend-icon="status.icon" size="small" variant="tonal" label>
              {{ status.label }}
            </v-chip>
          </div>
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

        <div class="d-flex align-center mb-3">
          <v-icon size="18" class="mr-1 text-medium-emphasis">mdi-account-outline</v-icon>
          <span class="text-body-2 text-medium-emphasis">{{ order.assignee }}</span>
        </div>

        <div v-if="order.note" class="note-strip mb-3 pa-2 text-body-2">
          <v-icon size="16" class="mr-1">mdi-note-text-outline</v-icon>
          {{ order.note }}
        </div>

        <!-- Incremental progress logging (in-progress only) -->
        <div v-if="order.status === 'in-progress'" class="logger mb-3 pa-3">
          <div class="d-flex align-center mb-2">
            <v-icon size="18" color="warning" class="mr-1">mdi-progress-check</v-icon>
            <span class="text-caption font-weight-bold">Log incremental progress</span>
          </div>
          <div class="d-flex align-center ga-2">
            <v-btn
              icon="mdi-minus"
              size="small"
              variant="tonal"
              color="warning"
              :disabled="order.completed <= 0"
              @click="emit('log-units', order.id, -1)"
            />
            <div class="units-readout text-body-2 font-weight-bold">
              {{ order.completed }} / {{ order.quantity }}
            </div>
            <v-btn
              icon="mdi-plus"
              size="small"
              variant="tonal"
              color="warning"
              :disabled="order.completed >= order.quantity"
              @click="emit('log-units', order.id, 1)"
            />
            <v-spacer />
            <v-btn
              size="small"
              variant="text"
              color="warning"
              :disabled="order.completed >= order.quantity"
              @click="emit('log-units', order.id, 5)"
            >
              +5
            </v-btn>
            <v-btn
              size="small"
              variant="text"
              color="warning"
              :disabled="order.completed >= order.quantity"
              @click="emit('log-units', order.id, 10)"
            >
              +10
            </v-btn>
          </div>

          <v-expand-transition>
            <div v-if="showNote" class="mt-3">
              <v-textarea
                v-model="noteText"
                placeholder="e.g. Swapped tooling, resuming run"
                variant="outlined"
                rows="2"
                auto-grow
                hide-details
                density="comfortable"
                class="mb-2"
              />
              <div class="d-flex ga-2">
                <v-btn size="small" variant="text" @click="showNote = false">Cancel</v-btn>
                <v-spacer />
                <v-btn
                  size="small"
                  color="warning"
                  variant="flat"
                  prepend-icon="mdi-content-save-outline"
                  :disabled="!noteText.trim()"
                  @click="submitNote"
                >
                  Log update
                </v-btn>
              </div>
            </div>
            <v-btn
              v-else
              size="small"
              variant="text"
              color="warning"
              prepend-icon="mdi-comment-plus-outline"
              class="mt-2"
              @click="showNote = true"
            >
              Add progress note
            </v-btn>
          </v-expand-transition>
        </div>

        <!-- Update timeline -->
        <div v-if="order.updates && order.updates.length" class="timeline mb-3">
          <div class="text-caption text-medium-emphasis font-weight-medium mb-1">Progress log</div>
          <div
            v-for="(u, i) in order.updates"
            :key="i"
            class="d-flex align-start text-body-2 mb-1"
          >
            <v-icon size="14" class="mr-2 mt-1" :color="u.type === 'units' ? 'warning' : 'primary'">
              {{ u.type === 'units' ? 'mdi-counter' : 'mdi-comment-text-outline' }}
            </v-icon>
            <span class="flex-grow-1">{{ u.text }}</span>
            <span class="text-caption text-medium-emphasis ml-2">{{ formatTime(u.time) }}</span>
          </div>
        </div>

        <!-- Next best action -->
        <v-btn
          v-if="nextAction"
          block
          size="large"
          :color="nextAction.color"
          :prepend-icon="nextAction.icon"
          class="action-btn"
          @click="emit('advance', order.id)"
        >
          {{ nextAction.label }}
        </v-btn>
        <div v-else class="d-flex align-center justify-space-between complete-banner pa-2 px-3">
          <span class="d-flex align-center text-success font-weight-bold">
            <v-icon class="mr-1">mdi-check-decagram</v-icon>
            Work order closed out
          </span>
          <v-btn
            variant="text"
            size="small"
            color="medium-emphasis"
            prepend-icon="mdi-undo"
            @click="emit('reopen', order.id)"
          >
            Reopen
          </v-btn>
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
.note-strip {
  background: rgba(var(--v-theme-on-surface), 0.05);
  border-radius: 10px;
  color: rgba(var(--v-theme-on-surface), 0.75);
}
.logger {
  background: rgba(var(--v-theme-warning), 0.08);
  border-radius: 12px;
}
.units-readout {
  min-width: 76px;
  text-align: center;
}
.timeline {
  border-left: 2px solid rgba(var(--v-theme-on-surface), 0.1);
  padding-left: 10px;
}
.action-btn {
  min-height: 48px;
}
.complete-banner {
  background: rgba(var(--v-theme-success), 0.1);
  border-radius: 10px;
}
</style>
