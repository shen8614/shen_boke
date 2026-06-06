import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import ReadingProgress from './ReadingProgress.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(ReadingProgress),
    })
  },
}
