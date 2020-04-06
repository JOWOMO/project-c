export default async function ({
    store, redirect, route
}) {
    try {
        console.info('Checking authentication');
        await store.dispatch('auth/token');
        
    } catch (e) {
        console.error('no current user', e);
        redirect(200, '/login', { return_url: route.path });
    }
}
