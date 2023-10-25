import CardFeed from "../../components/CardsFeed";

export const Root = () => {
  return (
    <section className="vh-100">
      <div className="container h-100">
        <div className="h-100">
          <h1 style={{padding:"2%"}}>Proximos eventos en la UPB</h1>
          <CardFeed nombre={""}/>
          <CardFeed nombre={""}/>
        </div>
      </div>
    </section>
  );
};
