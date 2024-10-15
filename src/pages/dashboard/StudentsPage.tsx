import { DataTable } from "@/custom_components/data-table/DataTable";
import { UserStudentDetail } from "./interfaces/students.interface";
import useAxiosQueryAuth from "@/hooks/useAuthAxiosQuery";
import { columns } from "@/custom_components/data-table/Columns";

import { useInformationStore } from "@/store/useInformationStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { UserDialogProfile } from "@/custom_components/cards/UserProfile";
import { SkeletonLoadingTable } from "@/custom_components/loading/QuickActionSkeleton";

export const StudentsPage = () => {
  const { data, isLoading, reload } = useAxiosQueryAuth<UserStudentDetail[]>({
    url: `/students/find-students`,
    method: "GET",
  });
  const { changeExtraInformation } = useInformationStore();

  return (
    <div>
      {isLoading ? (
        <SkeletonLoadingTable columns={9} rows={5} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Lista de estudiantes</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={data?.map((student) => student) || []}
              handleInfo={(rowData) => {
                console.log(rowData);

                changeExtraInformation({
                  isOpen: true,
                  content: (
                    <UserDialogProfile
                      studentDetail={rowData}
                      onReload={reload}
                    />
                  ),
                });
              }}
            />
          </CardContent>
        </Card>
      )}
      {/*       <UserDialogProfile userStudent={selectedStudent} /> */}
    </div>
  );
};

