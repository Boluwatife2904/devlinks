<script setup lang="ts">
const currentView = ref("profile");
</script>

<template>
	<div class="dashboard">
		<DashboardHeader v-model="currentView" />
		<div class="dashboard__content grid">
			<div class="dashboard__content--left bg-white"></div>
			<div class="dashboard__content--right bg-white">
				<LazyDashboardLinks v-if="currentView === 'links'" />
				<LazyDashboardProfile v-else-if="currentView === 'profile'" />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.dashboard {
	&__content {
		@include gap(2.4rem);
		min-height: calc(100vh - 16rem);

		@media screen and (min-width: $desktop) {
			grid-template-columns: 56rem auto;
		}

		&--left {
			@include padding(2.4rem);
			@include visibility(none, none, block);
		}

		&--right {
			// @include padding(2.4rem, 4rem);
		}
	}
}
</style>
