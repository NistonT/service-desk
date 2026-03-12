import { LeftBar } from "@/widgets";
import { PropsWithChildren } from "react";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <LeftBar />

      <main className="ml-64">{children}</main>
    </div>
  );
};
