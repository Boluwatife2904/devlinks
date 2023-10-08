<script setup lang="ts">
const { userData } = useStore();
const haveUploadedImage = ref(false);

const handleImageSelect = (event: Event) => {
	const target = event.target as HTMLInputElement;
	const files = target.files;
	if (files && files.length > 0) {
		const file = files[0];
		const reader = new FileReader();
		reader.onload = function () {
			userData.image = reader.result as string;
			haveUploadedImage.value = true;
		};
		reader.readAsDataURL(file);
	}
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
							<img v-if="haveUploadedImage" :src="userData.image" alt="user image" class="img-fluid block" />
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
			<BaseButton size="full">Save</BaseButton>
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
