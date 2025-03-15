import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
const Job = ({ job }) => {
  const navigate = useNavigate();
  const dayAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };
  return (
    <div>
      <div className="p-5 shadow-md rounded-xl border-2 border-gray-300">
        <p>
          {dayAgo(job?.createdAt) === 0
            ? "Today"
            : dayAgo(job?.createdAt) + " days ago"}
        </p>
        <div className="flex gap-3 mt-2 justify-between ">
          <img src={job?.company?.logo} className="w-12 h-6 rounded-full" />
          <div>
            <h1 className="font-bold text-xl text-gray-700">
              {job?.company?.name}
            </h1>

            <p className="text-gray-700 text-sm ml-3"> {job?.location}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <h1 className="text-2xl font-bold">{job?.title}</h1>
          <p className="text-base">{job?.description}</p>
          <div className="flex gap-4 items-center  mt-8">
            <Badge className="bg-black hover:bg-black cursor-pointer text-white rounded-xl">
              {job?.position} positon
            </Badge>
            <Badge className="bg-black hover:bg-black cursor-pointer text-white rounded-xl">
              {job?.jobType}
            </Badge>
            <Badge className="bg-black hover:bg-black cursor-pointer text-white rounded-xl">
              {job?.salary} LPA
            </Badge>
          </div>
          <div className="flex justify-between mt-3">
            <Button
              onClick={() => navigate(`/job/description/${job._id}`)}
              className="bg-blue-600 hover:bg-blue-700 rounded-full text-white"
            >
              Details
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700 rounded-full text-white">
              Save for Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Job;
