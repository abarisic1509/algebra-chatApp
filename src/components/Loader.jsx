const Loader = () => {
	return (
		<div className="flex items-center justify-center space-x-2">
			<div className="w-3 h-3 rounded-full animate-pulse dark:bg-neutral-200"></div>
			<div
				className="w-3 h-3 rounded-full animate-pulse dark:bg-neutral-200"
				style={{ animationDelay: ".25s" }}
			></div>
			<div
				className="w-3 h-3 rounded-full animate-pulse dark:bg-neutral-200"
				style={{ animationDelay: ".5s" }}
			></div>
		</div>
	);
};

export default Loader;
