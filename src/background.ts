'use strict'
import { app, protocol } from 'electron'
import { AppGlobalEnv } from '@/utils'
import '@/main/index'
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

// Exit cleanly on request from parent process in development mode.
if (AppGlobalEnv.IS_DEVELOPMENT) {
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
