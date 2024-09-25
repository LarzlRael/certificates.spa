import { Button } from '@/components/ui/button'
import { UserStudent } from '@/pages/dashboard/interfaces/students.interface'
import { ColumnDef, SortDirection } from '@tanstack/react-table'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'

const SortedIcon = ({ isSorted }: { isSorted: SortDirection | false }) => {
  if (isSorted === 'asc') {
    return <FaChevronDown className="ml-2 h-4 w-4" />
  }
  if (isSorted === 'desc') {
    return <FaChevronUp className="ml-2 h-4 w-4" />
  }
  return null
}

export const columns: ColumnDef<UserStudent>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      )
    },
  },
  {
    accessorKey: 'username',
    
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombre de usuario
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      )
    },
  },
  {
    accessorKey: 'firstName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombre
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      )
    },
  },
  {
    accessorKey: 'lastName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Apellido
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      )
    },
  },
  {
    accessorKey: 'phone',
    header: 'Teléfono',
  },
  {
    accessorKey: 'profileImageUrl',
    header: 'Imagen de perfil',
    cell: (row) => {
      const imageUrl = row.getValue('profileImageUrl')
      return (
        <img src={imageUrl} alt="profile" className="h-10 w-10 rounded-full" />
      )
    },
  },
]

/* id
username
firstName
lastName
phone
profileImageUrl */
