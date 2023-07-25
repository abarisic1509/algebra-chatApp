export const getScaledroneChannelId = () => {
	const channelId = import.meta.env.VITE_SCALEDRONE_CHANNEL_ID;
	// ||	process.env.VITE_SCALEDRONE_CHANNEL_ID;

	if (!channelId) {
		throw new Error("VITE_SCALEDRONE_CHANNEL_ID not defined");
	}

	return channelId;
};
export const getScaledroneSecretKey = () => {
	const secretKEy = import.meta.env.VITE_SCALEDRONE_SECRET_KEY;
	// || process.env.VITE_SCALEDRONE_SECRET_KEY;

	if (!secretKEy) {
		throw new Error("VITE_SCALEDRONE_SECRET_KEY not defined");
	}

	return secretKEy;
};
