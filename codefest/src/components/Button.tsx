import { FC } from "react";

type ButtonComponentType = {
    nombre: string
}

const PrimaryButton: FC<ButtonComponentType> = ({
nombre
}) => {
  return (
    <button type="submit" className="btn btn-primary btn-lg btn-block">{nombre}</button>
  );
};

export default PrimaryButton;