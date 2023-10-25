import CardFeed from "../../components/CardsFeed";
import FriendTile from "../../components/FriendTile";
import SearchBar from "../../components/SearchBar";

export const SearchFriends = () => {
  return (
    <section className="vh-100">
      <div className="container h-100">
        <div className="h-100">
          <div>
            <h1 style={{ paddingBottom: "1%", paddingTop: "1%" }}>
              Amigos y seguidores
            </h1>
            <div style={{padding: "5px", width:"50%"}}>
            <h4>Busca a tus amigos </h4>
            <SearchBar nombre={""} />
            </div>
          </div>

          <FriendTile nombre={""}/>
          <FriendTile nombre={""}/>
          <FriendTile nombre={""}/>
        </div>
      </div>
    </section>
  );
};