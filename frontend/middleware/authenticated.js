export default async function ({
    store, redirect, route, app
}) {
    try {
        console.debug('[Authenticated Guard] checking');

        const load = await store.dispatch('auth/load');
        if (!load) {
            redirect(200, '/login', { return_url: route.path });
        }
    } catch (e) {
        console.error('no current user', e);

        try { await app.$apolloHelpers.onLogout(); }
        catch { }

        redirect(200, '/login', { return_url: route.path });
    }
}
