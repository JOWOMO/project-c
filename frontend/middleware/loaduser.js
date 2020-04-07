export default async function ({
  store, app
}) {
  try {
    console.debug('[Loaduser Guard] checking');

    const load = store.dispatch('auth/load');
    const token = await store.dispatch('auth/token');
    await Promise.all([
      load,
      app.$apolloHelpers.onLogin(token),
    ]);
  } catch (e) {
    try { await app.$apolloHelpers.onLogout(); }
    catch { }

    console.error('failed to load', e);
  }
}
