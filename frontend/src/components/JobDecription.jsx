import { useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "react-toastify";

const JobDecription = () => {
  const params = useParams();
  const jobId = params.id;

  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);
  const isInitialApplied = singleJob?.application?.some(
    (item) => item.applicant === user._id || false
  );
  const [isApplied, setIsApplied] = useState(isInitialApplied);
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/job/get-single/${jobId}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          setIsApplied(
            singleJob?.application?.some((item) => item.applicant === user._id)
          );
          dispatch(setSingleJob(response.data.job));
        }
      } catch (error) {
        console.log("error in fetching single job", error);
      }
    };
    fetchSingleJob();
  }, []);

  const handleJobApply = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/application/apply/${jobId}`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setIsApplied(true);
        const updatedData = {
          ...singleJob,
          application: [...singleJob?.application, { applicant: user?._id }],
        };
      }
    } catch (error) {
      console.log("error in job", error);
    }
  };
  return (
    <div className="w-full mx-auto my-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-gray-800">
            {singleJob?.title}
          </h1>
          <div className="flex gap-4 items-center">
            <Badge className="bg-black hover:bg-black cursor-pointer text-white rounded-xl">
              {singleJob?.position} positon
            </Badge>
            <Badge className="bg-black hover:bg-black cursor-pointer text-white rounded-xl">
              {singleJob?.jobType}
            </Badge>
            <Badge className="bg-black hover:bg-black cursor-pointer text-white rounded-xl">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          disabled={isApplied}
          onClick={handleJobApply}
          className={`   px-10 rounded-lg bg-orange-600 text-white hover:bg-orange-700 ${
            isApplied ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800">Job Details</h2>
        <hr className="w-full bg-gray-700" />
      </div>
      <div className="mt-6">
        <div className="flex gap-4 items-center">
          <h3 className="font-semibold text-lg">Role:</h3>
          <p>{singleJob?.title}</p>
        </div>
        <div className="flex gap-4 items-center">
          <h3 className="font-semibold text-lg">Location:</h3>
          <p>{singleJob?.location}</p>
        </div>
        <div className="flex gap-4 items-center">
          <h3 className="font-semibold text-lg">Description:</h3>
          <p>{singleJob?.description}</p>
        </div>
        <div className="flex gap-4 items-center">
          <h3 className="font-semibold text-lg">Experience:</h3>
          <p>{singleJob?.experienceLevel} years</p>
        </div>
        <div className="flex gap-4 items-center">
          <h3 className="font-semibold text-lg">Salary:</h3>
          <p>{singleJob?.salary} LPA</p>
        </div>
        <div className="flex gap-4 items-center">
          <h3 className="font-semibold text-lg">Total Applicants:</h3>
          <p>{singleJob?.application?.length}</p>
        </div>
        <div className="flex gap-4 items-center">
          <h3 className="font-semibold text-lg">Posted Date:</h3>
          <p>{singleJob?.createdAt.split("T")[0]}</p>
        </div>
      </div>
    </div>
  );
};
export default JobDecription;
