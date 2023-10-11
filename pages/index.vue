<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

definePageMeta({
	layout: "auth",
});

const { isLoading, loginWithSupabase } = useSupabaseAuth();
const form = reactive({
	email: "",
	password: "",
});

const rules = {
	email: { required, email },
	password: { required, minLength: minLength(8) },
};

const v$ = useVuelidate(rules, form, { $autoDirty: true });

const login = async () => {
	try {
		await loginWithSupabase(form);
		navigateTo({ name: "dashboard" });
	} catch (error) {
		useEvent("notify", { icon: "error", type: "error", message: error });
	}
};
</script>

<template>
	<section class="flex flex-column gap-24">
		<BaseInput v-model="form.email" icon="email" type="email" id="email" name="email" label="Email address" placeholder="e.g. alex@email.com" :is-invalid="v$.email.$error" />
		<BaseInput v-model="form.password" icon="lock" type="password" id="password" name="password" label="Password" placeholder="Enter your password" :is-invalid="v$.password.$error" />
		<BaseButton variant="primary" size="full" type="button" :disabled="v$.$invalid" :is-loading="isLoading" @click="login">Login</BaseButton>
	</section>
</template>

<style lang="scss" scoped></style>
