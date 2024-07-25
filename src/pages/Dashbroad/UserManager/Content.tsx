import NavUser from "./NavUser";
import TableUserDetail from "./TableUserDetail";
import UserInfo from "./UserInfo";
import LayoutContent from "../LayoutContent/LayoutContent";

const Content = () => {
  return (
    <LayoutContent>
      <UserInfo />
      <NavUser />
      <TableUserDetail />
    </LayoutContent>
  );
};

export default Content;
