import { ReactNode } from "react";

interface LayoutProps {
  id: string;
  className?: string;
  children: ReactNode
}

const Layout = ({ id, className, children }: LayoutProps) => {
  return (
    <div id={id} className={`w-full max-w-[1200px] mx-auto py-20 px-4 md:px-8 min-h-screen ${className}`}>
        {children}
    </div>

  );
};

export default Layout;
