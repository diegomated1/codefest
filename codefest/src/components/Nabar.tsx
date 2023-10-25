
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">EventsUPB</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto" style={{display: "flex", justifyContent: "space-between"}}>
          <li className="nav-item active">
            <a className="nav-link" href="#">Feed <span className="sr-only"></span></a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#">Login <span className="sr-only"></span></a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;





