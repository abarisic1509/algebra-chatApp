import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Chat, Login, Lobby } from "./screens";
import { Header } from "./components";

function App() {
	const navigate = useNavigate();
	const location = useLocation();
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
		<div className="w-screen min-h-screen flex flex-col">
			{location.pathname !== "/" && <Header />}
			<main className="bg-neutral-50 flex-auto">
				<Routes>
					<Route path="/" element={<Login setActiveUser={setActiveUser} />} />
					<Route
						path="/lobby"
						element={
							<Lobby activeUser={activeUser} setActiveUser={setActiveUser} />
						}
					/>
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
