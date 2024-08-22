import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import AuthContext from "../../context/AuthContext";
import { login } from "../../services/authService";

// create schema
const schema = yup
  .object({
    email: yup
      .string()
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email address")
      .required("Required email"),
    password: yup
      .string()
      // matches use case check validation password
      // .matches(
      //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/s,
      //   "Password must have at least 8 characters"
      // )
      .required("Required password")
      .min(6, "Password min 6 charater "),
  })
  .required();
interface UserLogin {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState<boolean>(false);
  const { setToken } = authContext || {};

  // create hook useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const location = useLocation();

  const from = location?.state?.from?.pathname || "/admin/resources/categories";

  useEffect(() => {
    const handleLogin = async (data: UserLogin) => {
      const checkLogin = await login(data.email, data.password);
      setLoader(false);
      localStorage.setItem(
        "token",
        JSON.stringify({
          access: checkLogin.data.access,
          refresh: checkLogin.data.refresh,
        })
      );
      if (setToken) {
        setToken(checkLogin.data.access);
      }

      if (checkLogin.status === 200) {
        toast.success("Login successful!");
        navigate(from, { replace: true });
      } else {
        toast.error(checkLogin.data.detail);
      }
    };
    if (loader) {
      handleLogin(data);
    }
  }, [loader, data, navigate, setToken, from]);

  // submit of react-hook-form
  const onSubmit = (data: UserLogin) => {
    setData(data);
    setLoader(true);
  };

  return (
    <div className="flex flex-col items-center mt-20 ">
      <div className="min-w-[380px] mx-auto mt-10 px-10 py-8 bg-white rounded-lg shadow-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center "
        >
          <label className="block w-full">
            <span className="text-gray-700">Email</span>
            <input
              type="text"
              placeholder="Input email"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </label>
          <label className="block mt-4 w-full">
            <span className="text-gray-700">Password</span>
            <input
              type="password"
              placeholder="Input password"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </label>
          <button
            type="submit"
            className="mt-6 w-full flex items-center justify-center  py-2 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
