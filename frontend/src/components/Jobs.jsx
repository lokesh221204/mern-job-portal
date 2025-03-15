import { useSelector } from "react-redux";
import FilterJob from "./FilterJob";
import Job from "./Job";

const Jobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="w-full mx-auto">
      <div className="flex gap-4 mt-6">
        <div className="w-[15%]">
          <FilterJob />
        </div>
        <div className="flex-1 w-[88vh]   ">
          <div className="grid grid-cols-3 gap-4">
            {allJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Jobs;
