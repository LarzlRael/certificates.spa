import { UserStudentDetail } from '@/pages/dashboard/interfaces/students.interface'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'

interface UserCardMiniProps {
  student: UserStudentDetail
  onClick?: () => void
}

export default function UserCardMini({ onClick, student }: UserCardMiniProps) {
  const { username, firstName, lastName, profileImageUrl } = student
  return (
    <div
      onClick={onClick}
      className="flex items-center space-x-4 my-3 p-3 bg-white shadow rounded-lg hover:bg-gray-50 transition-colors mb-03 cursor-pointer"
    >
      <Avatar className="w-12 h-12 rounded-full">
        <AvatarImage
          src={profileImageUrl}
          alt={username}
          className="rounded-full"
        />
        <AvatarFallback className="rounded-full">
          {username?.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-900">{username}</h3>
        <p className="text-sm text-gray-500">
          {firstName} {lastName}
        </p>
      </div>
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Phone, Mail, Calendar, MapIcon } from 'lucide-react'

interface UserAuth {
  id: number
  username: string
  email: string
  firstName: string | null
  lastName: string | null
  location: string | null
  createdAt: string
  phone: string | null
  profileImageUrl: string | null
  profileImageId: string | null
  shippingAddress: string | null
  address: string | null
  addressCoordinates: { latitude: number; longitude: number } | null
  roles: string[]
  accessToken: string
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

/* export const UserProfile = () => {
  const user: UserAuth = {
    id: 1,
    username: 'johndoe',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    location: 'New York, USA',
    createdAt: '2023-01-01T00:00:00Z',
    phone: '+1234567890',
    profileImageUrl: '/placeholder.svg?height=100&width=100',
    profileImageId: 'profile123',
    shippingAddress: '123 Main St, New York, NY 10001',
    address: '456 Elm St, New York, NY 10002',
    addressCoordinates: { latitude: 40.7128, longitude: -74.006 },
    roles: ['User', 'Admin'],
    accessToken: 'your-access-token',
  }

  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(' ') || 'N/A'
  const initials =
    fullName !== 'N/A'
      ? fullName
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
      : 'U'

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-20 h-20">
          <AvatarImage src={user.profileImageUrl || ''} alt={fullName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-2xl">{fullName}</CardTitle>
          <p className="text-sm text-muted-foreground">@{user.username}</p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem
            icon={<Mail className="w-4 h-4" />}
            label="Email"
            value={user.email}
          />
          <InfoItem
            icon={<Phone className="w-4 h-4" />}
            label="Phone"
            value={user.phone}
          />
          <InfoItem
            icon={<MapPin className="w-4 h-4" />}
            label="Location"
            value={user.location}
          />
          <InfoItem
            icon={<Calendar className="w-4 h-4" />}
            label="Joined"
            value={new Date(user.createdAt).toLocaleDateString()}
          />
        </div>
        <InfoItem
          icon={<MapIcon className="w-4 h-4" />}
          label="Address"
          value={user.address || user.shippingAddress}
        />
        <div>
          <h3 className="font-semibold mb-2">Roles</h3>
          <div className="flex flex-wrap gap-2">
            {user.roles.map((role, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary text-primary-foreground rounded-full text-xs"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
 */