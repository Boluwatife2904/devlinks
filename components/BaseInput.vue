<script setup lang="ts">
interface Props {
	id: string;
	name: string;
	type: string;
	placeholder?: string;
	label?: string;
	icon?: string;
	isInvalid?: boolean;
	disabled?: boolean;
}

const { type = "text", placeholder = "", label = "", isInvalid = false, icon = "", disabled = false } = defineProps<Props>();
const modelValue = defineModel<string>();
</script>

<template>
	<div class="base-input flex flex-column gap-4 position-relative">
		<label :for="id" class="base-input__label body-s text-drak-gray" :class="{ 'base-input__label--error': isInvalid }">{{ label }}</label>
		<input v-model="modelValue" :type="type" :name="name" :id="id" :placeholder="placeholder" class="base-input__element w-100 body-m br-8" :class="{ 'base-input__element--error': isInvalid, 'base-input__element--icon': !icon }" autocomplete="off" :disabled="disabled" />
		<span class="base-input__icon block position-absolute"><BaseIcon :name="icon" /></span>
		<span v-if="isInvalid" class="base-input__error bg-white body-s text-red position-absolute">
			<template v-if="modelValue === ''">Can't be empty</template>
			<template v-else-if="modelValue && icon === 'link'">Please check the URL</template>
			<template v-else>Please check again</template>
		</span>
	</div>
</template>

<style lang="scss" scoped>
.base-input {
	&__label {
		&--error {
			color: $red;
		}
	}

	&__element {
		@include padding(1.2rem 2.4rem 1.2rem 4.8rem);
		@include component-variant($white, $dark-gray, $borders);

		&--icon {
			@include padding(1.2rem 1.6rem);
		}

		&:active,
		&:focus-within {
			border-color: $purple !important;
			box-shadow: 0px 0px 32px 0px rgba(99, 60, 255, 0.25);
		}

		&:placeholder {
			color: rgb(51, 51, 51, 0.5);
		}

		&--error {
			border-color: $red !important;
			color: $red !important;

			&:active,
			&:focus-within {
				border-color: $red !important;
				box-shadow: none !important;
			}
		}

		&:disabled {
			cursor: not-allowed;
			background-color: $light-gray;
			color: $gray;
		}
	}

	&__icon {
		bottom: 1.079rem;
		left: 1.6rem;
	}

	&__error {
		right: 1.6rem;
		bottom: 1.6rem;
		@include padding(0 0 0 0.5rem);
	}
}
</style>
