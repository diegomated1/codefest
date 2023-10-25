import ChatSideBar from "../../components/ChatSideBar/ChatSideBar"


export const Register = () => (
    <div>
        <div className="p-5 bg-primary text-white text-center">
            <h1>My First Bootstrap 5 Page</h1>
            <p>Resize this responsive page to see the effect!</p>
        </div>

        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Active</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Disabled</a>
                    </li>
                </ul>
            </div>
        </nav>

        <div className="container mt-5">
            <div className="row">
                <ChatSideBar></ChatSideBar>
                <div className="col-sm-8">
                    <h2>TITLE HEADING</h2>
                    <h5>Title description, Dec 7, 2020</h5>
                    <div className="fakeimg">Fake Image</div>
                    <p>Some text..</p>
                    <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>

                    <h2 className="mt-5">TITLE HEADING</h2>
                    <h5>Title description, Sep 2, 2020</h5>
                    <div className="fakeimg">Fake Image</div>
                    <p>Some text..</p>
                    <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                </div>
            </div>
        </div>

        <div className="mt-5 p-4 bg-dark text-white text-center">
            <p>Footer</p>
        </div>
    </div>
)
