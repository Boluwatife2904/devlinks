<script setup lang="ts">
const tabs = [
	{ key: "links", label: "Links" },
	{ key: "profile", label: "Profile details" },
];
const modelValue = defineModel<string>();
</script>

<template>
	<header class="w-100">
		<nav class="navbar flex items-center content-between br-12 bg-white">
			<div class="navbar--left">
				<AppLogo usage="dashboard" />
			</div>
			<div class="navbar--center">
				<div class="tabs flex">
					<button v-for="tab in tabs" :key="tab.key" class="tabs__item heading-s br-8 flex items-center gap-8" :class="{ 'tabs__item--active': tab.key === modelValue }" @click="modelValue = tab.key">
						<BaseIcon :name="tab.key" />
						<span class="tabs__item__text">{{ tab.label }}</span>
					</button>
				</div>
			</div>
			<div class="navbar--right">
				<BaseButton variant="secondary" class="preview">
					<div class="preview-icon lh-0"><BaseIcon name="eye" /></div>
					<span class="preview-text">Preview</span>
				</BaseButton>
			</div>
		</nav>
	</header>
</template>

<style lang="scss" scoped>
header {
	position: sticky;
	top: 0;
	left: 0;
	z-index: 11
}
.navbar {
	@include padding(1.6rem 1.6rem 1.6rem 2.4rem);
	margin-bottom: 2.4rem;
// 	position: sticky;
// 	top: 0;
// 	left: 0;
}

.tabs {
	@include gap(0, 0, 1.6rem);

	&__item {
		@include padding(1.1rem 2.7rem);
		color: $gray;

		&:hover {
			color: $purple;
		}

		&--active {
			background-color: $purple-light;
			color: $purple;
		}

		&__text {
			@include visibility(none, block, block);
		}
	}
}

.preview {
	@include padding(1.1rem 1.6rem, 1.1rem 2.7rem);
	&-icon {
		@include visibility(block, none, none);
	}

	&-text {
		@include visibility(none, block, block);
	}
}
</style>
