<script setup lang="ts">
interface Props {
	variant?: string;
	size?: string;
	type?: "button" | "submit";
	disabled?: boolean;
}

const { variant = "primary", size = "normal", type = "button", disabled = false } = defineProps<Props>();

const buttonClasses = computed(() => {
	return ["variant", "size"].map((prop) => {
		if (prop === "variant") return `base-button--${variant}`;
		if (prop === "size") return `base-button--${size}`;
		return "";
	});
});
</script>

<template>
	<button :type="type" :class="['base-button', 'br-8', 'heading-s', ...buttonClasses]" :disabled="disabled">
		<slot />
	</button>
</template>

<style lang="scss" scoped>
.base-button {
	@include padding(1.1rem 2.7rem);

	&--primary {
		@include component-variant($purple, $white, transparent, $purple-hover, $white, transparent);

		&:hover,
		&:active,
		&:focus-within {
			box-shadow: 0px 0px 32px 0px rgba(99, 60, 255, 0.25);
		}
	}

	&--secondary {
		@include component-variant(transparent, $purple, $purple, $purple-light);
	}

	&--full {
		width: 100%;
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.25;
	}
}
</style>
