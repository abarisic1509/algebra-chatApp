const Container = ({ children, className }) => {
	return (
		<div className={`max-w-7xl mx-auto w-full ${className}`}>{children}</div>
	);
};

export default Container;
