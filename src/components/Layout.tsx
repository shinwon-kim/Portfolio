import { ReactNode } from "react";

interface LayoutProps {
  id: string;
  className?: string;
  children: ReactNode
}

const Layout = ({ id, className, children }: LayoutProps) => {
  return (
    <div id={id} className={`w-full max-w-[1200px] mx-auto px-4 py-18 md:px-8 min-h-screen flex flex-col justify-center items-center ${className}`}>
        {children}
    </div>

  );
};

export default Layout;
