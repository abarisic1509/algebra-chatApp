import { Link } from "react-router-dom";
import { Container } from "../components";

const Lobby = () => {
	return (
		<div
			className="w-full bg-orange-100 flex flex-col"
			style={{ minHeight: "calc(100vh - 4.5rem)" }}
		>
			{/* Topbar */}
			<div className="flex bg-blue-300  py-2 px-4 md:px-10">
				<Container>
					<h1 className="text-4xl font-bold"> Lobby</h1>
				</Container>
			</div>

			{/* Main content */}
			<Container className="mt-10 w-full px-6 md:px-10">
				<section className="flex flex-col gap-6 bg-neutral-100 p-6 rounded-sm shadow-2xl ">
					<h2>Choose a room to start chatting</h2>

					<ul className="flex flex-col gap-2">
						<li>
							<Link
								to="/chat/test"
								className="py-3 px-6 bg-blue-200 rounded-sm hover:bg-blue-300 transition-all"
							>
								Test
							</Link>
						</li>
					</ul>
				</section>
			</Container>
		</div>
	);
};

export default Lobby;
