<script setup lang="ts"></script>

<template>
	<div class="links">
		<div class="links__body flex flex-column">
			<div class="links__header flex flex-column">
				<div class="links__text flex flex-column gap-8">
					<h4 class="heading-m text-dark-gray">Customize your links</h4>
					<p class="body-m text-gray">Add/edit/remove links below and then share all your profiles with the world!</p>
				</div>
				<BaseButton variant="secondary" size="full">+ Add new link</BaseButton>
			</div>
			<div class="links__content">
				<EmptyState />
			</div>
		</div>
		<div class="links__footer flex content-end">
			<BaseButton size="full">Save</BaseButton>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.links {
	&__body {
		@include gap(2.4rem);
		@include padding(2.4rem, 4rem);
	}

	&__header {
		@include gap(4rem);
	}

	&__footer {
		border-top: 1px solid $borders;
		@include padding(1.6rem, 2.4rem 4rem);

		button {
			@media screen and (min-width: $tablet) {
				width: max-content;
			}
		}
	}
}
</style>
