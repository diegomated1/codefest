import { FC } from "react";
import ChatComponent from "./ChatComponent";
import Input from "./Input";
import Button from "./Button";

type ChatComponentType = {
  nombre: string;
};

const Chat: FC<ChatComponentType> = ({ nombre }) => {
  return (
    <section className="w-100 h-100">
      <div className=" py-3 w-100 h-100">
        <div className="w-100 h-100">
          <div className="w-100 h-100">
            <div className="card  w-100 h-100" id="chat2">
              <div className="card-header align-items-center p-3">
                <h5 className="mb-0">{nombre}</h5>
              </div>
              <div className="card-body bg-light" data-mdb-perfect-scrollbar="true">
                <div className="d-flex flex-row justify-content-end mb-4 pt-1 ">
                  <div>
                    <ChatComponent
                      nombre={"Kevinsito"}
                      mensage={"QUELAQUEHAY perros hptas"}
                    />
                    <ChatComponent
                      nombre={"Kevinsito"}
                      mensage={"QUELAQUEHAY perros hptas"}
                    />
                  </div>
                </div>
              </div>
              <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                <Input nombre={""}/>
                <div style={{padding:"5px"}} />
                <Button nombre={"Enviar"}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
