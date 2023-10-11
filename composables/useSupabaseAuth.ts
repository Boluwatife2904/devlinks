export const useSupabaseAuth = () => {
	const client = useSupabaseClient();
	const isLoading = ref(false);
	const { fetchUserData } = useStore();

	const loginWithSupabase = async (form: { email: string; password: string }) => {
		isLoading.value = true;
		const { data, error } = await client.auth.signInWithPassword({ ...form });
		if (error) {
			isLoading.value = false;
			throw new Error(error.message);
		}
		await createNewProfile(data.user);
	};

	const signUpWithSupabase = async (form: { email: string; password: string }) => {
		isLoading.value = true;
		const { data, error } = await client.auth.signUp({ ...form });
		if (error) {
			isLoading.value = false;
			throw new Error(error.message);
		}
		await createNewProfile(data.user);
	};

	const createNewProfile = async (user: any) => {
		try {
			isLoading.value = true;
			const { data: profiles, error } = await client.from("devlink_profiles").select("*").eq("id", user?.id);
			if (profiles && profiles.length === 0) {
				await client.from("devlink_profiles").insert({ id: user.id, first_name: "", last_name: "", email: user.email, image_url: "", slug: user.email.split("@")[0].replaceAll(".", "") });
			}
			await fetchUserData();
			isLoading.value = false;
		} catch (error) {
			isLoading.value = false;
		}
	};

	return { createNewProfile, loginWithSupabase, signUpWithSupabase, isLoading };
};
