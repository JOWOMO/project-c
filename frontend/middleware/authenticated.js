export default async function ({
    store, redirect, route
}) {
    try {
        console.debug('[Authenticated Guard] checking');

        const load = store.dispatch('auth/load');
        const token = await store.dispatch('auth/token');
        await Promise.all([
            load,
            app.$apolloHelpers.onLogin(token),
        ]);
    } catch (e) {
        console.error('no current user', e);
        redirect(200, '/login', { return_url: route.path });
    }
}
