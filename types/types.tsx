export interface ChatProps {
	id: string;
	user: {
		id: string;
		name: string;
		image: string;
	};
	lastMessage: {
		id: string;
		text: string;
		createdAt: string;
	};
}

export interface MessageProps {
	id: string;
	text: string;
	createdAt: string;
	user: {
		id: string;
		name: string;
	};
}

export interface UserProps {
	id: string;
	name: string;
	image: string;
	status?: string;
}
