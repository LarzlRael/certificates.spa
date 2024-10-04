import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FaWhatsapp } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Clock, Star, ChevronRight } from 'lucide-react'
import { CourseEnrollInterface } from '@/pages/dashboard/interfaces/course-enroll.interface'
import { isValidString } from '@/utils/validation/validation'
import { capitalizeString } from '@/utils/utils'

interface CourseCardPresentationProps {
  courseInfo: CourseEnrollInterface
  imageBlog?: string
}

export const PreviewCourseCardPresentation = ({
  courseInfo,
  imageBlog,
}: CourseCardPresentationProps) => {
  return (
    <Card
      className="
    w-full max-w-5xl mx-auto overflow-hidden"
    >
      {/* Contenedor flex para poner la imagen y contenido en formato horizontal */}
      <div className="sticky h-full flex flex-col lg:flex-row">
        {/* Imagen del curso */}
        <img
          src={
            isValidString(imageBlog)
              ? imageBlog
              : isValidString(courseInfo.imageCourseUrl)
              ? courseInfo.imageCourseUrl
              : 'https://res.cloudinary.com/heyset/image/upload/v1689582418/buukmenow-folder/no-image-icon-0.jpg'
          }
          alt="Imagen del curso"
          className="w-full lg:w-1/3 h-64 object-cover" // Ajustes de tamaño para pantallas grandes
        />

        {/* Contenido a la derecha de la imagen */}
        <div className="flex-1 p-4">
          {' '}
          {/* flex-1 para que ocupe el resto del espacio */}
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
            <div className="flex justify-between items-center mb-6">
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
                    <p className="text-sm text-muted-foreground">
                      Instructor Senior
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>
                    {courseInfo.duration} {courseInfo.durationUnit}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              {courseInfo.courseDescription}
            </p>

            {isValidString(courseInfo.notes) && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                {courseInfo.notes
                  .split('\n')
                  .filter((line) => line.length > 0)
                  .map((note, index) => (
                    <div className="flex items-center" key={index}>
                      <ChevronRight className="w-5 h-5 mr-2 text-green-500" />
                      <span>{capitalizeString(note.trim())}</span>
                    </div>
                  ))}
              </div>
            )}

            <InfoLabel
              title="Modilidad"
              value={courseInfo.modality}
              child={
                <div className="flex flex-row">
                  <span className="font-semibold">
                    {courseInfo.modality} Via
                  </span>
                  <img
                    src="/logos/zoom-logo.png"
                    alt="Modalidad"
                    className="w-20 h-12 ml-2"
                  />
                </div>
              }
            />
            <InfoLabel title="Material" value={courseInfo.material} />
            <InfoLabel
              title="Mas informacion"
              value={courseInfo.informationContact}
              child={
                <div
                  onClick={() =>
                    window.open(
                      `https://wa.me/${courseInfo.informationContact}`,
                    )
                  }
                  className="flex items-center cursor-pointer"
                >
                  <FaWhatsapp className="w-20 h-12" color="#25D366" />
                  <span>{courseInfo.informationContact}</span>
                </div>
              }
            />
          </CardContent>
          <CardFooter className="flex justify-between items-center bg-muted py-4">
            <div className="flex items-center">
              <span className="text-3xl font-bold">
                {courseInfo.coursePrice} Bs.
              </span>
              {/* Puedes descomentar esto si deseas mostrar el precio original
    <span className="text-muted-foreground ml-2 line-through">
      {courseInfo.coursePrice}
    </span> */}
            </div>
            <Button size="lg" className="font-semibold">
              Inscribirse
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  )
}

interface InfoLabelProps {
  title: string
  value?: string | undefined | null
  child?: React.ReactNode
}

const InfoLabel = ({ title, value, child }: InfoLabelProps) => {
  if (!isValidString(value)) {
    return <div></div>
  }

  return (
    <Card className="w-full mb-4 p-4">
      <div className="grid grid-cols-[150px_1fr_3fr] items-center gap-4">
        <h3 className="text-lg font-semibold truncate" title={title}>
          {title}
        </h3>
        <div className="min-w-0">
          {child ? child : <span className="font-normal">{value}</span>}
        </div>
      </div>
    </Card>
  )
}
