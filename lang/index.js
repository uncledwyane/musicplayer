import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const DEFAULT_LANG = 'zh'
const LOCALE_KEY = 'localeLanguage'

const messages = {
  zh: require('./zh_CN.json'),
  en: require('./en_US.json'),
}

const i18n = new VueI18n({
  locale: DEFAULT_LANG,
  messages: messages,
})

export const setup = lang => {
  if (lang === undefined) {
    lang = window.localStorage.getItem(LOCALE_KEY)
    if (messages[lang] === undefined) {
      lang = DEFAULT_LANG
    }
  }
  window.localStorage.setItem(LOCALE_KEY, lang)

  Object.keys(messages).forEach(lang => {
    document.body.classList.remove(`lang-${lang}`)
  })
  document.body.classList.add(`lang-${lang}`)
  document.body.setAttribute('lang', lang)

  Vue.config.lang = lang
  i18n.locale = lang
}

setup()
export default i18n