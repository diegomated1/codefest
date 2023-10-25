import Chat from "../../components/Chat";

export const ChatTeam = () => {
  return (
    <section className="vh-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-between h-100">
            <form style={{width: "100%"}}>
                <Chat nombre={"Grupo"}/>
            </form>
          </div>
        </div>
    </section>
  );
};
