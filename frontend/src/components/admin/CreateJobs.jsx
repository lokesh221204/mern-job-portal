import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setAdminJobs } from "@/redux/jobSlice";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const CreateJobs = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    salary: 0,
    requirements: "",
    location: "",
    experienceLevel: "",
    jobType: "",
    position: 0,
    comapnyId: "",
  });
  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const { companies } = useSelector((store) => store.company);

  const HandleChange = (value) => {
    const selectedCompany = companies.find(
      (company) => company?.name.toLowerCase() === value
    );
    setInputs({ ...inputs, comapnyId: selectedCompany?._id });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(inputs);
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/api/job/post",
        { ...inputs },

        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        dispatch(setAdminJobs(response.data.job));
        toast.success(response.data.message);
        navigate(`/admin/jobs`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error in creating job", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5">
      <div>
        <h1 className="text-3xl font-bold">Create a new Job</h1>
      </div>
      <div className="flex justify-center items-center mt-16 mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-[500px] py-12 mx-auto shadow-lg rounded-xl border-2 border-black flex flex-col gap-3"
        >
          <h2 className="text-lg font-semibold mt-3 text-center">
            Create New Job
          </h2>
          <div className="grid w-full px-3  items-center gap-1.5">
            <Label htmlFor="name">Title</Label>
            <Input
              type="text"
              name="title"
              value={inputs.title}
              onChange={onChangeHandler}
              placeholder="Enter your title"
            />
          </div>
          <div className="grid w-full px-3  items-center gap-1.5">
            <Label htmlFor="name">Desc</Label>
            <Input
              type="text"
              name="description"
              value={inputs.description}
              onChange={onChangeHandler}
              placeholder="Enter your description"
            />
          </div>
          <div className="grid w-full px-3  items-center gap-1.5">
            <Label htmlFor="name">Salary</Label>
            <Input
              type="number"
              name="salary"
              value={inputs.salary}
              onChange={onChangeHandler}
              placeholder="Enter  salary"
            />
          </div>
          <div className="grid w-full px-3  items-center gap-1.5">
            <Label htmlFor="name">Location</Label>
            <Input
              type="text"
              name="location"
              value={inputs.location}
              onChange={onChangeHandler}
              placeholder="Enter your location"
            />
          </div>
          <div className="grid w-full px-3  items-center gap-1.5">
            <Label htmlFor="name">Requirements</Label>
            <Input
              type="text"
              name="requirements"
              value={inputs.requirements}
              onChange={onChangeHandler}
              placeholder="Enter your requirements"
            />
          </div>
          <div className="grid w-full px-3  items-center gap-1.5">
            <Label htmlFor="name">experienceLevel</Label>
            <Input
              type="text"
              name="experienceLevel"
              value={inputs.experienceLevel}
              onChange={onChangeHandler}
              placeholder="Enter experienceLevel"
            />
          </div>
          <div className="grid w-full px-3  items-center gap-1.5">
            <Label htmlFor="name">Job type</Label>
            <Input
              type="text"
              name="jobType"
              value={inputs.jobType}
              onChange={onChangeHandler}
              placeholder="Enter job Type"
            />
          </div>
          <div className="grid w-full px-3  items-center gap-1.5">
            <Label htmlFor="name">Position</Label>
            <Input
              type="number"
              name="position"
              value={inputs.position}
              onChange={onChangeHandler}
              placeholder="Enter position"
            />
          </div>
          <div className="grid w-[36] px-3 z-30  items-center gap-1.5">
            <Select onValueChange={HandleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select company" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {companies
                    .filter(
                      (company) => company?.name && company?.name.trim() !== ""
                    )
                    .map((company) => (
                      <SelectItem
                        key={company?.name}
                        value={company?.name?.toLowerCase()}
                      >
                        {company.name}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button
            disabled={loading}
            type="submit"
            className=" bg-black text-white mt-12 w-[40%] rounded-lg mx-auto hover:bg-black"
          >
            Create
          </Button>
          {companies.length === 0 ? (
            <p className="text-center text-red-600 mt-3">
              No companies found please add company to post a job
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
};
export default CreateJobs;
