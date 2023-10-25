import { FC } from "react";

type InputComponentType = {
  nombre: string;
};

const Input: FC<InputComponentType> = ({ nombre }) => {
  return (
    <div>
      <label className="form-check-label" htmlFor="exampleCheck1">
        {nombre}
      </label>
      <input name="myInput" className=""></input>
    </div>
  );
};

export default Input;
