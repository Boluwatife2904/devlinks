<script setup lang="ts">
const route = useRoute();
const client = useSupabaseClient();
const slug = route.params.slug as string;

const { data: profile } = await useAsyncData("user_profile", async () => {
	const { data } = await client.from("devlink_profiles").select("*, devlink_links(*)").eq("slug", slug).single();
	return data;
});

if (!profile.value) {
	throw createError({ statusCode: 404, statusMessage: "Profile not found" });
}

const { first_name = "", last_name = "", email = "", devlink_links = [], image_url = '', } = profile.value;

const user: UserData = {
	firstName: first_name,
	lastName: last_name,
	email,
	image_url,
	slug,
};

if (image_url) {
	const { data } = await client.storage.from("devlink_avatars").getPublicUrl(image_url);
	if (data.publicUrl) user.image_url = data.publicUrl;
}

useSeoMeta({
	title: `Devlinks | ${user.firstName} ${user.lastName}`,
	description: `${user.firstName}'s profile on Devlinks'`,
	ogImage: user.image_url,
});

const links = devlink_links
	.map(({ id, platform, link, order }: { id: string; platform: string; link: string; order: number }) => {
		return { id, platform, link, order };
	})
	.sort((a, b) => a.order - b.order);
</script>

<template>
	<ProfilePreview :show-button="false" :user="user" :links="links" />
</template>

<style scoped></style>
