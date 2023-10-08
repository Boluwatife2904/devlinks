export const useStore = defineStore("store", () => {
	const userData = reactive({
		firstName: "",
		lastName: "",
		email: "",
		image: "",
	});
	const showPreview = ref(false);
	const links = ref<Link[]>([]);

	const updateUserData = (key: string, value: string) => {
		Object.assign(userData, {
			[key]: value,
		});
	};

	return { userData, updateUserData, links, showPreview };
});
