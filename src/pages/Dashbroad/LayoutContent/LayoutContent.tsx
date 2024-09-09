import { ReactNode } from "react";
import Footer from "../../../components/Home/Footer";
interface LayoutContentProps {
  children: ReactNode;
}
const LayoutContent: React.FC<LayoutContentProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <div className="w-full xl:pl-8 xl:pr-8 my-6 lg:pl-0 lg:pr-2">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LayoutContent;
