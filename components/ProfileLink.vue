<script setup lang="ts">
const inputNames: Record<string, string> = {
	github: "GitHub",
	frontendmentor: "Frontend Mentor",
	twitter: "Twitter",
	linkedin: "LinkedIn",
	youtube: "YouTube",
	facebook: "Facebook",
	twitch: "Twitch",
	devto: "Dev.to",
	codewars: "Codewars",
	codepen: "Codepen",
	freecodecamp: "freeCodeCamp",
	gitlab: "Gitlab",
	hashnode: "Hashnode",
	stackoverflow: "Stack Overflow",
};

interface Props {
	link: Link;
	usage: string;
}
defineProps<Props>();
</script>

<template>
	<a :href="link.link" target="_blank" rel="noopener noreferrer" class="platform-link flex items-center content-between gap-8 br-8 body-m" :class="[`platform-link--${link.platform}`, `platform-link--${usage}`]">
		<span class="flex items-center gap-8">
			<ProfileIcon :name="link.platform" />
			{{ inputNames[link.platform] }}
		</span>
		<span class="lh-0" :class="link.platform === 'frontendmentor' ? 'text-gray' : 'text-white'"><BaseIcon name="icon-right" /></span>
	</a>
</template>

<style lang="scss" scoped>
.platform-link {
	&--preview {
		@include padding(1.1rem 1.6rem);
	}

	&--main {
		@include padding(1.6rem);
	}

	&--github {
		@include component-variant(#1a1a1a, $white, transparent);
	}

	&--frontendmentor {
		@include component-variant(#fff, $dark-gray, $borders);
	}

	&--twitter {
		@include component-variant(#43b7e9, $white, transparent);
	}

	&--linkedin {
		@include component-variant(#2d68ff, $white, transparent);
	}

	&--youtube {
		@include component-variant(#ee3939, $white, transparent);
	}

	&--facebook {
		@include component-variant(#2442ac, $white, transparent);
	}

	&--twitch {
		@include component-variant(#ee3fc8, $white, transparent);
	}

	&--devto {
		@include component-variant($dark-gray, $white, transparent);
	}

	&--codewars {
		@include component-variant(#8a1a50, $white, transparent);
	}

	&--codepen {
		@include component-variant(#248C46, $white, transparent);
	}

	&--freecodecamp {
		@include component-variant(#302267, $white, transparent);
	}

	&--gitlab {
		@include component-variant(#EB4925, $white, transparent);
	}

	&--hashnode {
		@include component-variant(#0330D1, $white, transparent);
	}

	&--stackoverflow {
		@include component-variant(#EC7100, $white, transparent);
	}
}
</style>
