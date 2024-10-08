import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Tab {
  label: string;
  component: React.ReactNode;
}

interface CustomTabsProps {
  tabs: Tab[]; // Array de objetos con label y component
  defaultTab: string; // Valor por defecto para la pestaña activa
  width?: string; // Para permitir el ajuste de ancho, opcional
}

export const CustomTabs = ({
  tabs,
  defaultTab,
  width = "400px",
}: CustomTabsProps) => {
  // Validar que los arrays tengan la misma longitud
  if (tabs.length === 0) {
    throw new Error("Debe haber al menos un tab");
  }

  return (
    <Tabs defaultValue={defaultTab} className={`w-[${width}]`}>
      <TabsList className='grid w-full grid-cols-2'>
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
  );
};
