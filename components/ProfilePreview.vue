<script setup lang="ts">
const { showPreview, links } = storeToRefs(useStore());
const { userData } = useStore();
const config = useRuntimeConfig();

const copyLink = async () => {
	const link = `${config.public.frontendBaseUrl}/${userData.slug}`;
	await navigator.clipboard.writeText(link);
	useEvent("notify", { type: "success", icon: "link", message: "The link has been copied to your clipboard!" });
};

onMounted(() => {
	document.body.classList.add("overflow-hidden");
});

onUnmounted(() => {
	document.body.classList.remove("overflow-hidden");
});
</script>

<template>
	<div class="profile-preview bg-white">
		<div class="profile-preview__cover">
			<div class="profile-preview__actions br-12 bg-white flex items-center content-between">
				<BaseButton variant="secondary" @click="showPreview = false">Back to Editor</BaseButton>
				<BaseButton @click="copyLink">Share Link</BaseButton>
			</div>
		</div>
		<div class="profile-preview__content">
			<div v-if="userData.image_url" class="profile-preview__image">
				<img :src="userData.image_url" alt="user image" class="block profile-image" />
			</div>
			<div v-if="userData.firstName || userData.lastName || userData.email" class="profile-preview__text text-center flex flex-column gap-8">
				<h6 v-if="userData.firstName || userData.lastName" class="heading-m text-dark-gray text-wrap">{{ userData.firstName }} {{ userData.lastName }}</h6>
				<p v-if="userData.email" class="body-m text-gray">{{ userData.email }}</p>
			</div>
			<div class="profile-preview__links flex flex-column gap-20">
				<template v-for="link in links">
					<ProfileLink v-if="link.platform" :link="link" usage="main" />
				</template>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.profile-preview {
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 100;
	overflow-y: auto;

	&__cover {
		border-radius: 0 0 3.2rem 3.2rem;
		@include padding(2.4rem);
		background-color: transparent;
		margin-bottom: 6rem;

		@media screen and (min-width: $tablet) {
			height: 35.7rem;
			background-color: $purple;
			margin-bottom: 0;
		}
	}

	&__actions {
		@include padding(0, 1.6rem 1.6rem 1.6rem 2.4rem);
		max-width: 139.2rem;
		margin: 0 auto;
	}

	&__content {
		border-radius: 24px;
		background: $white;
		@include padding(0 2.4rem 5.6rem, 4.8rem 5.6rem);
		max-width: 34.9rem;
		margin: 0 auto;

		@media screen and (min-width: $tablet) {
			box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.1);
			transform: translateY(-12.6rem);
		}
	}

	&__image {
		margin-bottom: 2.5rem;
	}

	&__text {
		margin-bottom: 5.6rem;
	}
}

.text-wrap {
	word-wrap: break-word;
}
</style>
