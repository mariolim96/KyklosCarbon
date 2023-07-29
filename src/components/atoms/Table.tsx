'use client'
import React from 'react'
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table'
interface Props {
  defaultData?: unknown[]
  columns?: Array<ColumnDef<unknown, unknown>>
  loading?: boolean
  title?: string
}
function Table({ columns = [], defaultData = [], loading }: Props) {
  const Headers = ['Name', 'Symbol', 'Balance', 'Price', 'Value']
  const Rows = [
    ['GSC', 'GSC', '10000', '0.1', '1000'],
    ['CRT', 'CRT', '10000', '0.1', '1000'],
    ['ETH', 'ETH', '10000', '0.1', '1000'],
    ['DAI', 'DAI', '10000', '0.1', '1000'],
  ]
  const [data] = React.useState<unknown[]>(() => [...defaultData])
  const rerender = React.useReducer(() => ({}), {})[1]
  const table = useReactTable({
    columns,
    data: data.length ? data : Rows,
    getCoreRowModel: getCoreRowModel<unknown>(),
  })
  return (
    <>
      {/* title  on the left */}
      <h1 className="text-2xl text-nf">My carbon asset</h1>

      {columns.length !== 0 ? (
        <div className="overflow-auto">
          <table className="table w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-pf h-12 ">
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan} className="px-4 py-2 text-left text-pc text-xl font-medium">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={Headers.length} className="px-4 py-2 text-center">
                    No Data
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row, rowIndex) => (
                  <tr key={row.id} className={rowIndex % 2 === 0 ? 'bg-base-1' : 'bg-base-2'}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-2 text-pc">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-auto shadow-xl rounded-lg">
          <table className="table w-full rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-nf h-12">
                {Headers.map((header, i) => (
                  <th key={i} className="px-4 py-2 text-left text-nc  text-lg font-medium">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Rows.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-base-1' : 'bg-base-2'}>
                  {row.map((cell, colIndex) => (
                    <td key={`${rowIndex}-${colIndex}`} className="px-4 py-2 text-pc">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default Table
