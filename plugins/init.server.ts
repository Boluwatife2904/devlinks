export default defineNuxtPlugin(async (nuxtApp: any) => {
	const user = useSupabaseUser();
	const client = useSupabaseClient();
	if (user.value) {
		const store = useStore(nuxtApp.$pinia);
		try {
			await store.fetchUserData();
		} catch (error) {
			await client.auth.signOut();
			navigateTo("/");
		}
	}
});
