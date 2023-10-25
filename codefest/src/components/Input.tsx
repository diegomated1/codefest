import { ChangeEventHandler, FC } from "react";

type InputComponentType = {
  nombre: string;
  onChange?: ChangeEventHandler<HTMLInputElement>
};

const Input: FC<InputComponentType> = ({
  nombre,
  onChange
}) => {
  return (
    <>
      <input
        type="email"
        id="form1Example13"
        className="form-control form-control-lg"
        onChange={onChange}
      />
      <label className="form-label">{nombre}</label>
    </>
  );
};

export default Input;
