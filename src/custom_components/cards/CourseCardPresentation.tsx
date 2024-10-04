import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FaWhatsapp } from 'react-icons/fa6'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Clock, Users, Star, ChevronRight } from 'lucide-react'
import { CourseEnrollInterface } from '@/pages/dashboard/interfaces/course-enroll.interface'
import { isValidString } from '@/utils/validation/validation'
import { capitalizeString } from '../../utils/utils'
import { InfoLabelPresentationCard } from './RawInfomation'
import { convertDate, getDifferenceBetweenDates } from '@/utils/dates'

interface CourseCardPresentationProps {
  courseInfo: CourseEnrollInterface
}

export const CourseCardPresentation = ({
  courseInfo,
}: CourseCardPresentationProps) => {
  console.log(courseInfo)
  return (
    <Card className="w-full max-w-5xl mx-auto overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Imagen del curso */}
        <div className="lg:w-3/5 w-full relative">
          <img
            src={
              isValidString(courseInfo.imageUrl)
                ? courseInfo.imageUrl
                : 'https://res.cloudinary.com/heyset/image/upload/v1689582418/buukmenow-folder/no-image-icon-0.jpg'
            }
            alt="Imagen del curso"
            className="w-full h-full object-contain" // Aseguramos que no se recorte
          />
          {/*    <Badge className="absolute top-4 right-4 bg-yellow-400 text-yellow-900">
            Destacado
          </Badge> */}
        </div>

        {/* Contenido del curso */}
        <div className="lg:w-2/5 w-full flex flex-col p-4">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold">
                  {courseInfo.courseName}
                </CardTitle>
              </div>
              {/* <div className="flex items-center">
                <Star className="text-yellow-400 w-5 h-5 mr-1" />
                <span className="font-bold">4.8</span>
                <span className="text-sm text-muted-foreground ml-1">
                  (420 reseñas)
                </span>
              </div> */}
            </div>
          </CardHeader>

          <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-2">

              {courseInfo.professors.map(({ user, ...rest }) => (
                <div className="flex items-center space-x-4" key={rest.id}>
                  <Avatar>
                    <AvatarImage src={user.profileImageUrl} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">
                      {rest.professionalTitle} {user.firstName} {user.lastName}
                    </p>
                    {/* <p className="text-sm text-muted-foreground">
                      Instructor Senior
                    </p> */}
                  </div>
                </div>
              ))}
            </div>

            {courseInfo.startDate && courseInfo.endDate && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>
                    Del {convertDate(courseInfo.startDate, 'dddd D')}
                    {' al '}
                    {convertDate(courseInfo.endDate, 'dddd D [de] MMMM')}
                    {' los '}{' '}
                    {getDifferenceBetweenDates(
                      courseInfo.startDate,
                      courseInfo.endDate,
                    ).days + 1}{' '}
                    días
                  </span>
                </div>
              </div>
            )}
            <p className="text-muted-foreground mb-6">
              {courseInfo.courseDescription}
            </p>

            {isValidString(courseInfo.notes) && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                {courseInfo.notes.split('\n').map((note, index) => (
                  <div className="flex items-center" key={index}>
                    <ChevronRight className="w-5 h-5 mr-2 text-green-500" />
                    <span>{capitalizeString(note.trim())}</span>
                  </div>
                ))}
              </div>
            )}

            <InfoLabelPresentationCard
              title="Modilidad"
              value={courseInfo.modality}
              child={
                <div className="flex flex-row align-middle items-center">
                  {courseInfo.modality === 'VIRTUAL' ? (
                    <>
                      <span>Via</span>
                      <img
                        src="/logos/zoom-logo.png"
                        alt="Modalidad"
                        className="w-20 h-12 ml-2"
                      />
                    </>
                  ) : (
                    <span>{translate[courseInfo.modality]}</span>
                  )}
                </div>
              }
            />
            <InfoLabelPresentationCard
              title="Material"
              value={courseInfo.material}
            />
            <InfoLabelPresentationCard
              title="Mas informacion"
              value={courseInfo.informationContact}
              child={
                <div
                  onClick={() =>
                    window.open(
                      `https://wa.me/${courseInfo.informationContact}`,
                    )
                  }
                  className=""
                >
                  <FaWhatsapp size={30} color="#25D366" />

                  <span className="mx-2 text-blue-600  underline cursor-pointer">
                    {courseInfo.informationContact}
                  </span>
                </div>
              }
            />
          </CardContent>
          <CardFooter className="flex justify-between items-center bg-muted mt-auto">
            <div>
              <span className="text-3xl font-bold">
                {courseInfo.coursePrice} Bs.
              </span>
              {/* <span className="text-muted-foreground ml-2 line-through">
                {courseInfo.coursePrice}
              </span> */}
            </div>
            <Button size="lg" className="font-semibold">
              <span>Inscribirse</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  )
}
