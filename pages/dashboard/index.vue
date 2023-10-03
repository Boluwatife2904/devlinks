<script setup lang="ts">
const currentView = ref('links')
</script>

<template>
	<div>
		<DashboardHeader v-model="currentView" />
	</div>
</template>

<style scoped></style>
