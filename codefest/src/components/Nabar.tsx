import AnclaNavbar from "./AnclasNabvar";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{display:'flex' , justifyContent:'space-between'}}>
      <div className="col-md-8 col-lg-7 col-xl-6 ">
        <img
          src="https://20fisi.bucaramanga.upb.edu.co/assets/landing/img/logo_UPB_2022.png"
          className="img-fluid "
          alt="Phone image"
          style={{objectFit: 'cover', height:'50px', width:'150', paddingLeft:"2%"}}
        />
      </div>

      <div className=" " id="navbarSupportedContent">
        <ul
          className="navbar-nav mr-auto"
          style={{ display: "flex", justifyContent: "space-between" , marginRight:'30px'}}
        >
          <li className="nav-item active">
            <AnclaNavbar nombre={"Feed"}/>
          </li>
          <li className="nav-item active">
          <AnclaNavbar nombre={"Login"}/>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
