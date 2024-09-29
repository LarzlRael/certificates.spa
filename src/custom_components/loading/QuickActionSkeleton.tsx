import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const QuickActionSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-15 h-5" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="w-20 h-5" />
          <Skeleton className="w-20 h-5" />
          <Skeleton className="w-20 h-5" />
        </div>

        <section>
          <CardHeader>
            <CardTitle>
              <Skeleton className="w-15 h-5" />
            </CardTitle>
          </CardHeader>
          {/* <h2 className="text-2xl font-semibold mb-4">
            Búsqueda Rápida de Estudiantes
          </h2> */}
          <div className="flex space-x-4">
          <Skeleton className="w-15 h-5" />
          <Skeleton className="w-15 h-5" />
          </div>
        </section>
      </CardContent>
    </Card>
  )
}
