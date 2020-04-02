export default async function ({
    store, redirect, route
}) {
    try {
        const client = this.$apollo.getClient();

        this.$apollo
        .query({
            query: getSkills
        })
        .then(({ data }) => {
            console.log(data);
            return this.skills = data.skills
        });
    } catch (e) {
        console.error('no current user', e);
        redirect(200, '/login', { return_url: route.path });
    }
}