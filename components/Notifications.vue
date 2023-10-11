<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";

const notifications = ref<{ _id: string; type: string; message: string; icon: string }[]>([]);

const addNewNotification = (type: string, message: string, icon: string) => {
	notifications.value.push({ _id: uuidv4(), type, message, icon });
	setTimeout(() => {
		notifications.value.splice(notifications.value.length - 1, 1);
	}, 1000);
};

useListen("notify", (notification: { type: string; icon: string; message: string }) => {
	addNewNotification(notification.type, notification.message, notification.icon);
});
</script>

<template>
	<ul class="notifications position-fixed flex items-center flex-column w-100">
		<TransitionGroup name="slideIn">
			<li v-for="notification in notifications" :key="notification._id" class="notifications__item flex br-12 gap-8" :class="[`notifications__item--${notification.type}`]">
				<IconNotifications :name="notification.icon" />
				<p class="heading-s weight-600">{{ notification.message }}</p>
			</li>
		</TransitionGroup>
	</ul>
</template>

<style lang="scss" scoped>
.notifications {
	@include gap(1rem);
	@include padding(4rem 2rem);
	top: 0;
	left: 0;
	height: 100vh;
	justify-content: flex-end;
	list-style: none;
	z-index: 150;
	pointer-events: none;

	&__item {
		@include padding(1.6rem 2.4rem);
		width: 95%;
		max-width: 40.6rem;
		box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.1);
		align-items: flex-start;

		svg {
			transform: translateY(0.3rem);
		}

		&--success {
			background-color: $dark-gray;
			color: $light-gray;
		}

		&--error {
			background-color: $red;
			color: $light-gray;
		}
	}
}
</style>
