import notFoundImage from "@/assets/images/404-logo/Error-404.png";
const NotFound = () => {
  return (
    <img
      src={notFoundImage}
      alt="404 not found"
      className="flex items-center justify-center w-full h-full"
    />
  );
};

export default NotFound;
