import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "@/redux/authSlice";
import axios from "axios";
const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  console.log(user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/user/logout", {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="h-12 bg-white ">
      <div className="flex items-center  py-3 justify-between">
        {/* left section */}
        <div>
          <Link to={"/"}>
            <h2 className="text-3xl font-bold text-orange-600">Jobify</h2>
          </Link>
        </div>
        {/* middle section */}
        <div>
          <ul className="flex items-center gap-6">
            {user?.role === "recruiter" ? (
              <>
                <li>
                  <Link to={"/admin/companies"}>Companies</Link>
                </li>
                <li>
                  <Link to={"/admin/jobs"}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/jobs"}>Jobs</Link>
                </li>
                <li>
                  <Link to={"/explore"}>Explore</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        {/* right section */}
        <div className="flex gap-6">
          {!user ? (
            <>
              <Link to={"/login"}>
                <Button className="bg-orange-500 text-white  rounded-md  px-6 py-2 hover:bg-orange-700">
                  Login
                </Button>
              </Link>
              <Link to={"/signup"}>
                <Button className="rounded-md  px-6 py-2">Signup</Button>
              </Link>
            </>
          ) : (
            <Avatar className="cursor-pointer">
              <Popover className="bg-gray-500 w-16 h-6 z-10">
                <PopoverTrigger asChild>
                  <AvatarImage src={user?.profile} alt="profile" />
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <h2 className="text-md text-lg font  -semibol text-gray-600">
                    {user.name}
                  </h2>
                  <p>{user?.profile?.bio}</p>
                  <div>
                    {user && user?.role === "student" && (
                      <Link to={"/profile"}>
                        <Button variant="link">Profile</Button>
                      </Link>
                    )}
                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className="text-center flex justify-end"
                    >
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </Avatar>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
