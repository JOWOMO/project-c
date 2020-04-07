export default async function ({
    store, redirect, route
}) {
    try {
        console.debug('[Authenticated Guard] checking');

        const token = await store.dispatch('auth/token');
        await app.$apolloHelpers.onLogin(token);
    } catch (e) {
        console.error('no current user', e);
        redirect(200, '/login', { return_url: route.path });
    }
}
