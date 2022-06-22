import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { actionsWords, Context } from "../../utils/Reducer/AppContext";
import { ServerPort } from "../../App";
axios.defaults.withCredentials = true
const AdminLogin: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState<string | undefined>(undefined);
  const contextData = useContext(Context);
  const adminLogin = async (e: React.FormEvent) => {
    setLoginStatus("logging in....")
    e.preventDefault();
    try {
      await axios.post(ServerPort + "/admin/login", {
        username: userName,
        password,
      });
      setLoginStatus(undefined)
      contextData?.dispatch({ type: actionsWords.adminLoginSuccess, data: "" });
    } catch (error: any) {
      console.log(error);
      setLoginStatus(error.response.data);
    }
  };
  const retainAdminLoginState = async () => {
    await axios.get(ServerPort + "/admin/retainlogin");
    contextData?.dispatch({ type: actionsWords.adminLoginSuccess, data: "" });
  };
  useEffect(() => {
    retainAdminLoginState();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="relative overflow-hidden">
      <div className=" bg-gradient-to-b text-center from-[#47d4aa] to-[#8ddb90] relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
        <div className="circle"></div>
        <div className="circle1"></div>
        <div className="relative sm:max-w-sm w-full">
          <h1 className="block logo-sm mt-3 text-3xl border-b-2 py-4 shadow-outline bg-white border-gray-100 text-[#676767] text-center font-semibold">
            WORDHASH
          </h1>
          <div className="relative w-full px-6 py-4 bg-white shadow-md">
            <form method="#" action="#" onSubmit={adminLogin} className="mt-4">
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => {
                    setLoginStatus(undefined);
                    setUserName(e.target.value);
                  }}
                  required
                  className="mt-1 block w-full border px-4 border-gray-100 bg-white h-11 shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>

              <div className="mt-7">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setLoginStatus(undefined);
                    setPassword(e.target.value);
                  }}
                  required
                  placeholder="Password"
                  className="mt-1 block w-full border px-4 border-gray-100 bg-white h-11 shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>

              <div className="mt-7 flex">
                <label
                  htmlFor="remember_me"
                  className="inline-flex items-center w-full cursor-pointer"
                >
                  <input
                    id="remember_me"
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    name="remember"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>

                <div className="w-full text-right">/{/*eslint-disable-next-line*/}
                  <a
                    className="underline text-sm text-gray-600 hover:text-gray-900"
                    href="#"
                  >
                    Forgot password ?
                  </a>
                </div>
              </div>
              <div>{loginStatus}</div>

              <div className="mt-7">
                <button className="bg-[#39853c] w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                  Login
                </button>
              </div>

              <div className="flex mt-7 items-center text-center">
                <hr className="border-gray-300 border-1 w-full rounded-md" />
                <label className="block font-medium text-sm text-gray-600 w-full">
                  OR
                </label>
                <hr className="border-gray-300 border-1 w-full rounded-md" />
              </div>

              <div className="flex mt-7 justify-center w-full">
                <button className="mr-5 bg-blue-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                  Facebook
                </button>

                <button className="bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                  Google
                </button>
              </div>

              <div className="mt-7">
                <div className="flex justify-center items-center">
                  <label className="mr-2">Do not have an account?</label>{/*eslint-disable-next-line*/}
                  <a
                    href="#"
                    className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                  >
                    Sign up here
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="circle3"></div>
        <div className="circle4"></div>
      </div>
    </div>
  );
};

export default AdminLogin;
