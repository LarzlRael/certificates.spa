import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

interface Tab {
  label: string
  component: React.ReactNode
}

interface CustomTabsProps {
  tabs: Tab[] // Array de objetos con label y component
  defaultIndex: number // Índice por defecto para la pestaña activa
  width?: string // Para permitir el ajuste de ancho, opcional
  onTabChange?: (index: number) => void // Callback para cambios de pestaña
}

export const CustomTabs = ({
  tabs,
  defaultIndex = 0, // Por defecto, se selecciona el primer índice
  width = '400px',
  onTabChange, // Callback opcional para manejar cambios
}: CustomTabsProps) => {
  // Validar que los arrays tengan la misma longitud
  if (tabs.length === 0) {
    throw new Error('Debe haber al menos un tab')
  }

  // Asegurarse de que el índice esté dentro del rango
  const validIndex =
    defaultIndex >= 0 && defaultIndex < tabs.length ? defaultIndex : 0

  // Manejar el cambio de pestaña y obtener el índice
  const handleTabChange = (value: string) => {
    const index = tabs.findIndex((tab) => tab.label === value)
    if (onTabChange) {
      onTabChange(index)
    }
  }

  return (
    <Tabs
      defaultValue={tabs[validIndex].label}
      className={`w-[${width}]`}
      onValueChange={handleTabChange} // Manejador para el cambio de pestaña
    >
      <TabsList className="grid w-full grid-cols-2">
        {tabs.map((tab, index) => (
          <TabsTrigger key={index} value={tab.label}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab, index) => (
        <TabsContent key={index} value={tab.label}>
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  )
}
