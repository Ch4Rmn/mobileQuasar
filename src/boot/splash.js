import { onMounted } from 'vue'
import { SplashScreen } from '@capacitor/splash-screen'

export default () => {
  onMounted(() => {
    setTimeout(async () => {
      await SplashScreen.hide({ fadeOutDuration: 500 })
    }, 3000)
  })
}
