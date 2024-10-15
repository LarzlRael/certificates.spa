/* import React from "react"; */
import { Header } from "./Header";
interface CommonUserTemplateProps {
  children: React.ReactNode;
}
export const CommonUserTemplate = ({ children }: CommonUserTemplateProps) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
