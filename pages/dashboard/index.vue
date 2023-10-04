<script setup lang="ts">
const currentView = ref("links");
</script>

<template>
	<div class="dashboard">
		<DashboardHeader v-model="currentView" />
		<div class="dashboard__content grid">
			<div class="dashboard__content--left bg-white br-12"></div>
			<div class="dashboard__content--right bg-white br-12">
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
		@include padding(0 2.4rem);
		position: fixed;
		left: 0;
		height: calc(100vh - 16rem);
		overflow-y: scroll;
		width: 100%;

		@media screen and (min-width: $desktop) {
			grid-template-columns: 56rem auto;
		}

		&--left {
			@include padding(2.4rem);
			@include visibility(none, none, block);
			position: sticky;
			top: 0;
			left: 0;
			height: calc(100vh - 16rem);
		}

		&--right {
			// @include padding(2.4rem, 4rem);
		}
	}
}
</style>
