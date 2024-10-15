import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { convertToSlug } from "@/utils/text-utils";
import useAxiosQueryAuth from "@/hooks/useAuthAxiosQuery";
import { CourseEnrollInterface } from "./dashboard/interfaces/course-enroll.interface";
import { CourseCardPresentation } from "@/custom_components/cards/CourseCardPresentation";
import { LoadingWithLogo } from "@/custom_components/loading/LoadingWithLogo";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useCourseEnrollment } from "@/store/useCourseEnrollment";
import { Header } from "@/custom_components/layout/common-user/Header";
import { CommonUserTemplate } from "@/custom_components/layout/common-user/CommonUserTemplate";

export const CourseEnrollmentPage = () => {
  const params = useParams<{ idCourse: string; courseName?: string }>();
  const navigate = useNavigate();
  const { courseByUser, isLoading: isLoadingCourses } = useCourseEnrollment();
  const [isUserEnrolled, setIsUserEnrolled] = useState(false);

  const { data, isLoading } = useAxiosQueryAuth<CourseEnrollInterface>({
    url: `/course/course-detail/${params.idCourse}`,
    method: "GET",
  });

  // Usamos useEffect para redirigir una vez que obtengamos el nombre del curso
  useEffect(() => {
    if (!isLoading && courseByUser.length > 0) {
      setIsUserEnrolled(
        courseByUser.some((course) => course.id === Number(params.idCourse))
      );
    }
  }, [isLoading, courseByUser, params.idCourse]);

  useEffect(() => {
    if (data && data.courseName && !params.courseName) {
      // Redirige a la nueva URL que contiene el courseName y el idCourse
      const newUrl = `/inscripcion/${convertToSlug(data.courseName)}/${
        params.idCourse
      }`;
      navigate(newUrl, { replace: true }); // Reemplaza para no guardar la URL anterior en el historial
    }
  }, [data, params]);

  useDocumentTitle(data?.courseName || "");

  return (
    <div className='h-[100vh] overflow-y-auto'>
      {isLoading ? (
        <LoadingWithLogo />
      ) : (
        <CommonUserTemplate >
          <CourseCardPresentation
            courseInfo={data!}
            isUserEnrolled={isUserEnrolled}
            isLoading={isLoadingCourses}
          />
        </CommonUserTemplate>
      )}
    </div>
  );
};
