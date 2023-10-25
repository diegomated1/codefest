import { FC } from "react";

type ButtonComponentType = {
  nombre: string;
};

const PrimaryButton: FC<ButtonComponentType> = ({ nombre }) => {
  return (
    <div>
      <button type="submit" className="btn btn-primary btn-md btn-block">
        {nombre}
      </button>
    </div>
  );
};

export default PrimaryButton;
