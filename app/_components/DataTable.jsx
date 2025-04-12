/*
Note: this component is not in use
*/ 
"use client"
import React, { useState } from "react";
import { MoreVertical, Plus, SlidersHorizontal, GripVertical, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

// For a component without having shadcn installed, we'll create simplified versions
// of the UI components needed for the table

const DataTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  
  const data = [
    { id: 1, name: "Header", type: "Section Type", limit: "", reviewer: "" },
    { id: 2, name: "Cover page", type: "Cover page", limit: 5, reviewer: "Eddie Lake" },
    { id: 3, name: "Table of contents", type: "Table of contents", limit: 24, reviewer: "Eddie Lake" },
    { id: 4, name: "Executive summary", type: "Narrative", limit: 13, reviewer: "Eddie Lake" },
    { id: 5, name: "Technical approach", type: "Narrative", limit: 23, reviewer: "Jamik Tashpulatov" },
    { id: 6, name: "Design", type: "Narrative", limit: 16, reviewer: "Jamik Tashpulatov" },
    { id: 7, name: "Capabilities", type: "Narrative", limit: 8, reviewer: "Jamik Tashpulatov" },
    { id: 8, name: "Integration with existing systems", type: "Narrative", limit: 21, reviewer: "Jamik Tashpulatov" },
    { id: 9, name: "Innovation and Advantages", type: "Narrative", limit: 26, reviewer: "Assign reviewer" },
    { id: 10, name: "Overview of EMR's Innovative Solutions", type: "Technical content", limit: 23, reviewer: "Assign reviewer" },
    { id: 11, name: "Advanced Algorithms and Machine Learning", type: "Narrative", limit: 28, reviewer: "Assign reviewer" },
  ];

  const toggleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Top navigation */}
      <div className="border-b border-gray-800 p-2">
        <div className="flex items-center justify-between">
          <div className="flex bg-gray-900 rounded-md">
            <button className="px-3 py-1 rounded-md bg-gray-800">Outline</button>
            <button className="px-3 py-1 rounded-md">
              Past Performance <span className="ml-1 rounded-full bg-gray-700 px-1.5 text-xs">3</span>
            </button>
            <button className="px-3 py-1 rounded-md">
              Key Personnel <span className="ml-1 rounded-full bg-gray-700 px-1.5 text-xs">2</span>
            </button>
            <button className="px-3 py-1 rounded-md">Focus Documents</button>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center px-3 py-1 text-sm rounded-md bg-gray-900 border border-gray-700 hover:bg-gray-800">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Customize Columns
            </button>
            <button className="flex items-center px-3 py-1 text-sm rounded-md bg-gray-800 hover:bg-gray-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Section
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-900">
            <tr className="border-b border-gray-800">
              <th className="w-10 p-2"></th>
              <th className="w-10 p-2">
                <div className="flex items-center justify-center h-4 w-4 rounded border border-gray-600"></div>
              </th>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Section Type</th>
              <th className="text-left p-2">Limit</th>
              <th className="text-left p-2">Reviewer</th>
              <th className="w-10 p-2"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr 
                key={row.id} 
                className={`border-b border-gray-800 hover:bg-gray-900 ${row.id === 1 ? 'bg-gray-900' : ''}`}
              >
                <td className="p-2">
                  <GripVertical className="h-4 w-4 text-gray-500" />
                </td>
                <td className="p-2">
                  <div 
                    className={`flex items-center justify-center h-4 w-4 rounded border border-gray-600 cursor-pointer ${
                      selectedRows.includes(row.id) ? 'bg-blue-600' : ''
                    }`}
                    onClick={() => toggleRowSelection(row.id)}
                  >
                    {selectedRows.includes(row.id) && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                </td>
                <td className="p-2 font-medium">{row.name}</td>
                <td className="p-2">
                  {row.id !== 1 && (
                    <span className={`px-2 py-1 rounded-md text-xs bg-gray-800`}>
                      {row.type}
                    </span>
                  )}
                  {row.id === 1 && "Section Type"}
                </td>
                <td className="p-2">{row.limit}</td>
                <td className="p-2">
                  {typeof row.reviewer === "string" && row.reviewer.includes("Assign") ? (
                    <button className="px-3 py-1 text-sm rounded-md bg-transparent border border-gray-600 text-gray-400 hover:bg-gray-800">
                      {row.reviewer}
                    </button>
                  ) : (
                    row.reviewer
                  )}
                </td>
                <td className="p-2">
                  <div className="relative">
                    <button className="p-1 rounded-md hover:bg-gray-800">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 p-2">
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-400">
            {selectedRows.length} of 68 row(s) selected.
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Rows per page</span>
              <select className="bg-gray-900 border border-gray-800 rounded p-1 text-sm">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span>Page 1 of 7</span>
              <div className="flex gap-1">
                <button className="p-1 rounded-md hover:bg-gray-800">
                  <ChevronsLeft className="h-4 w-4" />
                </button>
                <button className="p-1 rounded-md hover:bg-gray-800">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="p-1 rounded-md hover:bg-gray-800">
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button className="p-1 rounded-md hover:bg-gray-800">
                  <ChevronsRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;