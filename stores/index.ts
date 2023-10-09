export const useStore = defineStore("store", () => {
	const client = useSupabaseClient();
	const user = useSupabaseUser();

	const userData = reactive({ firstName: "", lastName: "", email: "", image: "", slug: "", image_url: "" });
	const showPreview = ref(false);
	const links = ref<Link[]>([]);

	const fetchUserData = async () => {
		const { data, error } = await client.from("devlink_profiles").select("*, devlink_links(*)").eq("id", user.value?.id).single();
		if (error) {
			// error handling
			throw new Error("An error occured");
		}
		if (data) {
			const { slug = "", first_name = "", last_name = "", email = "", devlink_links = [], image_url } = data;
			if (image_url) {
				const { data } = await client.storage.from("devlink_avatars").getPublicUrl(image_url);
				if (data.publicUrl) userData.image_url = data.publicUrl;
			}
			Object.assign(userData, { firstName: first_name, lastName: last_name, email, slug });
			links.value = devlink_links
				.map(({ id, platform, link, order }: { id: string; platform: string; link: string; order: number }) => {
					return { id, platform, link, order };
				})
				.sort((a, b) => a.order - b.order);
		}
	};

	return { userData, links, showPreview, fetchUserData };
});
