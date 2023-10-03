<script setup lang="ts">
const route = useRoute();
</script>

<template>
	<main class="auth flex">
		<div class="auth__wrapper flex flex-column w-100">
			<AppLogo />
			<div class="auth__content flex flex-column br-8 w-100">
				<div class="auth__header flex flex-column gap-8">
					<h4 class="auth__title weight-700 heading-m">
						<template v-if="route.name === 'index'">Login</template>
						<template v-if="route.name === 'register'">Create Account</template>
					</h4>
					<p class="auth__description text-gray">
						<template v-if="route.name === 'index'">Add your details below to get back into the app</template>
						<template v-if="route.name === 'register'">Let’s get you started sharing your links!</template>
					</p>
				</div>
				<div class="auth__body flex flex-column">
					<slot />
					<p class="body-m text-gray flex items-center content-center auth__link">
						{{ route.name === "index" ? "Don't have an account?" : "Already have an account?" }}
						<NuxtLink class="text-purple" :to="{ name: route.name === 'index' ? 'register' : 'index' }">
							{{ route.name === "index" ? "Create account" : "Login" }}
						</NuxtLink>
					</p>
				</div>
			</div>
		</div>
	</main>
</template>

<style lang="scss" scoped>
@mixin items-alignment($mobile-alignment, $tablet-alignment: $mobile-alignment, $desktop-alignment: $tablet-alignment) {
	align-items: $mobile-alignment;

	@media screen and (min-width: $tablet) {
		align-items: $tablet-alignment;
	}

	@media screen and (min-width: $desktop) {
		align-items: $desktop-alignment;
	}
}

@mixin content-alignment($mobile-alignment, $tablet-alignment: $mobile-alignment, $desktop-alignment: $tablet-alignment) {
	justify-content: $mobile-alignment;

	@media screen and (min-width: $tablet) {
		justify-content: $tablet-alignment;
	}

	@media screen and (min-width: $desktop) {
		justify-content: $desktop-alignment;
	}
}

.auth {
	height: 100vh;
	width: 100vw;
	@include items-alignment(start, center);
	@include content-alignment(start, center);
	@include padding(3.2rem);

	&__wrapper {
		max-width: 47.6rem;
		@include gap(6.4rem, 5.1rem);

		@include items-alignment(start, center);
		@include content-alignment(start, center);
	}

	&__content {
		@include gap(4rem);
		@include padding(0, 4rem);

		@media screen and (min-width: $tablet) {
			background-color: $white;
		}
	}

	&__body {
		@include gap(2.4rem);
	}

	&__link {
		@include flex-direction(column, row);
		@include gap(0, 0.4rem);
	}
}
</style>
