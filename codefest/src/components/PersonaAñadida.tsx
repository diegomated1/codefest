import { FC } from "react";

type PersonaAñadida = {
  nombre: string;
};

const Input: FC<PersonaAñadida> = ({ nombre }) => {
  return (
    <><label className="form-label">{nombre}</label></>
  );
};

export default Input;