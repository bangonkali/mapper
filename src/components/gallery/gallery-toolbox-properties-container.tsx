import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FlattenedDictionary } from "../../utils/flatten";

export type GalleryToolboxPropertiesContainerProps = {
  width: number;
  height: number;
  data: FlattenedDictionary[];
  title: string;
};

export const GalleryToolboxPropertiesContainer: React.FC<
  GalleryToolboxPropertiesContainerProps
> = ({ width, data, title }) => {
  const columnHelper = createColumnHelper<FlattenedDictionary>();
  const columns = [
    columnHelper.accessor((row) => row.key, {
      id: "key",
      cell: (info) => <span className="ns">{info.getValue()?.toString()}</span>,
      header: () => <span className="ns">Key</span>,
    }),
    columnHelper.accessor((row) => row.value, {
      id: "value",
      cell: (info) => <span className="ns">{info.getValue()?.toString()}</span>,
      header: () => (
        <span
          className="ns"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Value
        </span>
      ),
    }),
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      style={{
        width: width,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: width,
          height: "20px",
          backgroundColor: "orange",
          display: "flex",
          alignItems: "center",
        }}
      >
        {title}
      </div>
      <div
        style={{
          width: width,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <table
          {...{
            style: {
              width: table.getCenterTotalSize(),
            },
          }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    {...{
                      colSpan: header.colSpan,
                      style: {
                        width: header.getSize(),
                      },
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    <div
                      {...{
                        onDoubleClick: () => header.column.resetSize(),
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `resizer ${
                          table.options.columnResizeDirection
                        } ${header.column.getIsResizing() ? "isResizing" : ""}`,
                        style: {
                          transform: `translateX(${
                            (table.options.columnResizeDirection === "rtl"
                              ? -1
                              : 1) *
                            (table.getState().columnSizingInfo.deltaOffset ?? 0)
                          }px)`,
                        },
                      }}
                    />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    {...{
                      style: {
                        width: cell.column.getSize(),
                      },
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
