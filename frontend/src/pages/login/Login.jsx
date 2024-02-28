import { Link } from "react-router-dom";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";


const Login = () => {

	const [userName, setUserName] = useState();
	const [password, setPassword] = useState();

	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault()
		await login(userName, password);
	}
	return (
		<div className='flex flex-col items-center justify-center w-full sm:w-1/2 md:w-1/3 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					<span className='text-slate-50'> Let's Chat</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text text-gray-400'>Username</span>
						</label>
						<input type='text' placeholder='Enter username' className='w-full input input-bordered h-10'
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text text-gray-400'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={password}
							onChange={(e) => setPassword(e.target.value)}

						/>
					</div>
					<Link to="/signup" className='text-sm text-gray-400 hover:underline hover:text-blue-600 mt-2 inline-block'>
						{"Don't"} have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2' disabled={loading}>
							{loading ?
								<span className="loading loading-spinner"></span> : "Login"
							}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Login;