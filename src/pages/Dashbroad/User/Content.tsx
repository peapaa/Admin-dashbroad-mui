import Footer from "../../../components/Footer";
import NavUser from "./NavUser";
import TableUserDetail from "./TableUserDetail";
import UserInfo from "./UserInfo";

const Content = () => {
  return (
    <div className="w-full xl:pl-8 xl:pr-8 my-6 lg:pl-0 lg:pr-2 ">
      <UserInfo />
      <NavUser />
      <TableUserDetail />
      <Footer />
    </div>
  );
};

export default Content;
