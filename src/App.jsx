import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Chat, Login, Lobby } from "./screens";
import { Header } from "./components";

function App() {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [activeUser, setActiveUser] = useState(
		localStorage.getItem("chatAppUsername") || null
	);

	useEffect(() => {
		//if there is no active user, redirect to login
		if (!activeUser) {
			navigate("/");
		}
	}, [activeUser]);

	return (
		<div className="max-w-screen min-h-screen flex flex-col">
			{pathname !== "/" && (
				<Header activeUser={activeUser} setActiveUser={setActiveUser} />
			)}
			<main className="bg-neutral-50 flex flex-auto relative z-10">
				<Routes>
					<Route path="/" element={<Login setActiveUser={setActiveUser} />} />
					<Route path="/lobby" element={<Lobby />} />
					<Route
						path="/chat/:id"
						element={
							<Chat activeUser={activeUser} setActiveUser={setActiveUser} />
						}
					/>
				</Routes>
			</main>
		</div>
	);
}

export default App;
