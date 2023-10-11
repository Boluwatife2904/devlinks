<script setup lang="ts"></script>

<template>
	<main class="default-layout">
		<div class="default-layout__content">
			<slot />
		</div>
	</main>
</template>

<style lang="scss" scoped>
.default-layout {
	@include padding(1.6rem, 2.4rem);

	&__content {
		max-width: 144rem;
		margin: 0 auto;
	}
}
</style>
