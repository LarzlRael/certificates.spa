import { Button } from '@/components/ui/button'
import {
  UserStudent,
  UserStudentDetail,
} from '@/pages/dashboard/interfaces/students.interface'
import { ColumnDef, FilterFn, Row, SortDirection } from '@tanstack/react-table'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'
import { Checkbox } from '@/components/ui/checkbox'
import { isValidString } from '@/utils/validation/validation'
import { formatDate } from '@/utils/dates'

const myCustomFilterFn: FilterFn<UserStudentDetail> = (
  row: Row<UserStudentDetail>,
  columnId: string,
  filterValue: any,
  addMeta: (meta: any) => void,
) => {
  filterValue = filterValue.toLowerCase()
  console.log(filterValue)
  const filterParts = filterValue.split(' ')
  const rowValues = `${row.original.email} ${row.original.dni} ${row.original.phone} ${row.original.firstName} ${row.original.lastName}`.toLowerCase()

  return filterParts.every((part: string) => rowValues.includes(part))
}

const SortedIcon = ({ isSorted }: { isSorted: SortDirection | false }) => {
  if (isSorted === 'asc') {
    return <FaChevronDown className="ml-2 h-4 w-4" />
  }
  if (isSorted === 'desc') {
    return <FaChevronUp className="ml-2 h-4 w-4" />
  }
  return null
}

export const columns: ColumnDef<UserStudentDetail>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'ID',
  },

  {
    accessorKey: 'profileImageUrl',
    header: 'Imagen',
    cell: (row) => {
      const imageUrl = row.getValue('profileImageUrl')

      return isValidString(imageUrl) ? (
        <img src={imageUrl} alt="profile" className="h-10 w-10 rounded-full" />
      ) : (
        <label>NN</label>
      )
    },
  },
  {
    accessorKey: 'phone',
    header: 'Teléfono',
    /* filterFn: myCustomFilterFn, */
  },
  {
    accessorKey: 'email',
    filterFn: myCustomFilterFn,
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
    /* filterFn: myCustomFilterFn, */
    accessorKey: 'dni',
    header: 'C.I.',
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
    accessorKey: 'createdAt',
    header: 'Fecha de registro',
    cell: (row) => {
      const getDate = row.getValue('createdAt')

      return isValidString(getDate) ? (
        <label>{formatDate(getDate)}</label>
      ) : (
        <label>NN</label>
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
