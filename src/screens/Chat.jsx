import { useEffect, useRef, useState } from "react";
import {
	getScaledroneChannelId,
	getScaledroneChannelId2,
} from "../utils/getEnv";
import { Link, useParams } from "react-router-dom";
import { Container } from "../components";

const Chat = ({ activeUser }) => {
	const params = useParams();
	const chatContainerRef = useRef(null);

	const [activeMembers, setActiveMembers] = useState([]);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [drone, setDrone] = useState(null);
	const channelId =
		params.id === "test" ? getScaledroneChannelId() : getScaledroneChannelId2();

	//initializing scaledrone
	useEffect(() => {
		// eslint-disable-next-line no-undef
		const scaledrone = new Scaledrone(channelId, {
			data: {
				name: activeUser,
				color: getRandomColor(),
			},
		});
		setDrone(scaledrone);
	}, []);

	//after scaledrone is initialized
	useEffect(() => {
		if (drone) {
			//connect to the room
			drone.on("open", (error) => {
				if (error) {
					console.log("Error in connecting:", error);
				} else {
					console.log("Connected succesfully");
				}
				//subscribe to channel
				const room = drone.subscribe(params.id);

				//listen for incoming messages
				room.on("open", (error) => {
					if (error) {
						return console.error("Error opening room:", error);
					} else {
						console.log("Connected succesfully to test room");
					}
				});

				// List of currently online members, emitted once
				room.on("members", (members) => {
					console.log("members", members);
					const filteredMembers = members.map((memb) => {
						if (activeMembers.some((m) => m.id === memb.id)) {
							return;
						}
						return memb;
					});
					setActiveMembers(filteredMembers);
				});
				//User joined the room
				room.on("member_join", (member) => {
					setActiveMembers((prev) => [...prev, member]);
				});

				//User left the room
				room.on("member_leave", ({ id }) => {
					const filteredMembers = activeMembers.filter(
						(member) => member.id !== id
					);
					setActiveMembers(filteredMembers);
				});

				room.on("history_message", (message) => {
					if (messages.some((m) => m.id === message.id)) {
						return;
					}

					setMessages((prev) => [...prev, message]);
				});

				room.on("message", (message) => {
					// Received message from room
					setMessages((prev) => [...prev, message]);
				});
			});

			return () => {
				drone.close();
			};
		}
	}, [drone]);

	//chat container scrolling
	useEffect(() => {
		//check if chatContainer exists within DOM
		if (chatContainerRef.current) {
			//if it exists, scroll to bottom whenever messages are updated
			window.scrollTo({
				top: document.documentElement.scrollHeight,
				scrollBehavior: "smooth",
			});
		}
	}, [messages]);

	function getRandomColor() {
		return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
	}

	function getUserColor(userId) {
		const userData = activeMembers.find((memb) => memb.id === userId);

		if (userData) {
			return userData.clientData.color;
		} else {
			return "";
		}
	}
	function getUserName(userId) {
		const userData = activeMembers.find((memb) => memb.id === userId);

		if (userData) {
			return userData.clientData.name;
		} else {
			return "";
		}
	}

	function generateTimestamp(timestamp) {
		const formattedTimestamp = new Date(timestamp);

		const hours = formattedTimestamp.getHours();
		const minutes = formattedTimestamp.getMinutes();

		return `${hours}:${minutes}`;
	}

	const handleInputChange = (e) => {
		console.log(e.target.value);
		setNewMessage(e.target.value);
	};

	const handleSendMessage = (e) => {
		e.preventDefault();
		if (newMessage.trim() !== "") {
			// Send the message to Scaledrone
			drone.publish({
				room: params.id,
				message: newMessage,
			});
			setNewMessage("");
		}
	};

	console.log("activeMembers", activeMembers);
	console.log("drone", drone);

	return (
		<div
			className="grid bg-orange-100 w-full relative"
			style={{ gridTemplateRows: "auto 1fr auto" }}
		>
			{/* Topbar */}
			<div className="flex bg-blue-300  py-2 px-4 md:px-10 fixed top-[3.5rem] shadow-lg left-0 w-full">
				<Container className="flex items-center justify-between gap-4">
					{/* Breadcrumbs */}
					<div className="flex items-center gap-2">
						<Link
							to="/lobby"
							className="text-xl font-medium text-orange-700 hover:opacity-60"
						>
							Lobby
						</Link>
						<span className="text-xl font-black">{`>`}</span>
						<p className="text-xl font-medium"> {params.id}</p>
					</div>

					{/* Active users */}
					{activeMembers.length > 0 && (
						<p className="text-sm font-medium">
							{activeMembers.length}{" "}
							{activeMembers.length === 1 ? "user" : "users"} online
						</p>
					)}
				</Container>
			</div>
			{/* Chat window */}
			<section
				ref={chatContainerRef}
				className="flex flex-col px-4 gap-2 pt-28 pb-20"
			>
				{messages.map((msg, i) => {
					if (msg.clientId === drone.clientId) {
						return (
							<article
								key={drone.clientId + i}
								className="flex flex-col px-5 py-3 gap-2 shadow-lg items-end text-right bg-neutral-100 ml-auto min-w-[150px] max-w-[40rem] rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl"
							>
								<h3
									className="text-lg font-semibold"
									style={{ color: getUserColor(msg.clientId) }}
								>
									{getUserName(msg.clientId)}
								</h3>
								<p>{msg.data}</p>
								<p className="text-sm py-1 w-fit mt-4">
									{generateTimestamp(msg.timestamp)}
								</p>
							</article>
						);
					} else {
						return (
							<article
								key={msg.clientId + i}
								className="flex flex-col mr-auto shadow-lg px-5 py-3 gap-2 bg-neutral-100 min-w-[150px] max-w-[40rem] rounded-tl-3xl rounded-tr-3xl rounded-br-3xl"
							>
								<h3
									className="text-lg font-semibold"
									style={{ color: getUserColor(msg.clientId) }}
								>
									{getUserName(msg.clientId)}
								</h3>
								<p>{msg.data}</p>
								<p className="text-sm py-1 w-fit mt-4">
									{generateTimestamp(msg.timestamp)}
								</p>
							</article>
						);
					}
				})}
			</section>
			{/* Footer */}
			<footer className="bg-blue-400 w-full mt-auto px-4 py-3 fixed bottom-0 left-0">
				<Container className="w-full">
					<form className="w-full flex gap-2" onSubmit={handleSendMessage}>
						<input
							type="text"
							name="message"
							id="message"
							value={newMessage}
							onChange={handleInputChange}
							className="w-full bg-neutral-50 border border-solid border-blue-300 rounded-2xl text-neutral-800 outline-blue-600 p-3"
						/>

						<button
							type="submit"
							className="bg-orange-600 min-h-full px-8 text-neutral-50 rounded-lg hover:bg-orange-700"
						>
							SEND
						</button>
					</form>
				</Container>
			</footer>
		</div>
	);
};

export default Chat;
