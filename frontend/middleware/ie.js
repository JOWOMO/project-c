export default async function ({
  app, route, redirect
}) {
  if (route.path == '/ie') {
    return;
  }

  const browser = app.$ua.browser()
  const browserV = app.$ua.browserVersion()

  if(browser == 'Internet Explorer' && browserV <= 11) {
    redirect('/ie')
  }
}
