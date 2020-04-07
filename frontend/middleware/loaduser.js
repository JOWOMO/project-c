export default async function ({
  store, app
}) {
  try {
    console.debug('[Loaduser Guard] checking');
    await store.dispatch('auth/load');
  } catch (e) {
    try { await app.$apolloHelpers.onLogout(); }
    catch { }

    console.error('failed to load user', e);
  }
}
