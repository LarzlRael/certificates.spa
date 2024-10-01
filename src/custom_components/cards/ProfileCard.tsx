import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  User,
  Mail,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  Clock,
  Target,
} from 'lucide-react'

interface CourseUser {
  id: number
  username: string | null
  firstName: string | null
  lastName: string | null
  profileImageUrl: string | null
  email: string | null
  address: string | null
  createdAt: string
}

interface Course {
  id: number
  title: string
  category: string
  completionDate: string | null
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string | null
}) {
  return value ? (
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-sm font-medium">{label}:</span>
      <span className="text-sm text-muted-foreground">{value}</span>
    </div>
  ) : null
}

function CourseItem({ course }: { course: Course }) {
  return (
    <div className="flex items-center justify-between p-2 border-b last:border-b-0">
      <div>
        <h4 className="font-medium">{course.title}</h4>
        <p className="text-sm text-muted-foreground">{course.category}</p>
      </div>
      {course.completionDate ? (
        <Badge variant="success">Completed</Badge>
      ) : (
        <Badge variant="secondary">In Progress</Badge>
      )}
    </div>
  )
}

export default function EnhancedCourseUserProfile() {
  const [activeTab, setActiveTab] = useState('overview')

  const user: CourseUser = {
    id: 1,
    username: 'learner123',
    firstName: 'Alex',
    lastName: 'Johnson',
    profileImageUrl: '/placeholder.svg?height=100&width=100',
    email: 'alex.johnson@example.com',
    address: '123 Learning St, Education City, 12345',
    createdAt: '2023-01-15T00:00:00Z',
  }

  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(' ') ||
    'Anonymous Learner'
  const initials =
    fullName !== 'Anonymous Learner'
      ? fullName
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
      : 'AL'

  const completedCourses = courses.filter((course) => course.completionDate)
    .length

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user.profileImageUrl || ''} alt={fullName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="text-center sm:text-left flex-grow">
          <CardTitle className="text-2xl">{fullName}</CardTitle>
          <p className="text-sm text-muted-foreground">
            @{user.username || 'anonymous'}
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
            <Badge variant="secondary">Enthusiastic Learner</Badge>
            <Badge variant="outline">Web Development</Badge>
            <Badge variant="outline">UX Design</Badge>
          </div>
        </div>
        <Button>Edit Profile</Button>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem
                icon={<Mail className="w-4 h-4" />}
                label="Email"
                value={user.email}
              />
              <InfoItem
                icon={<MapPin className="w-4 h-4" />}
                label="Location"
                value={user.address}
              />
              <InfoItem
                icon={<User className="w-4 h-4" />}
                label="Username"
                value={user.username}
              />
              <InfoItem
                icon={<Calendar className="w-4 h-4" />}
                label="Joined"
                value={new Date(user.createdAt).toLocaleDateString()}
              />
            </div>
          </TabsContent>
          <TabsContent value="courses" className="mt-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Enrolled Courses</h3>
              <div className="border rounded-md divide-y">
                {courses.map((course) => (
                  <CourseItem key={course.id} course={course} />
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="achievements" className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Award className="w-12 h-12 text-primary mb-2" />
                  <h3 className="font-semibold text-lg">Quick Learner</h3>
                  <p className="text-sm text-center text-muted-foreground">
                    Completed 3 courses in one month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Target className="w-12 h-12 text-primary mb-2" />
                  <h3 className="font-semibold text-lg">Goal Achiever</h3>
                  <p className="text-sm text-center text-muted-foreground">
                    Reached all set learning goals for 3 months
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Clock className="w-12 h-12 text-primary mb-2" />
                  <h3 className="font-semibold text-lg">Consistent Learner</h3>
                  <p className="text-sm text-center text-muted-foreground">
                    Logged in for 30 consecutive days
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="stats" className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <BookOpen className="w-12 h-12 text-primary mb-2" />
                  <h3 className="font-semibold text-lg">{courses.length}</h3>
                  <p className="text-sm text-center text-muted-foreground">
                    Total Courses
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Award className="w-12 h-12 text-primary mb-2" />
                  <h3 className="font-semibold text-lg">{completedCourses}</h3>
                  <p className="text-sm text-center text-muted-foreground">
                    Completed Courses
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Clock className="w-12 h-12 text-primary mb-2" />
                  <h3 className="font-semibold text-lg">120</h3>
                  <p className="text-sm text-center text-muted-foreground">
                    Hours Spent Learning
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
