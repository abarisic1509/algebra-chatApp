import { GiExitDoor } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import Container from "./Container";

const Header = ({ setActiveUser }) => {
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem("chatAppUsername");
		setActiveUser(null);
		navigate("/");
	};

	return (
		<header className="bg-blue-600  py-2 px-4 md:px-10 sticky top-0 left-0 z-20 w-full">
			<Container className="flex items-center justify-between w-full">
				<h1 className="text-orange-600 text-2xl block font-black">ChatApp</h1>

				<button
					onClick={logout}
					title="Logout"
					className=" w-10 h-10 grid place-items-center text-neutral-100 text-2xl bg-blue-800 transition-all hover:bg-transparent hover:text-orange-400"
				>
					<GiExitDoor />
				</button>
			</Container>
		</header>
	);
};

export default Header;
