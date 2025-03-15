import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
const AdminJobsTable = () => {
  const { adminJobs } = useSelector((store) => store.job);

  const jobsArray = Array.isArray(adminJobs) ? adminJobs : [adminJobs];

  const navigate = useNavigate();
  return (
    <div className="w-full mx-auto mt-5">
      <div className="w-[80%] mx-auto rounded-md border-2 border-gray-200 p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-base font-semibold">Title</TableHead>
              <TableHead className="text-base font-semibold">
                Description
              </TableHead>
              <TableHead className="text-base font-semibold">Salary</TableHead>
              <TableHead className="text-base font-semibold">
                Requirements
              </TableHead>
              <TableHead className="text-base font-semibold">
                Loaction
              </TableHead>
              <TableHead className="text-base font-semibold">
                Experience
              </TableHead>
              <TableHead className="text-base font-semibold">jobType</TableHead>
              <TableHead className="text-base font-semibold">
                Position
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobsArray?.map((job) => (
              <TableRow>
                <TableCell className="text-base font-medium">
                  {job?.title}
                </TableCell>
                <TableCell className="text-base font-medium">
                  {job?.description}
                </TableCell>
                <TableCell className="text-base font-medium">
                  {job?.salary}
                </TableCell>
                <TableCell className="text-base font-medium">
                  {job?.requirements}
                </TableCell>
                <TableCell className="text-base font-medium">
                  {job?.location}
                </TableCell>
                <TableCell className="text-base font-medium">
                  {job?.experienceLevel}
                </TableCell>
                <TableCell className="text-base font-medium">
                  {job?.jobType}
                </TableCell>
                <TableCell className="text-base font-medium">
                  {job?.position}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default AdminJobsTable;
