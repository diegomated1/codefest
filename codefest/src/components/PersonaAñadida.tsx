import { FC } from "react";

type PersonaAñadida = {
  nombre: string;
};

const PersonaAñadida: FC<PersonaAñadida> = ({ nombre }) => {
  return (
    <><h5 className="form-label text-primary" style={{color:'#'}}>{nombre}</h5></>
  );
};

export default PersonaAñadida;