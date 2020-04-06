export default async function ({
  store, redirect, route
}) {
  try {
    console.info('loading user');
    await store.dispatch('auth/load');
  } catch (e) {
    console.error('failed to load', e);
  }
}
