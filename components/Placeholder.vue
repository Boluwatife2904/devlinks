<script setup lang="ts">
interface Props {
	usage?: string;
}

defineProps<Props>();
</script>

<template>
	<div class="placeholder" :class="`placeholder--${usage}`"></div>
</template>

<style lang="scss" scoped>
@mixin placeholder($height, $width, $radius) {
	height: $height;
	width: $width;
	border-radius: $radius;
}

.placeholder {
	background-color: #eee;

	&--link {
		@include placeholder(4.4rem, 23.7rem, 0.8rem);
	}

	&--image {
		@include placeholder(9.6rem, 9.6rem, 50%)
	}

	&--name {
		@include placeholder(1.6rem, 16rem, 10.4rem);
		margin-bottom: 1.3rem;
	}

	&--email {
		@include placeholder(0.8rem, 7.2rem, 10.4rem);
	}
}
</style>
