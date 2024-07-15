import NavUser from "./NavUser";
import TableUserDetail from "./TableUserDetail";
import UserInfo from "./UserInfo";

const Content = () => {
  return (
    <div className="w-full px-8 my-6">
      <UserInfo />
      <NavUser />
      <TableUserDetail />
    </div>
  );
};

export default Content;
