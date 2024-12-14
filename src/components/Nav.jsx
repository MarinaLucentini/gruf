import logo from "../assets/logo.png";

const Nav = () => {
  return (
    <>
      <div className="d-flex-nav ">
        <img src={logo} alt="logo" />
        <p>Welcome user ("name of user when he login")</p>
      </div>
    </>
  );
};
export default Nav;
