import { useState } from "react";
import { loginIllustration } from "../assets";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components";

const Login = ({ setActiveUser }) => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({ username: "" });
	const [errorMsg, setErrorMsg] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleInputChange = (e) => {
		setErrorMsg(null);
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};
	const handleBlur = () => {
		if (formData.username === "") {
			setErrorMsg("Username is required");
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);

		setTimeout(() => {
			const isFormValid = validateForm();

			if (!isFormValid) {
				setLoading(false);
				return;
			}

			localStorage.setItem("chatAppUsername", formData.username);
			setActiveUser(formData.username);
			setLoading(false);
			navigate("/lobby");
		}, 2500);
	};

	const validateForm = () => {
		const { username } = formData;
		switch (true) {
			case username === "":
				setErrorMsg("Username is required");
				return false;
			case username.length < 3:
				setErrorMsg("Username must have at least 3 characters");
				return false;

			default:
				return true;
		}
	};

	return (
		<div className=" bg-blue-600 min-h-screen flex justify-center p-5 pt-10 md:pt-20 md:p-10 xl:p-20 relative">
			{/* Content wrapper */}
			<div className="flex flex-col gap-4 relative z-10 md:landscape:mr-auto lg:mr-auto">
				<h1 className=" text-neutral-100 text-xl">
					Welcome to{" "}
					<span className=" text-orange-600 text-6xl block font-black">
						ChatApp!
					</span>
				</h1>
				{/* Login form */}
				<form
					className="bg-blue-200 p-4 rounded flex flex-col gap-3 shadow-2xl"
					onSubmit={handleSubmit}
				>
					<h2 className=" text-xl font-medium">
						Choose your username to continue
					</h2>
					<div className="flex flex-col md:flex-row">
						<input
							type="text"
							id="username"
							name="username"
							value={formData.username}
							onChange={handleInputChange}
							onBlur={handleBlur}
							className="w-full bg-neutral-50 border-2 border-solid border-blue-800 focus-within:border-orange-800 outline-none py-2 px-4"
						/>

						<button
							type="submit"
							disabled={loading}
							className="w-full h-full md:w-fit bg-blue-800 px-4 py-2 text-neutral-50 disabled:pointer-events-none"
						>
							{loading ? <Loader /> : "GO"}
						</button>
					</div>
					{/* Validation message */}
					{errorMsg && <p className=" text-red-700 text-sm">{errorMsg}</p>}
				</form>
			</div>
			{/* Image wrapepr */}
			<div className="absolute bottom-0 left-0 px-4 w-full flex landscape:hidden md:landscape:flex md:landscape:max-w-xl md:landscape:right-0 md:landscape:left-auto lg:landscape:max-w-4xl ">
				<img
					src={loginIllustration}
					alt="Illustration of man and woman leaning on the large smartphone"
					className="w-full"
				/>
			</div>
		</div>
	);
};

export default Login;
