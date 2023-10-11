<script setup lang="ts">
const { userData } = useStore();
const client = useSupabaseClient();
const user = useSupabaseUser();

const haveUploadedImage = ref(userData.image_url ? true : false);
const isLoading = ref(false);
const fileToUpload = ref<File | null>(null);

const handleImageSelect = (event: Event) => {
	const target = event.target as HTMLInputElement;
	const files = target.files;
	if (files && files.length > 0) {
		const file = files[0];
		if (file.size / 1024 < 1024) {
			fileToUpload.value = file;
			const reader = new FileReader();
			reader.onload = function () {
				userData.image_url = reader.result as string;
				haveUploadedImage.value = true;
			};
			reader.readAsDataURL(file);
		} else {
			useEvent("notify", { type: "error", icon: "error", message: "Image limit of 1mb exceeded" });
		}
	}
};

const saveUserProfile = async () => {
	isLoading.value = true;
	let image_url;
	if (fileToUpload.value) {
		const fileExtension = fileToUpload.value.name.split(".").pop();
		const fileName = `${userData.slug}.${fileExtension}`;
		const { error } = await client.storage.from("devlink_avatars").upload(fileName, fileToUpload.value, { upsert: false });
		if (error) {
			isLoading.value = false;
			useEvent("notify", { type: "error", icon: "error", message: "Error uploading profile image!" });
			return;
		}
		image_url = fileName;
		fileToUpload.value = null;
	}
	const { error } = await client.from("devlink_profiles").upsert({ id: user.value?.id, first_name: userData.firstName, last_name: userData.lastName, ...(image_url && { image_url }) });
	if (error) {
		isLoading.value = false;
		useEvent("notify", { type: "error", icon: "error", message: "Error updating your profile!" });
		return;
	}
	isLoading.value = false;
	useEvent("notify", { type: "success", icon: "save", message: "Your changes have been successfully saved!" });
};
</script>

<template>
	<div class="profile flex flex-column">
		<div class="profile__body flex flex-column">
			<div class="profile__text flex flex-column gap-8">
				<h4 class="heading-m text-dark-gray">Profile Details</h4>
				<p class="body-m text-gray">Add your details to create a personal touch to your profile.</p>
			</div>
			<div class="profile__content flex flex-column gap-24">
				<div class="profile__image flex br-12 bg-light-gray">
					<span class="body-m block text-gray w-100 label">Profile picture</span>
					<div class="flex gap-24">
						<div class="picker br-12 position-relative">
							<img v-if="haveUploadedImage" :src="userData.image_url" alt="user image" class="img-fluid block" />
							<input type="file" name="image" id="image" class="none" accept="image/png, image/jpeg" @change="handleImageSelect" />
							<label for="image" class="w-100 h-100 flex flex-column gap-8 items-center content-center cursor pointer position-absolute" :class="{ uploaded: haveUploadedImage }">
								<BaseIcon name="picture" />
								<span class="heading-s">
									<template v-if="haveUploadedImage">Change Image</template>
									<template v-else>+ Upload Image</template>
								</span>
							</label>
						</div>
						<span class="body-s text-gray">Image must be below 1024x1024px. Use PNG or JPG format.</span>
					</div>
				</div>
				<div class="profile__information flex flex-column br-12 bg-light-gray">
					<div class="flex">
						<span class="block w-100">First name*</span>
						<BaseInput type="text" v-model="userData.firstName" class="w-100" id="firstName" name="firstName" placeholder="e.g. John" />
					</div>
					<div class="flex">
						<span class="block w-100">Last name*</span>
						<BaseInput type="text" v-model="userData.lastName" class="w-100" id="lastName" name="lastName" placeholder="e.g. Appleseed" />
					</div>
					<div class="flex">
						<span class="block w-100">Email</span>
						<BaseInput type="email" v-model="userData.email" class="w-100" id="email" name="email" placeholder="e.g. email@example.com" :disabled="true" />
					</div>
				</div>
			</div>
		</div>
		<div class="profile__footer flex content-end">
			<BaseButton size="full" :is-loading="isLoading" @click="saveUserProfile">Save</BaseButton>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.profile {
	height: 100%;

	&__body {
		@include gap(4rem);
		@include padding(2.4rem, 4rem);
	}

	&__image {
		@include padding(2rem);
		@include gap(1.6rem);
		@include items-alignment(start, center);
		@include flex-direction(column, row, row);

		.label {
			max-width: 24rem;
		}

		& > div {
			@include items-alignment(start, center);
			@include flex-direction(column, row, row);
		}

		.picker {
			height: 19.3rem;
			width: 19.3rem;
			flex-shrink: 0;
			overflow: hidden;

			img {
				height: 100%;
				width: 100%;
				object-fit: cover;
			}

			label {
				background: $purple-light;
				color: $purple;
				height: 100%;
				top: 0;
				left: 0;
				cursor: pointer;

				&.uploaded {
					color: $white;
					background: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%);
				}
			}
		}
	}

	&__information {
		@include padding(2rem);
		@include gap(2rem);

		& > div {
			@include gap(0.4rem 1.6rem);
			@include flex-direction(column, row, row);
			@include items-alignment(start, center);

			span {
				@include typography(1.2rem, 1.8rem, 1.6rem, 2.4rem);
				max-width: 24rem;
				color: $dark-gray;

				@media screen and (min-width: $tablet) {
					color: $gray;
				}
			}
		}
	}

	&__footer {
		margin-top: auto;
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
