export default async function ({
  app
}) {

  const browser = app.$ua.browser()
  const browserV = app.$ua.browserVersion()
  
  if(browser == 'Internet Explorer' && browserV <= 11) {
    return context.router.replace('/ie')
  }
}