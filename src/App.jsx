import { Route, Routes } from "react-router-dom";
import Chat from "./screens/Chat";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Chat />} />
				{/* <Route path="/lobby" />
				<Route path="/chat/:id" /> */}
			</Routes>
		</>
	);
}

export default App;
