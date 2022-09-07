// these APIs are auto-imported from @vueuse/core
import { darkTheme } from 'naive-ui'
import { darkThemeOverrides, lightThemeOverrides } from '~/styles/naive-ui.theme'
export const isDark = useDark()
export const toggleDark = useToggle(isDark)
export const preferredDark = usePreferredDark()
export const naiveUIDarkTheme = computed(()=> isDark.value ? darkTheme : undefined)
export const naiveUIThemeOverrides = computed(()=> isDark.value ? darkThemeOverrides : lightThemeOverrides )
