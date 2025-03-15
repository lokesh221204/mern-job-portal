import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
const Signup = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    role: "",
    phoneNumber: "",
    file: "",
    password: "",
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const fileHandler = (e) => {
    setInputs({ ...inputs, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("email", inputs.email);
    formData.append("password", inputs.password);
    formData.append("role", inputs.role);
    formData.append("phoneNumber", inputs.phoneNumber);
    if (inputs.file) {
      formData.append("file", inputs.file);
    }
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        "http://localhost:4000/api/user/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.data.success === true) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error in signup", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center mt-16 mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-[500px] mx-auto shadow-lg rounded-md border-1 border-gray-500 flex flex-col gap-3"
        >
          <h2 className="text-lg font-semibold mt-3 text-center">
            Create your account
          </h2>
          <div className="grid w-full px-3  items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="name"
              value={inputs.name}
              onChange={onChangeHandler}
              placeholder="Enter your name"
            />
          </div>
          <div className="grid w-full px-3  items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={inputs.email}
              onChange={onChangeHandler}
              placeholder="Enter your Email"
            />
          </div>
          <div className="grid w-full px-3  items-center gap-1.5">
            <Label htmlFor="phone">PhoneNumber</Label>
            <Input
              type="number"
              name="phoneNumber"
              value={inputs.phoneNumber}
              onChange={onChangeHandler}
              placeholder="Enter your number"
            />
          </div>
          <div className="grid w-full px-3 items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              value={inputs.password}
              onChange={onChangeHandler}
              placeholder="Enter your password"
            />
          </div>
          <div className="flex ml-2 items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  onChange={onChangeHandler}
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
            <div className="flex items-center px-3 gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                onChange={fileHandler}
                type="file"
                name="file"
                className="cursor-pointer"
              />
            </div>
          </div>
          <Button
            type="submit"
            className=" bg-black text-white w-[90%] rounded-lg mx-auto hover:bg-black"
          >
            Signup
          </Button>
          <div className="flex gap-2 my-2">
            <span className="ml-2">Already have an account?</span>
            <Link to={"/login"} className="text-blue-500 mb-3 ml-2 ">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;
