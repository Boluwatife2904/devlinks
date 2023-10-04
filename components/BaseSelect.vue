<script setup lang="ts">
const modelValue = defineModel<string>();

const platforms = [
	{ key: "github", label: "GitHub" },
	{ key: "frontendmentor", label: "Frontend Mentor" },
	{ key: "twitter", label: "Twitter" },
	{ key: "linkedin", label: "LinkedIn" },
	{ key: "youtube", label: "YouTube" },
	{ key: "facebook", label: "Facebook" },
	{ key: "twitch", label: "Twitch" },
	{ key: "devto", label: "Dev.to" },
	{ key: "codewars", label: "Codewars" },
	{ key: "codepen", label: "Codepen" },
	{ key: "freecodecamp", label: "freeCodeCamp" },
	{ key: "gitlab", label: "GitLab" },
	{ key: "hashnode", label: "Hashnode" },
	{ key: "stackoverflow", label: "Stack Overflow" },
];
const showDropdown = ref(false);
const selectPlatform = (platformName: string) => {
	modelValue.value = platformName;
	showDropdown.value = false;
};

const selectedPlatform = computed(() => {
	return platforms.find((platform) => platform.key === modelValue.value);
});

const toggleDropdown = () => {
	showDropdown.value = !showDropdown.value;
};
</script>

<template>
	<div class="base-select flex flex-column gap-4 position-relative">
		<span class="base-select__label block body-s text-dark-gray">Platform</span>
		<div class="base-select__element bg-white flex items-center content-between br-8" :class="{ 'base-select__element--active': showDropdown }" @click="toggleDropdown">
			<span v-if="selectedPlatform" class="flex items-center body-m gap-12 text-gray">
				<IconLinks :name="selectedPlatform.key" />
				<span class="text-dark-gray">{{ selectedPlatform.label }}</span>
			</span>
			<span v-else class="text-dark-gray body-m">Select a platform</span>
			<span class="base-select__arrow">
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="9" viewBox="0 0 14 9" fill="none">
					<path d="M1 1L7 7L13 1" stroke="#633CFF" stroke-width="2" />
				</svg>
			</span>
		</div>
		<Transition name="slideIn" mode="out-in" appear>
			<ul v-if="showDropdown" class="base-select__dropdown w-100 flex flex-column gap-12 br-8 bg-white position-absolute">
				<li v-for="platform in platforms" :key="platform.key" class="flex items-center gap-12 body-m text-gray" :class="{ selected: modelValue === platform.key }" @click="selectPlatform(platform.key)">
					<IconLinks :name="platform.key" />
					<span class="text-dark-gray">{{ platform.label }}</span>
				</li>
			</ul>
		</Transition>
	</div>
</template>

<style lang="scss" scoped>
.base-select {
	&__element {
		@include padding(1.2rem 1.6rem);
		cursor: pointer;
		border: 0.1rem solid $borders;

		&--active {
			border-color: $purple !important;
			box-shadow: 0px 0px 32px 0px rgba(99, 60, 255, 0.25);

			.base-select__arrow {
				transform: rotate(180deg);
			}
		}
	}

	&__arrow {
		transition: transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);
	}

	&__dropdown {
		@include padding(1.2rem);
		border: 0.1rem solid $borders;
		box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.1);
		height: 22rem;
		overflow-y: auto;
		top: calc(100% + 0.8rem);
		left: 0;
		z-index: 10;

		li {
			cursor: pointer;

			&:not(:last-child) {
				padding-bottom: 1.2rem;
				border-bottom: 0.1rem solid $borders;
			}

			&.selected {
				> * {
					color: $purple !important;
				}
			}
		}
	}
}
</style>
