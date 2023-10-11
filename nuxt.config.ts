// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	app: {
		head: {
			htmlAttrs: {
				lang: "en",
			},
			title: "Devlinks | Home",
			charset: "UTF-8",
			viewport: "width=device-width, initial-scale=1",
			meta: [
				{ hid: "theme-color", name: "theme-color", content: "#635fc7" },
				{ hid: "description", name: "description", content: "United home where your links live." },
				{ hid: "og:description", name: "og:description", content: "United home where your links live." },
				{ hid: "twitter:description", name: "twitter:description", content: "United home where your links live." },
				{ hid: "og:title", name: "og:title", content: "Devlinks | Home" },
				{ hid: "twitter:title", name: "twitter:title", content: "Devlinks | Home" },
				{ hid: "og:site_name", name: "og:site_name", content: "Devlinks" },
				{ hid: "og:url", name: "og:url", content: "https://audiophile-chi-indol.vercel.app/" },
				{ hid: "og:type", name: "og:type", content: "website" },
				{ hid: "og:image", name: "og:image", content: "https://res.cloudinary.com/juwon-tech/image/upload/v1697055612/Screenshot_2023-10-11_at_21.14.53_fuuw1z.png" },
				{ hid: "twitter:image", name: "twitter:image", content: "https://res.cloudinary.com/juwon-tech/image/upload/v1697055612/Screenshot_2023-10-11_at_21.14.53_fuuw1z.png" },
				{ hid: "twitter:card", name: "twitter:card", content: "summary_large_image" },
			],
			link: [{ rel: "icon", type: "image/png", href: "/favicon.ico" }],
		},
	},
	vite: {
		vue: {
			script: {
				defineModel: true,
				propsDestructure: true,
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
						@import "@/assets/scss/abstract/_mixins.scss";
						@import "@/assets/scss/abstract/_variables.scss";
					`,
				},
			},
		},
	},
	css: ["@/assets/scss/index.scss", "@/assets/scss/fonts.scss"],
	modules: ["@pinia/nuxt", "@nuxtjs/supabase"],
	pinia: {
		autoImports: ["defineStore", "storeToRefs"],
	},
	imports: {
		dirs: ["stores"],
	},
	runtimeConfig: {
		public: {
			frontendBaseUrl: process.env.FRONTEND_BASE_URL,
		},
	},
	supabase: {
		redirect: false,
		redirectOptions: {
			login: "/",
			callback: "/confirm",
		},
	},
});
