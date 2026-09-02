export const STATUS_META = {
  blocked: { label: 'Blocked', color: 'error', icon: 'mdi-alert-octagon' },
  'in-progress': { label: 'In Progress', color: 'warning', icon: 'mdi-progress-wrench' },
  complete: { label: 'Complete', color: 'success', icon: 'mdi-check-circle' },
}

export const PRIORITY_META = {
  high: { label: 'High', color: 'error' },
  medium: { label: 'Medium', color: 'warning' },
  low: { label: 'Low', color: 'info' },
}

export const ISSUE_CATEGORIES = [
  { value: 'equipment', label: 'Equipment', icon: 'mdi-wrench', color: 'warning' },
  { value: 'safety', label: 'Safety', icon: 'mdi-shield-alert', color: 'error' },
  { value: 'staffing', label: 'Staffing', icon: 'mdi-account-group', color: 'info' },
  { value: 'quality', label: 'Quality', icon: 'mdi-magnify-scan', color: 'secondary' },
]

export function categoryMeta(value) {
  return ISSUE_CATEGORIES.find((c) => c.value === value) || ISSUE_CATEGORIES[0]
}

export function formatTime(iso) {
  const d = new Date(iso)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
