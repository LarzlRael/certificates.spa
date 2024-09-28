import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Clock, Users, Star, ChevronRight } from 'lucide-react'

export const CourseCardPresentation = () => {
  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden">
      <div className="relative">
        <img
          src="/placeholder.svg?height=400&width=800"
          alt="Imagen del curso"
          className="w-full h-64 object-cover"
        />
        <Badge className="absolute top-4 right-4 bg-yellow-400 text-yellow-900">
          Destacado
        </Badge>
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold">
              Desarrollo Web Fullstack
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Domina las tecnologías front-end y back-end más demandadas
            </CardDescription>
          </div>
          <div className="flex items-center">
            <Star className="text-yellow-400 w-5 h-5 mr-1" />
            <span className="font-bold">4.8</span>
            <span className="text-sm text-muted-foreground ml-1">
              (420 reseñas)
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Juan Desarrollador</p>
              <p className="text-sm text-muted-foreground">Instructor Senior</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
              <span>12 semanas</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-muted-foreground" />
              <span>500+ estudiantes</span>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground mb-6">
          Este curso completo te llevará desde los fundamentos del desarrollo
          web hasta la creación de aplicaciones full-stack robustas. Aprenderás
          HTML, CSS, JavaScript, React, Node.js, y mucho más a través de
          proyectos prácticos y desafiantes.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center">
            <ChevronRight className="w-5 h-5 mr-2 text-green-500" />
            <span>60+ horas de contenido</span>
          </div>
          <div className="flex items-center">
            <ChevronRight className="w-5 h-5 mr-2 text-green-500" />
            <span>Proyectos del mundo real</span>
          </div>
          <div className="flex items-center">
            <ChevronRight className="w-5 h-5 mr-2 text-green-500" />
            <span>Certificado al completar</span>
          </div>
          <div className="flex items-center">
            <ChevronRight className="w-5 h-5 mr-2 text-green-500" />
            <span>Acceso de por vida</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center bg-muted">
        <div>
          <span className="text-3xl font-bold">$199.99</span>
          <span className="text-muted-foreground ml-2 line-through">
            $499.99
          </span>
        </div>
        <Button size="lg" className="font-semibold">
          Inscríbete Ahora
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
