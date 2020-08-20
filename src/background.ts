'use strict'
import { app, protocol } from 'electron'
import { APP_GLOBLE_ENV } from '@/utils'
import '@/main/ui/WindowManager'
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

// Exit cleanly on request from parent process in development mode.
if (APP_GLOBLE_ENV.IS_DEVELOPMENT) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
