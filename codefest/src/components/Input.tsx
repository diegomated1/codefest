import { FC } from "react";

type InputComponentType = {
  nombre: string;
};

const Input: FC<InputComponentType> = ({ nombre }) => {
  return (
    <><input type="email" id="form1Example13" className="form-control form-control-lg" /><label className="form-label">{nombre}</label></>
  );
};

export default Input;
