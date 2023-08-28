import { useEffect, useState } from "react";
import { getScaledroneChannelId } from "../utils/getEnv";

const Chat = ({ activeUser, setActiveUser }) => {
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

				//listen for incoming messages
				room.on("open", (error, data) => {
					if (error) {
						return console.error("Error opening room:", error);
					} else {
						console.log("Connected succesfully to test room");
						console.log("data", data);
					}
					// Connected to room
				});

				room.on("history_message", (message) => console.log(message));

				room.on("message", (message) => {
					// Received message from room
					console.log("message", message);
					setMessages((prev) => [...prev, { message: message.data }]);
				});
			});

			return () => {
				drone.close();
			};
		}
	}, [drone]);

	console.log(messages);

	function getRandomColor() {
		return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
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

	return (
		<>
			{/* Chat window */}
			<section className="flex flex-col px-4 gap-2">
				{/* Datestamp */}
				<p className="bg-blue-200 text-neutral-700 py-1 px-3 mx-auto w-fit my-4">
					21.07.2023.
				</p>
				{/* Bubble left */}
				<article className="flex flex-col px-5 py-3 gap-2 bg-orange-300 max-w-[80%] rounded-tl-3xl rounded-tr-3xl rounded-br-3xl">
					<h3 className="text-sm font-semibold">Username</h3>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi sed
						quibusdam temporibus dicta in et nobis officiis eum recusandae ea.
					</p>
				</article>
				<article className="flex flex-col px-5 py-3 gap-2 items-end text-right bg-blue-300 ml-auto max-w-[80%] rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl">
					<h3 className="text-sm font-semibold">Username</h3>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi sed
						quibusdam temporibus dicta in et nobis officiis eum recusandae ea.
					</p>
				</article>
				{messages.map((msg, i) => (
					<p key={i}>{msg.message}</p>
				))}
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
		</>
	);
};

export default Chat;
