import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const lightTheme = {
  dark: false,
  colors: {
    background: '#F2F4F7',
    surface: '#FFFFFF',
    'surface-variant': '#E4E7EC',
    primary: '#1867C0',
    secondary: '#5865F2',
    success: '#1B873F',
    warning: '#B54708',
    error: '#C01048',
    info: '#175CD3',
    'on-background': '#101828',
    'on-surface': '#101828',
  },
}

const darkTheme = {
  dark: true,
  colors: {
    background: '#0B0F1A',
    surface: '#151B2B',
    'surface-variant': '#1F2740',
    primary: '#4C8DFF',
    secondary: '#8B93FF',
    success: '#3CCB7F',
    warning: '#FDB022',
    error: '#FF6B8A',
    info: '#53B1FD',
    'on-background': '#F5F7FA',
    'on-surface': '#F5F7FA',
  },
}

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme,
      darkTheme,
    },
  },
  defaults: {
    VBtn: { rounded: 'lg' },
    VCard: { rounded: 'xl' },
    VChip: { rounded: 'lg' },
  },
})
