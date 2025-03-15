import { Badge } from "./ui/badge";
const JobCard = ({ job }) => {
  return (
    <div className="border-2 border-gray-100 rounded-lg shadow-lg p-5">
      <div>
        <h1 className="text-2xl font-semibold text-gray-700">
          {job?.company?.name}
        </h1>
        <Badge className="bg-blue-500  text-white rounded-xl cursor-pointer hover:bg-blue-600">
          {job?.location}
        </Badge>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <h1 className="text-2xl font-semibold text-gray-700 ">{job?.title}</h1>
        <p className="text-sm">{job?.description}</p>
      </div>
      <div className="flex gap-4 items-center justify-between mt-8">
        <Badge className="bg-orange-500 hover:bg-orange-700 cursor-pointer text-white rounded-xl">
          {job?.position} positon
        </Badge>
        <Badge className="bg-purple-500 hover:bg-purple-700 cursor-pointer text-white rounded-xl">
          {job?.jobType}
        </Badge>
        <Badge className="bg-pink-500 hover:bg-pink-700 cursor-pointer text-white rounded-xl">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};
export default JobCard;
