import { useContext, useState } from "react";
// import avatarUser from "../../assets/images/header-logo/avatar.png";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";
import { login } from "../../services/authService";

interface UserLogin {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    return null;
  }

  const { setToken } = authContext;
  const [userLogin, setUserLogin] = useState<UserLogin>({
    email: "",
    password: "",
  });
  console.log(userLogin);
  const handleSubmit = async () => {
    try {
      const checkLogin = await login(userLogin.email, userLogin.password);
      console.log("checkLogin", checkLogin.data);
      const { access } = checkLogin.data;
      if (checkLogin?.status === 200) {
        localStorage.setItem(
          "token",
          JSON.stringify({
            access: checkLogin.data.access,
            refresh: checkLogin.data.refresh,
          })
        );

        setToken(access);
      }
      // const tokenRefresh = await refreshAccessToken();
      // console.log("tokenRefresh", tokenRefresh);
      if (checkLogin.data.access) {
        toast.success("Login successful!", {
          position: "top-right",
        });
        localStorage.setItem("user", JSON.stringify(userLogin));
        navigate("/admin/users");
      } else {
        toast.error("Login failed!", {
          position: "top-right",
        });
      }
    } catch (err) {
      console.log("login failed", err);
      toast.error("Login failed!", {
        position: "top-right",
      });
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
