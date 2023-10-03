<script setup lang="ts"></script>

<template>
	<main class="default-layout">
		<slot />
	</main>
</template>

<style lang="scss" scoped>
.default-layout {
	@include padding(2.4rem);
}
</style>
