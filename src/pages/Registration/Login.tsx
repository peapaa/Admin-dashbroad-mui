import { useState } from "react";
import avatarUser from "../../assets/images/header-logo/avatar.png";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
export interface User {
  name: string;
  email: string;
  id: string;
  role: string;
  time: string;
  date: string;
  expiration: number;
  avatar?: string;
  active: string;
}

interface UserLogin {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dataUser: User[] = [
    {
      name: "Thien admin123",
      email: "admin@gmail.com",
      id: "thien123",
      role: "admin",
      time: "10000",
      date: "17/07/2024",
      expiration: 10000,
      avatar: avatarUser,
      active: "active",
    },
    {
      name: "Kaka admin123",
      email: "admin1@gmail.com",
      id: "thien1234",
      role: "user",
      time: "10000",
      date: "17/07/2024",
      expiration: 10000,
      avatar: avatarUser,
      active: "active",
    },
  ];
  const [userLogin, setUserLogin] = useState<UserLogin>({
    email: "",
    password: "",
  });
  console.log(userLogin);
  const handleSubmit = () => {
    if (userLogin.email === dataUser[0].email && userLogin.password) {
      sessionStorage.setItem("UserCurrent", JSON.stringify(dataUser[0]));
      const data = sessionStorage.getItem("UserCurrent");
      const user: User | null = data ? JSON.parse(data) : null;
      if (user?.active === "active") {
        <Alert severity="success">Login susscessfully</Alert>;
        navigate("/admin/users");
      }
    }
  };
  return (
    <div className="flex flex-col items-center mt-20 ">
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <label className="block">
          <span className="text-gray-700">Email</span>
          <input
            type="text"
            placeholder="Input email"
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={userLogin.email}
            onChange={(e) =>
              setUserLogin({ ...userLogin, email: e.target.value })
            }
          />
        </label>
        <label className="block mt-4">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            placeholder="Input password"
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={userLogin.password}
            onChange={(e) =>
              setUserLogin({ ...userLogin, password: e.target.value })
            }
          />
        </label>
        <button
          type="button"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;
