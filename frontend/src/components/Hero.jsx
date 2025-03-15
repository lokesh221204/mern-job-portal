import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="w-full mx-auto flex flex-col items-center">
      <h2 className="text-center mt-12 text-orange-500 max-[200px] mx-auto text-3xl font-bold ">
        Welcome to Jobify :)
      </h2>
      <h1 className="mt-12 text-4xl max-[200px] font-bold">
        Search , Apply & {""}
        <span className="text-yellow-600">Get the right job for yourself</span>
      </h1>
      <p className="mt-5">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis,
        accusamus?
      </p>
      <div className="w-[400px] flex mx-auto items-center mt-6">
        <input
          type="text"
          placeholder="Search your jobs"
          className="w-[70%] border-2 text-center outline-1 border-black rounded-l-full py-2"
        />
        <Button className="border-1  rounded-r-full py-[22px]  hover:bg-orange-800 bg-orange-600 text-white">
          Search
        </Button>
      </div>
    </div>
  );
};
export default Hero;
