<script setup>
defineProps({
  progress: { type: Number, required: true },
  checked: { type: Number, required: true },
  total: { type: Number, required: true },
  requiredRemaining: { type: Number, required: true },
  complete: { type: Boolean, required: true },
})
</script>

<template>
  <v-card
    class="pa-4 mb-4"
    :color="complete ? 'success' : 'surface'"
    :variant="complete ? 'flat' : 'elevated'"
    elevation="2"
  >
    <div class="d-flex align-center mb-2">
      <div>
        <div class="text-overline" :class="complete ? 'text-white' : 'text-medium-emphasis'">
          Shift Safety Check
        </div>
        <div class="text-h5 font-weight-bold" :class="complete ? 'text-white' : ''">
          {{ checked }} / {{ total }} complete
        </div>
      </div>
      <v-spacer />
      <v-avatar :color="complete ? 'white' : 'primary'" size="56" variant="flat">
        <span
          class="text-h6 font-weight-bold"
          :class="complete ? 'text-success' : 'text-white'"
        >
          {{ progress }}%
        </span>
      </v-avatar>
    </div>

    <v-progress-linear
      :model-value="progress"
      :color="complete ? 'white' : 'primary'"
      height="10"
      rounded
      class="mb-2"
    />

    <div class="d-flex align-center text-body-2" :class="complete ? 'text-white' : ''">
      <v-icon size="18" class="mr-1">
        {{ complete ? 'mdi-shield-check' : 'mdi-shield-alert-outline' }}
      </v-icon>
      <span v-if="complete">All required checks passed — shift cleared</span>
      <span v-else>{{ requiredRemaining }} required item{{ requiredRemaining === 1 ? '' : 's' }} remaining</span>
    </div>
  </v-card>
</template>
