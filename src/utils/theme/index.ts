import BlackTheme from './BlackTheme'
import WhiteTheme from './WhiteTheme'
const Theme = {
  name: BlackTheme.name,
  [BlackTheme.name]: BlackTheme,
  [WhiteTheme.name]: WhiteTheme,
  themeType: [BlackTheme.name, WhiteTheme.name]
}
export { Theme }
