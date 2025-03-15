import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    role: "",
    password: "",
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        "http://localhost:4000/api/user/signin",
        inputs,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success === true) {
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error in login", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center mt-16 mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-[500px] mx-auto shadow-md rounded-md border-2 border-gray-200 flex flex-col gap-3"
        >
          <h2 className="text-lg font-semibold text-center mt-2">
            Login into your account
          </h2>

          <div className="grid w-full px-3  items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              value={inputs.email}
              name="email"
              onChange={onChangeHandler}
              placeholder="Enter your Email"
            />
          </div>

          <div className="grid w-full px-3 items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              value={inputs.password}
              name="password"
              onChange={onChangeHandler}
              placeholder="Enter your password"
            />
          </div>
          <div className="flex ml-2 items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  onChange={onChangeHandler}
                  name="role"
                  value="student"
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="recruiter"
                  name="role"
                  onChange={onChangeHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            "creating Please wait ..."
          ) : (
            <Button
              type="submit"
              className=" bg-black text-white w-[90%] rounded-lg mx-auto hover:bg-black"
            >
              Login
            </Button>
          )}
          <div className="flex gap-3 my-5">
            <span className="ml-2">Don't have an account?</span>
            <span>
              {" "}
              <Link
                to={"/signup"}
                className="text-blue-500 hover:underline mb-3 ml-2 "
              >
                Signup
              </Link>{" "}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
