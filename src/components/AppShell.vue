<script setup>
import { ref, computed, watch } from 'vue'
import { useTheme } from 'vuetify'
import { useThemeStore } from '../stores/theme'
import { useShiftStore } from '../stores/shift'
import { useWorkOrdersStore } from '../stores/workOrders'
import { useChecklistStore } from '../stores/checklist'
import { useIssuesStore } from '../stores/issues'
import WorkOrdersView from '../views/WorkOrdersView.vue'
import SafetyChecklistView from '../views/SafetyChecklistView.vue'
import HandoffNotesView from '../views/HandoffNotesView.vue'
import IssueFlagSheet from './IssueFlagSheet.vue'
import SplashOverlay from './SplashOverlay.vue'

const vTheme = useTheme()
const themeStore = useThemeStore()
const shift = useShiftStore()
const workOrders = useWorkOrdersStore()
const checklist = useChecklistStore()
const issues = useIssuesStore()

// sync stored theme to Vuetify on load and on change
vTheme.change(themeStore.current)
watch(
  () => themeStore.current,
  (name) => {
    vTheme.change(name)
  },
)

const tab = ref('orders')
const shiftMenu = ref(false)
const issueSheet = ref(false)
const splash = ref(true)

const tabs = {
  orders: { title: 'Work Orders', icon: 'mdi-clipboard-list-outline' },
  safety: { title: 'Safety Checklist', icon: 'mdi-shield-check-outline' },
  handoff: { title: 'Shift Handoff', icon: 'mdi-swap-horizontal' },
}

const currentTitle = computed(() => (tabs[tab.value] || tabs.orders).title)

const blockedCount = computed(() => workOrders.counts.blocked)
const checklistBadge = computed(() =>
  checklist.isComplete && checklist.checkedCount > 0 ? null : checklist.requiredRemaining,
)
</script>

<template>
  <v-app>
    <v-app-bar :elevation="2" color="surface" class="app-bar">
      <template #prepend>
        <v-avatar color="primary" size="40" class="ml-2">
          <v-icon color="white">mdi-factory</v-icon>
        </v-avatar>
      </template>

      <v-app-bar-title>
        <div class="text-subtitle-1 font-weight-bold" style="line-height: 1.1">
          {{ currentTitle }}
        </div>
        <button class="shift-pill" @click="shiftMenu = true">
          <v-icon size="14" class="mr-1">mdi-account-hard-hat</v-icon>
          {{ shift.shiftLabel }}
          <v-icon size="14" class="ml-1">mdi-chevron-down</v-icon>
        </button>
      </v-app-bar-title>

      <template #append>
        <v-btn
          :icon="themeStore.isDark ? 'mdi-weather-night' : 'mdi-weather-sunny'"
          variant="text"
          class="mr-1"
          @click="themeStore.toggle()"
        />
      </template>
    </v-app-bar>

    <v-main class="app-main">
      <v-container class="pa-4" style="max-width: 720px">
        <v-window v-model="tab">
          <v-window-item value="orders">
            <WorkOrdersView />
          </v-window-item>
          <v-window-item value="safety">
            <SafetyChecklistView />
          </v-window-item>
          <v-window-item value="handoff">
            <HandoffNotesView />
          </v-window-item>
        </v-window>
      </v-container>
    </v-main>

    <v-btn
      icon="mdi-flag-plus"
      color="error"
      size="large"
      elevation="6"
      class="issue-fab"
      @click="issueSheet = true"
    />

    <v-bottom-navigation v-model="tab" :elevation="8" grow color="primary" class="bottom-nav" height="72">
      <v-btn value="orders" stacked>
        <v-badge :model-value="blockedCount > 0" :content="blockedCount" color="error">
          <v-icon>{{ tabs.orders.icon }}</v-icon>
        </v-badge>
        <span>Orders</span>
      </v-btn>
      <v-btn value="safety" stacked>
        <v-badge :model-value="!!checklistBadge" :content="checklistBadge" color="warning">
          <v-icon>{{ tabs.safety.icon }}</v-icon>
        </v-badge>
        <span>Safety</span>
      </v-btn>
      <v-btn value="handoff" stacked>
        <v-badge :model-value="issues.openCount > 0" :content="issues.openCount" color="error">
          <v-icon>{{ tabs.handoff.icon }}</v-icon>
        </v-badge>
        <span>Handoff</span>
      </v-btn>
    </v-bottom-navigation>

    <IssueFlagSheet v-model="issueSheet" />

    <SplashOverlay v-model="splash" />

    <!-- Shift / Line selector -->
    <v-bottom-sheet v-model="shiftMenu" inset>
      <v-card class="rounded-t-xl pa-4">
        <div class="d-flex align-center mb-4">
          <v-icon color="primary" class="mr-2">mdi-account-hard-hat</v-icon>
          <span class="text-h6 font-weight-bold">Shift Context</span>
          <v-spacer />
          <v-btn icon="mdi-close" variant="text" @click="shiftMenu = false" />
        </div>

        <div class="text-caption text-medium-emphasis mb-2">Supervisor</div>
        <div class="text-body-1 font-weight-medium mb-4">{{ shift.supervisor }}</div>

        <div class="text-caption text-medium-emphasis mb-2">Shift</div>
        <div class="d-flex flex-wrap ga-2 mb-4">
          <v-chip
            v-for="s in shift.shifts"
            :key="s"
            :variant="shift.shift === s ? 'flat' : 'outlined'"
            color="primary"
            size="large"
            @click="shift.setShift(s)"
          >
            {{ s }}
          </v-chip>
        </div>

        <div class="text-caption text-medium-emphasis mb-2">Line</div>
        <div class="d-flex flex-wrap ga-2">
          <v-chip
            v-for="l in shift.lines"
            :key="l"
            :variant="shift.line === l ? 'flat' : 'outlined'"
            color="secondary"
            size="large"
            @click="shift.setLine(l)"
          >
            {{ l }}
          </v-chip>
        </div>
      </v-card>
    </v-bottom-sheet>
  </v-app>
</template>

<style scoped>
.shift-pill {
  display: inline-flex;
  align-items: center;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(var(--v-theme-primary), 0.12);
  color: rgb(var(--v-theme-primary));
  margin-top: 2px;
  cursor: pointer;
}
.app-main {
  padding-bottom: 80px;
}
.issue-fab {
  position: fixed;
  right: 16px;
  bottom: 88px;
  z-index: 1006;
}
.bottom-nav :deep(.v-btn) {
  min-height: 72px;
}
</style>
