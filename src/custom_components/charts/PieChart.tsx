import React from 'react'

// Definimos la interfaz para los datos del gráfico
interface PieSlice {
  value: number
  color: string
}

// Propiedades del componente
interface PieChartProps {
  data: PieSlice[]
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const total = data.reduce((acc, slice) => acc + slice.value, 0)

  // Cálculo de las posiciones de cada sector
  const calculateCoordinates = () => {
    let cumulativePercentage = 0
    return data.map((slice) => {
      const percentage = slice.value / total
      const startAngle = cumulativePercentage * 2 * Math.PI
      const endAngle = (cumulativePercentage + percentage) * 2 * Math.PI

      // Coordenadas de los puntos para el SVG
      const x1 = 100 + 100 * Math.cos(startAngle)
      const y1 = 100 + 100 * Math.sin(startAngle)
      const x2 = 100 + 100 * Math.cos(endAngle)
      const y2 = 100 + 100 * Math.sin(endAngle)

      // Crear el path para el sector
      const largeArcFlag = percentage > 0.5 ? 1 : 0
      const pathData = `M 100 100 L ${x1} ${y1} A 100 100 0 ${largeArcFlag} 1 ${x2} ${y2} Z`

      cumulativePercentage += percentage
      return { pathData, color: slice.color }
    })
  }

  const slices = calculateCoordinates()

  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {slices.map((slice, index) => (
        <path key={index} d={slice.pathData} fill={slice.color} />
      ))}
      <circle cx="100" cy="100" r="50" fill="white" /> {/* Círculo interno */}
    </svg>
  )
}

export default PieChart
