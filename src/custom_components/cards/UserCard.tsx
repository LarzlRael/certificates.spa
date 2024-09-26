import { Student } from '@/pages/dashboard/interfaces/students.interface'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'

export default function UserCardMini({
  user: { username, firstName, lastName, profileImageUrl: avatarUrl },
}: Student) {
  return (
    <div className="flex items-center space-x-4 my-3 p-3 bg-white shadow rounded-lg hover:bg-gray-50 transition-colors mb-03 cursor-pointer">
      <Avatar className="w-12 h-12 rounded-full">
        <AvatarImage src={avatarUrl} alt={username} className="rounded-full" />
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
