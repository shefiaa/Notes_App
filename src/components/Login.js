import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hint, setHint] = useState('');

  const history = useHistory();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) history.push('/');
  }, [isLoggedIn, history]);

  const simulateLoginRequest = () => {
    setIsLoading(true);
    setHint('Logging in...');

    setTimeout(() => {
      setIsLoggedIn(true);
      setHint('Login successful!');
      history.push('/');
      setIsLoading(false);
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    simulateLoginRequest();
  };

  return (
    <div className="h-screen bg-bg-black text-font-main font-Mulish sm:flex justify-center items-center">
      <div className="p-4 flex flex-col justify-around h-full sm:w-10/12 md:w-7/12 lg:w-5/12">
        <div>
          <h1 className="text-4xl font-bold ">hai, ini adalah sebuah Notes.</h1>
          <p className="capitalize text-2xl mt-3 text-gray-300">Selamat Datang kembali.</p>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="">
              <p className="w-11/12 text-center mt-3 text-lg text-font-secondary rounded">
                {hint}
              </p>
              <input
                type="email"
                className="outline-none w-full p-4 my-3 rounded-lg border border-gray-700 bg-bg-black text-lg"
                placeholder="Email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="outline-none w-full p-4 my-3 rounded-lg border border-gray-700 bg-bg-black text-lg"
                placeholder="Password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full p-4 my-3 rounded-lg text-black font-bold text-xl bg-font-main"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'SUBMIT'}
              </button>
              <p className="text-center text-gray-400">
                Don't have an account?&nbsp;
                <Link to="/register" className="underline">
                  Register a new user
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
