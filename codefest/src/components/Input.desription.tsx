import { FC } from "react";

type InputDescriptComponentType = {
  nombre: string;
};

const InputDescription: FC<InputDescriptComponentType> = ({ nombre }) => {
  return (
    <><textarea rows={3} id="form1Example13" className="form-control form-control-lg " /><label className="form-label">{nombre}</label></>
  );
};

export default InputDescription;