import { useSelector } from "react-redux";
import JobCard from "./JobCard";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="w-full mx-auto gap-5 flex items-center justify-center flex-col">
      <h1 className="ml-6 text-3xl font-bold">
        Latest jobs & <span className="text-blue-600">Openings</span>{" "}
      </h1>

      <div className="grid w-full items-center justify-center grid-cols-3 gap-5">
        {allJobs.slice(0, 6).map((job) => (
          <JobCard job={job} />
        ))}
      </div>
    </div>
  );
};
export default LatestJobs;
