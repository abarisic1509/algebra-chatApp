const Chat = () => {
	return (
		<div className="w-screen min-h-screen flex flex-col">
			{/* Header */}
			<header className="bg-blue-400 flex items-center justify-center py-2 px-4 fixed top-0 left-0 w-full">
				<h1>Chat</h1>
			</header>
			<main className="pt-10 bg-neutral-50 h-full">
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
				</section>
			</main>
			{/* Footer */}
			<footer className="bg-blue-400 w-full mt-auto px-4 py-3">
				<form className="flex gap-2">
					<textarea
						name="message"
						id="message"
						rows="2"
						className="w-full bg-neutral-50 border border-solid border-blue-300 rounded-2xl text-neutral-800 outline-blue-600 p-3"
					></textarea>

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
