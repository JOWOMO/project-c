export default async function ({
  app, route, redirect, store
}) {

  const browser = app.$ua.browser()
  const browserV = app.$ua.browserVersion()

  if(browser == 'Internet Explorer' || browserV <= 11) {
    redirect('/ie')
  }
}