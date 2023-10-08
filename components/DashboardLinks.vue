<script setup lang="ts">
const inputPlaceholders: Record<string, string> = {
	"": "Select a platform",
	github: "https://www.github.com/benwright",
	frontendmentor: "https://www.frontendmentor.io/profile/benwright",
	twitter: "https://www.twitter.com/benwright",
	linkedin: "https://www.linkedin.com/benwright",
	youtube: "https://www.youtube.com/channel/benwright",
	facebook: "https://www.facebook.com/benwright",
	twitch: "https://www.twitch.com/benwright",
	devto: "https://www.dev.to/benwright",
	codewars: "https://www.codewars.com/benwright",
	codepen: "https://www.codepen.io/benwright",
	freecodecamp: "https://www.freecodecamp.org/benwright",
	gitlab: "https://www.gitlab.com/benwright",
	hashnode: "https://www.hashnode.com/benwright",
	stackoverflow: "https://www.stackoverflow.com/benwright",
};

const { links } = storeToRefs(useStore());
const end = ref<HTMLDivElement | null>(null);

const addNewLink = async () => {
	links.value.push({ id: String(Math.floor(Math.random() * 1000000)), platform: "", link: "" });
	await nextTick()
	end.value?.scrollIntoView({ behavior: "smooth" });
};

const deleteLink = (linkId: string) => {
	links.value = links.value.filter((link) => link.id !== linkId);
};
</script>

<template>
	<div class="links flex flex-column">
		<div class="links__body flex flex-column">
			<div class="links__header flex flex-column">
				<div class="links__text flex flex-column gap-8">
					<h4 class="heading-m text-dark-gray">Customize your links</h4>
					<p class="body-m text-gray">Add/edit/remove links below and then share all your profiles with the world!</p>
				</div>
				<BaseButton variant="secondary" size="full" @click="addNewLink">+ Add new link</BaseButton>
			</div>
			<div class="links__content">
				<section class="flex flex-column gap-24" v-if="links && links.length > 0">
					<div v-for="(link, index) in links" :key="link.id" class="link flex flex-column gap-12 bg-light-gray br-12">
						<div class="link__header flex items-center content-between">
							<div class="link__header--left flex gap-8 items-center">
								<button class="lh-0"><BaseIcon name="drag" /></button>
								<h6 class="link__title text-gray weight-700">Link #{{ index + 1 }}</h6>
							</div>
							<button class="text-gray body-m" @click="deleteLink(link.id)">Remove</button>
						</div>
						<BaseSelect v-model="link.platform" />
						<BaseInput v-model="link.link" id="" name="" type="url" icon="link" label="Link" :placeholder="inputPlaceholders[link.platform]" />
					</div>
				</section>
				<EmptyState v-else />
				<!-- <span ref="end" class="block"></span> -->
			</div>
		</div>
		<div v-if="links.length > 0" class="links__footer flex content-end">
			<span ref="end" class="block"></span>
			<BaseButton size="full">Save</BaseButton>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.links {
	height: 100%;

	&__body {
		@include gap(2.4rem);
		@include padding(2.4rem, 4rem);
	}

	&__header {
		@include gap(4rem);
	}

	&__footer {
		margin-top: auto;
		border-top: 1px solid $borders;
		@include padding(1.6rem, 2.4rem 4rem);

		button {
			@media screen and (min-width: $tablet) {
				width: max-content;
			}
		}
	}
}

.link {
	@include padding(2rem);

	&__title {
		@include typography(1.6rem, 2.4rem);
	}
}
</style>
