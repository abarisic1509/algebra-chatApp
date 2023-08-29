import { useEffect, useState } from "react";
import { getScaledroneChannelId } from "../utils/getEnv";

const Chat = ({ activeUser }) => {
	//const [members, setMembers] = useState([]);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [drone, setDrone] = useState(null);
	const channelId = getScaledroneChannelId();

	useEffect(() => {
		//initializing scaledrone
		// eslint-disable-next-line no-undef
		const scaledrone = new Scaledrone(channelId, {
			data: {
				name: activeUser,
				color: getRandomColor(),
			},
		});
		setDrone(scaledrone);
	}, []);

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
				const room = drone.subscribe("test", { historyCount: 5 });
				console.log("room", room);

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
					// List of members as an array
				});
				// User joined the room
				// room.on("member_join", (member) => {
				// 	setMembers((prev) => [...prev, member]);
				// });

				// User left the room
				// room.on("member_leave", ({ id }) => {
				// 	const filteredMembers = members.filter((member) => member.id === id);
				// 	setMembers(filteredMembers);
				// });

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

	function getRandomColor() {
		return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
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
				room: "test",
				message: newMessage,
			});
			setNewMessage("");
		}
	};

	console.log("messages", messages);
	//console.log("drone", drone);

	return (
		<div
			className="grid bg-orange-100 w-full"
			style={{ gridTemplateRows: "1fr auto" }}
		>
			{/* Chat window */}
			<section className="flex flex-col px-4 gap-2">
				{messages.map((msg, i) => {
					if (msg.clientId === drone.clientId) {
						return (
							<article
								key={drone.clientId + i}
								className="flex flex-col px-5 py-3 gap-2 shadow-lg items-end text-right bg-neutral-100 ml-auto max-w-[80%] rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl"
							>
								<h3 className="text-lg font-semibold">Username</h3>
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
								className="flex flex-col shadow-lg px-5 py-3 gap-2 bg-neutral-100 max-w-[80%] rounded-tl-3xl rounded-tr-3xl rounded-br-3xl"
							>
								<h3 className="text-lg font-semibold">Username</h3>
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
			<footer className="bg-blue-400 w-full mt-auto px-4 py-3">
				<form className="flex gap-2" onSubmit={handleSendMessage}>
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
			</footer>
		</div>
	);
};

export default Chat;
