import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const QuickActionSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className='w-15 h-5' />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <Skeleton className='w-20 h-5' />
          <Skeleton className='w-20 h-5' />
          <Skeleton className='w-20 h-5' />
        </div>

        <section>
          <CardHeader>
            <CardTitle>
              <Skeleton className='w-15 h-5' />
            </CardTitle>
          </CardHeader>

          <div className='flex space-x-4'>
            <Skeleton className='w-15 h-5' />
            <Skeleton className='w-15 h-5' />
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

interface SkeletonLoadingTableProps {
  rows: number; // Número de filas en la grid
  columns: number; // Número de columnas en la grid
}

export const SkeletonLoadingTable = ({
  rows,
  columns,
}: SkeletonLoadingTableProps) => {
  return (
    <Card>
      <CardContent>
        <div className="my-5"></div>
        <div
          className={`grid grid-cols-${columns} gap-1`} // La grid con margen entre columnas y filas
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }} // Define las columnas dinámicamente
        >
          {Array.from({ length: rows * columns }).map((_, index) => (
            <div key={index} className='p-1'>
              <div className='w-full h-6 bg-gray-300 rounded-sm' />{" "}
              {/* Cada skeleton rectangular */}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
