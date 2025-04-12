// components/PatientsTable.jsx
"use client"
import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

// Sample data with status field
const data = [
  {
    id: "1",
    name: "John Doe",
    age: 45,
    gender: "Male",
    condition: "Hypertension",
    lastVisit: "2025-04-01",
    doctor: "Dr. Smith",
    status: "approved"
  },
  {
    id: "2",
    name: "Jane Smith",
    age: 32,
    gender: "Female",
    condition: "Diabetes Type 2",
    lastVisit: "2025-03-28",
    doctor: "Dr. Johnson",
    status: "pending"
  },
  {
    id: "3",
    name: "Robert Brown",
    age: 58,
    gender: "Male",
    condition: "Arthritis",
    lastVisit: "2025-04-05",
    doctor: "Dr. Williams",
    status: "rejected"
  },
  {
    id: "4",
    name: "Emily Davis",
    age: 29,
    gender: "Female",
    condition: "Asthma",
    lastVisit: "2025-03-15",
    doctor: "Dr. Smith",
    status: "draft"
  },
  {
    id: "5",
    name: "Michael Wilson",
    age: 41,
    gender: "Male",
    condition: "Anxiety",
    lastVisit: "2025-04-07",
    doctor: "Dr. Johnson",
    status: "approved"
  },
]

export function PatientsTable() {
  const [sorting, setSorting] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [filteredData, setFilteredData] = useState(data)
  const [dateFilter, setDateFilter] = useState(null)

  // Define columns (unchanged except for adding status column)
  const columns = [
    {
      accessorKey: "id",
      header: "Patient ID",
      cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "age",
      header: "Age",
    },
    {
      accessorKey: "gender",
      header: "Gender",
    },
    {
      accessorKey: "condition",
      header: "Condition",
    },
    {
      accessorKey: "lastVisit",
      header: "Last Visit",
      cell: ({ row }) => {
        const date = new Date(row.getValue("lastVisit"))
        return <div>{date.toLocaleDateString()}</div>
      },
    },
    {
      accessorKey: "doctor",
      header: "Doctor",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2 text-white">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => alert(`View patient ${row.getValue("name")}`)}
          >
            View
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => alert(`Edit patient ${row.getValue("name")}`)}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ]

  // Handle filtering
  React.useEffect(() => {
    let filtered = [...data]

    // Apply status filter
    if (activeTab !== "all") {
      filtered = filtered.filter(patient => patient.status === activeTab)
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(patient => 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.doctor.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply date filter
    if (dateFilter) {
      filtered = filtered.filter(patient => {
        const visitDate = new Date(patient.lastVisit)
        return visitDate.toDateString() === dateFilter.toDateString()
      })
    }

    setFilteredData(filtered)
  }, [searchTerm, activeTab, dateFilter])

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4 gap-4">
        <div className="flex gap-4">
          <Input
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[280px] justify-start text-left font-normal text-white">
                {dateFilter ? format(dateFilter, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateFilter}
                onSelect={setDateFilter}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button>Add New Patient</Button>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab} className="mb-2 mt-4 cursor-pointer" >
        <TabsList>
          <TabsTrigger value="all" className="text-black">All</TabsTrigger>
          <TabsTrigger value="approved" className="text-black cursor-pointer">Approved</TabsTrigger>
          <TabsTrigger value="rejected" className="text-black cursor-pointer">Rejected</TabsTrigger>
          <TabsTrigger value="pending" className="text-black cursor-pointer">Pending</TabsTrigger>
          <TabsTrigger value="draft" className="text-black cursor-pointer">Draft</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-black">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 text-white">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}