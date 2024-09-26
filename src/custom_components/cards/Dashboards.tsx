import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const InfoCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="flex items-center p-6">
        {/* Skeleton para el icono */}
        <Skeleton className="h-8 w-8 rounded-full mr-4" />

        <div className="flex-1">
          {/* Skeleton para el título */}
          <Skeleton className="h-4 mb-2 w-1/2" />
          {/* Skeleton para el valor */}
          <Skeleton className="h-6 w-1/3" />
        </div>
      </CardContent>
    </Card>
  )
}

export const InfoCardsSkeleton = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {'1234'.split('').map((_, index) => (
        <InfoCardSkeleton key={index} />
      ))}
    </section>
  )
}
