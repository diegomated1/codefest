import { useState } from "react";
import PrimaryButton from "../../components/Button";
import Input from "../../components/Input";
import { IUserLoggin } from "../../interfaces/user/IUserPos";
import Chat from "../../components/Chat";

export const ChatTeam = () => {
  return (
    <section className="vh-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-between h-100">
            <form style={{ display: "flex" }}>
                <Chat nombre={"Grupo"}/>
            </form>
          </div>
        </div>
    </section>
  );
};
