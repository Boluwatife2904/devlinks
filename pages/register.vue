<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";

definePageMeta({
	layout: "auth",
});

const { isLoading, signUpWithSupabase } = useSupabaseAuth();

const form = reactive({ email: "", password: "", confirmPassword: "" });

const rules = {
	email: { required, email },
	password: { required, minLength: minLength(8) },
	confirmPassword: { required, minLength: minLength(8), sameAs: sameAs(computed(() => form.password)) },
};

const v$ = useVuelidate(rules, form, { $autoDirty: true });

const createAccount = async () => {
	try {
		await signUpWithSupabase({ email: form.email, password: form.password });
		navigateTo({ name: "dashboard" });
	} catch (error) {
		useEvent("notify", { icon: "error", type: "error", message: error });
	}
};
</script>

<template>
	<section class="flex flex-column gap-24">
		<BaseInput v-model="form.email" icon="email" type="email" id="email" name="email" label="Email address" placeholder="e.g. alex@email.com" :is-invalid="v$.email.$error" />
		<BaseInput v-model="form.password" icon="lock" type="password" id="password" name="password" label="Create password" placeholder="At least 8 characters" :is-invalid="v$.password.$error" />
		<BaseInput v-model="form.confirmPassword" icon="lock" type="password" id="confirmPassword" name="confirmPassword" label="Confirm password" placeholder="At least 8 characters" :is-invalid="v$.confirmPassword.$error" />
		<span class="block body-s text-gray">Password must contain at least 8 characters</span>
		<BaseButton variant="primary" size="full" type="button" :disabled="v$.$invalid || isLoading" :is-loading="isLoading" @click="createAccount">Create new account</BaseButton>
	</section>
</template>

<style scoped></style>
