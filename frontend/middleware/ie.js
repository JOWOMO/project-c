export default () => {
  const browser = this.$ua.browser()
  const browserV = this.$ua.browserVersion()

  if(browser == 'Internet Explorer' && browserV <= 11) {
    return this.$router.replace('/ie')
  }
}
