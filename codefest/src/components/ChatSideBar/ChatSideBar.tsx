import CircleAvatar from "./components/CircleAvatar";

const  ChatSideBar = () => {
    return (
        <div className="col-sm-4">
            <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                    <CircleAvatar></CircleAvatar>
                </li>
                <li className="nav-item">
                    <CircleAvatar></CircleAvatar>
                </li>
                <li className="nav-item">
                    <CircleAvatar></CircleAvatar>
                </li>
                <li className="nav-item">
                    <CircleAvatar></CircleAvatar> 
                </li>
            </ul>
        </div>
    );
};

export default ChatSideBar;