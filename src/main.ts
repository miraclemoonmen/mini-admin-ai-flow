import 'element-plus/dist/index.css'
import 'dayjs/locale/zh-cn'
import './styles/element-theme.css'
import './styles/element-overrides.css'
import './styles/index.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import type { Language } from 'element-plus/es/locale'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from './App.vue'
import router from './router'
import store from './stores'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn as unknown as Language,
})

app.mount('#app')
