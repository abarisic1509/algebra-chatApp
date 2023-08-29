export const getScaledroneChannelId = () => {
	const channelId =
		import.meta.env.VITE_SCALEDRONE_CHANNEL_ID ||
		process.env.VITE_SCALEDRONE_CHANNEL_ID;

	if (!channelId) {
		throw new Error("VITE_SCALEDRONE_CHANNEL_ID not defined");
	}

	return channelId;
};
export const getScaledroneSecretKey2 = () => {
	const secretKEy =
		import.meta.env.VITE_SCALEDRONE_SECRET_KEY2 ||
		process.env.VITE_SCALEDRONE_SECRET_KEY2;

	if (!secretKEy) {
		throw new Error("VITE_SCALEDRONE_SECRET_KEY not defined");
	}

	return secretKEy;
};
export const getScaledroneChannelId2 = () => {
	const channelId =
		import.meta.env.VITE_SCALEDRONE_CHANNEL_ID2 ||
		process.env.VITE_SCALEDRONE_CHANNEL_ID2;

	if (!channelId) {
		throw new Error("VITE_SCALEDRONE_CHANNEL_ID not defined");
	}

	return channelId;
};
export const getScaledroneSecretKey = () => {
	const secretKEy =
		import.meta.env.VITE_SCALEDRONE_SECRET_KEY ||
		process.env.VITE_SCALEDRONE_SECRET_KEY;

	if (!secretKEy) {
		throw new Error("VITE_SCALEDRONE_SECRET_KEY not defined");
	}

	return secretKEy;
};
