import CardFeed from "../../components/CardsFeed";
import SearchBar from "../../components/SearchBar";

export const Root = () => {
  return (
    <section className="vh-100">
      <div className="container h-100">
        <div className="h-100">
          <div>
            <h1 style={{ paddingBottom: "1%", paddingTop: "1%" }}>
              Proximos eventos en la UPB
            </h1>
            <div style={{padding: "5px", width:"50%"}}>
            <h4>Busca en los proximos eventos </h4>
            <SearchBar nombre={""} />
            </div>
          </div>

          <CardFeed nombre={""} />
          <CardFeed nombre={""} />
        </div>
      </div>
    </section>
  );
};
