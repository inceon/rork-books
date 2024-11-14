
type User = {
	id: string; // User's unique identifier
	name: string;
	avatar: string;
	avatar_theme: string;
	gender: string;
	tariff_plan: string;
	followersCount: number;
	followingCount: number;
	reviewsCount: number;
	isMe: boolean; // Indicates if this is the current user
	followItem: null // | FollowItem; // Replace 'FollowItem' with the appropriate type if available
	isUserIsBlockedByMe: null | boolean;
	isMeHaveBeenBlockedByUser: null | boolean;
	clientInfoToUpdate: ClientInfoToUpdate;
	token?: string;
}

type ClientInfoToUpdate = {
	updated_at: string; // Likely a Unix timestamp in milliseconds
	name: string;
	avatar: string;
	avatar_theme: string;
	gender: string;
	role: string;
	email: string;
	appearance: string;
	tariff_plan: string;
	tariff_plan_expires_date_unix: string;
	focus_mode: string;
	focus_mode_setting: string;
	rating_system: string;
	rating_sign: string;
}