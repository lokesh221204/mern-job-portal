import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FilterJob = () => {
  const filterData = [
    {
      filterType: "Location",
      array: ["Mumbai", "Delhi", "USA", "UK", "Canada", "Australia"],
    },
    {
      filterType: "Indusrty",
      array: ["Web", "Flutter", "React", "Full Stack", "Laravel", "Nextjs"],
    },
    {
      filterType: "Salary",
      array: ["20-50k", "50-100k", "100-150k", "150-200k", "200-250k"],
    },
  ];
  return (
    <div>
      <h1>Filter Jobs</h1>
      <hr className=" mt-3" />
      <RadioGroup>
        {filterData.map((data, index) => (
          <div>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, index) => {
              return (
                <div className="flex gap-3 my-2 items-center">
                  <RadioGroupItem value={item} id={item} />
                  <Label htmlFor={item}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
export default FilterJob;
