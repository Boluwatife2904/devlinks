interface Link {
	id: string;
	platform: string;
	link: string;
	order?: number;
	isNew?: boolean;
}

interface UserData {
	firstName: string;
	lastName: string;
	email: string;
	slug: string;
	image_url: string;
}
