import { PropsWithChildren } from "react";

export const TitleChart = ({ children }: PropsWithChildren) => {
  return <h3 className="text-xl font-mono mb-4 text-black">{children}</h3>;
};
