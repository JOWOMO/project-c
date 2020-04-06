export default async function ({
  store, redirect, route, app
}) {
  try {
    console.debug('[Loaduser Guard] checking');
    
    const token = await store.dispatch('auth/token');
    await app.$apolloHelpers.onLogin(token);
  } catch (e) {
    console.error('failed to load', e);
  }
}
