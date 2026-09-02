<script setup>
const model = defineModel({ type: Boolean, default: true })

const capabilities = [
  {
    icon: 'mdi-clipboard-list-outline',
    color: 'primary',
    title: 'Track work orders',
    text: 'See every job on the floor at a glance and update status in one tap.',
  },
  {
    icon: 'mdi-shield-check-outline',
    color: 'success',
    title: 'Run safety checks',
    text: 'Complete your per-shift safety checklist in under two minutes.',
  },
  {
    icon: 'mdi-swap-horizontal',
    color: 'secondary',
    title: 'Hand off shifts',
    text: 'Read incoming notes and leave a clear handoff for the next supervisor.',
  },
  {
    icon: 'mdi-flag-variant',
    color: 'error',
    title: 'Flag issues fast',
    text: 'Report equipment, safety, or staffing problems from anywhere in seconds.',
  },
]
</script>

<template>
  <v-overlay
    :model-value="model"
    class="splash-overlay align-center justify-center"
    persistent
    scrim="rgba(0,0,0,0.6)"
  >
    <div class="splash-card">
      <div class="splash-hero pa-6 text-center">
        <v-avatar color="rgba(255,255,255,0.18)" size="72" class="mb-3">
          <v-icon color="white" size="40">mdi-factory</v-icon>
        </v-avatar>
        <div class="text-h5 font-weight-bold text-white mb-1">Shift Floor Supervisor</div>
        <div class="text-body-2 text-white" style="opacity: 0.9">
          Your production floor, one thumb-friendly view.
        </div>
      </div>

      <div class="pa-5">
        <v-list class="py-0" bg-color="transparent">
          <v-list-item
            v-for="cap in capabilities"
            :key="cap.title"
            class="px-0 mb-2"
          >
            <template #prepend>
              <v-avatar :color="cap.color" size="44" class="mr-3">
                <v-icon color="white">{{ cap.icon }}</v-icon>
              </v-avatar>
            </template>
            <v-list-item-title class="text-subtitle-1 font-weight-bold">
              {{ cap.title }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-body-2 text-wrap" style="opacity: 0.85">
              {{ cap.text }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <v-btn
          block
          size="x-large"
          color="primary"
          class="mt-4"
          append-icon="mdi-arrow-right"
          @click="model = false"
        >
          Start Shift
        </v-btn>
      </div>
    </div>
  </v-overlay>
</template>

<style scoped>
.splash-card {
  width: min(92vw, 460px);
  max-height: 92vh;
  overflow-y: auto;
  background: rgb(var(--v-theme-surface));
  border-radius: 24px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
}
.splash-hero {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-secondary)));
  border-radius: 24px 24px 0 0;
}
.splash-card :deep(.v-list-item-subtitle) {
  -webkit-line-clamp: unset;
  line-clamp: unset;
  white-space: normal;
  overflow: visible;
}
</style>
