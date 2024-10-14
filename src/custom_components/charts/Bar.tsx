

// Definimos la interfaz para los datos del gráfico
interface BarData {
  label: string
  value: number
  color: string
}

// Propiedades del componente
interface BarChartProps {
  data: BarData[]
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map((bar) => bar.value)) // Valor máximo para escalar las barras
  const barWidth = 200 / data.length // Ancho de cada barra

  return (
    <svg width="200" height="200">
      {data.map((bar, index) => {
        const height = (bar.value / maxValue) * 100 // Altura de la barra
        const x = index * barWidth // Posición en el eje X
        const y = 100 - height // Posición en el eje Y para que crezca hacia arriba

        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={barWidth - 5} // Espaciado entre barras
            height={height}
            fill={bar.color}
          />
        )
      })}
      <line x1="0" y1="100" x2="200" y2="100" stroke="#000" /> {/* Eje X */}
      <line x1="0" y1="0" x2="0" y2="100" stroke="#000" /> {/* Eje Y */}
    </svg>
  )
}

export default BarChart
