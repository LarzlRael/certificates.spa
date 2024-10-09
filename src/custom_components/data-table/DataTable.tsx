import { useState, useEffect } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  /* VisibilityState, */
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  handleInfo?: (rowData: TData) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  handleInfo,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [currentFilter, setCurrentFilter] = useState<string>('Todos')

  const [rowSelection, setRowSelection] = useState({})
  const isRowSelected = Object.keys(rowSelection).length > 0

  const [selectedRowData, setSelectedRowData] = useState<TData | null>(null)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })
  /* useEffect(() => {
    if (handleInfo) {
      handleInfo(selectedRowData) // Llamar a la función pasada como prop
    }
  }, [selectedRowData]) */
  const handleRowClick = (rowData: TData) => {
    setSelectedRowData(rowData)
  }

  return (
    <div className="bg-white rounded-lg">
      <div className="flex items-center py-4">
        <Input
          placeholder="Buscar por email"
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) => {
            table.getColumn('email')?.setFilterValue(event.target.value)
          }}
          className="max-w-sm"
        />
        {isRowSelected && (
          <Button
            className="ml-2"
            variant="outline"
            onClick={() => {
              const ids = table.getSelectedRowModel().rows.map((row) => {
                return row.original.username as string
              })
              console.log(ids)
            }}
          >
            Delete
          </Button>
        )}

        <Select
        value={currentFilter}
        onValueChange={(value)=>{
          console.log("tmre")
        }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue>{currentFilter}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Cambialo we</SelectLabel>
              <SelectItem value="Todos">todos</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => {
                    if (handleInfo) handleInfo(row.original)
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No se encontraron resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div>
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} de{' '}
            {table.getFilteredRowModel().rows.length} Fila(s) seleccionadas.
          </div>

          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Siguiente
            </Button>
          </div>
          <Select onValueChange={(value) => table.setPageSize(Number(value))}>
            <SelectTrigger className="w-[180x] m-2">
              <SelectValue placeholder="10 filas" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filas por página</SelectLabel>

                {[10, 20, 30, 50].map((value) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
