import logo from "../assets/logo.png";

const Nav = () => {
  return (
    <>
      <div className="flex align-center justify-between">
        <img src={logo} alt="logo" />
        <p>Welcome user ("name of user when he login")</p>
      </div>
    </>
  );
};
export default Nav;
