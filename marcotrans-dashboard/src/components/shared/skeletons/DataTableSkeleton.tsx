import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

interface DataTableSkeletonProps {
  columnCount: number;
  rowCount?: number;
}

export function DataTableSkeleton({
  columnCount,
  rowCount = 5,
}: DataTableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, i) => (
        <TableRow key={i} className="hover:bg-transparent border-none">
          {Array.from({ length: columnCount }).map((_, j) => (
            <TableCell key={j} className="px-4 py-3">
              {/* Variation de largeur pour faire plus réaliste */}
              <Skeleton
                className={`h-4 ${
                  j === 0 ? "w-8" : j === columnCount - 1 ? "w-16" : "w-[80%]"
                } rounded-md bg-slate-200/60`}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
