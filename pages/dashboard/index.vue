<script setup lang="ts">
useSeoMeta({
	title: "DevLinks | Dashboard",
});
definePageMeta({
	middleware: "auth",
});

const { userData } = useStore();
const { links, showPreview } = storeToRefs(useStore());
const currentView = ref("links");

const numberOfPlaceholderLinks = computed(() => {
	if (links.value.length < 5) {
		return 5 - links.value.length;
	}
	return 0;
});
</script>

<template>
	<div class="dashboard">
		<DashboardHeader v-model="currentView" />
		<div class="dashboard__content grid">
			<div class="dashboard__content--left position-relative bg-white br-12 items-center content-center">
				<img src="/preview.png" alt="" class="img-fluid block phone" />
				<div class="mobile-preview position-absolute flex flex-column" :class="{ 'mobile-preview--extended': userData.firstName || userData.lastName || userData.image_url }">
					<div class="mobile-preview__header flex flex-column items-center">
						<div class="mobile-preview__image">
							<img v-if="userData.image_url" :src="userData.image_url" alt="user image" class="block profile-image" />
							<Placeholder v-else usage="image" />
						</div>
						<div class="mobile-preview__text flex flex-column items-center text-center">
							<h6 v-if="userData.lastName || userData.firstName" class="weight-600">{{ userData.firstName }} {{ userData.lastName }}</h6>
							<Placeholder v-else usage="name" />
							<p v-if="userData.email" class="text-gray">{{ userData.email }}</p>
							<Placeholder v-else usage="email" />
						</div>
					</div>
					<div class="mobile-preview__links flex flex-column gap-20">
						<template v-if="links.length > 0">
							<template v-for="link in links" :key="link.id">
								<ProfileLink v-if="link.platform" :link="link" usage="preview" />
							</template>
						</template>
						<template v-if="numberOfPlaceholderLinks > 0">
							<Placeholder v-for="count in numberOfPlaceholderLinks" :key="count" usage="link" />
						</template>
					</div>
				</div>
			</div>
			<div class="dashboard__content--right bg-white br-12">
				<KeepAlive>
					<LazyDashboardLinks v-if="currentView === 'links'" />
					<LazyDashboardProfile v-else-if="currentView === 'profile'" />
				</KeepAlive>
			</div>
		</div>
		<ProfilePreview v-if="showPreview" :show-buttons="true" :user="userData" :links="links" />
	</div>
</template>

<style lang="scss" scoped>
.dashboard {
	&__content {
		@include gap(2.4rem);
		@include padding(0 2.4rem);
		position: fixed;
		left: 0;
		height: calc(100vh - 16rem);
		overflow-y: scroll;
		width: 100%;

		@media screen and (min-width: $desktop) {
			grid-template-columns: 56rem auto;
		}

		&--left {
			@include padding(2.4rem);
			@include visibility(none, none, flex);
			position: sticky;
			top: 0;
			left: 0;
			height: 83.4rem;

			.phone {
				width: 307px;
				height: 631px;
				margin-left: auto;
				margin-right: auto;
			}
		}
	}
}

.mobile-preview {
	width: 23.7rem;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	height: 51.6rem;
	overflow-y: auto;
	@include gap(5.6rem);
	-ms-overflow-style: none;
	scrollbar-width: none;

	&::-webkit-scrollbar {
		display: none;
	}

	&__header {
		@include gap(2.5rem);
	}

	&__text {
		h6 {
			@include typography(1.8rem, 2.7rem);
			margin-bottom: 0.8rem;
		}

		p {
			@include typography(1.4rem, 2.1rem);
		}
	}
}
</style>
