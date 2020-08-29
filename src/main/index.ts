import { WindowManager } from './ui/WindowManager'
import { UIEventManager } from './events/UIEventManager'
import MainEventTypes from './events/MainEventTypes'
const windowManager = new WindowManager()
windowManager.startUIEvent?.on(MainEventTypes.START_UI_EVENT, () => {
  new UIEventManager(windowManager)
})
