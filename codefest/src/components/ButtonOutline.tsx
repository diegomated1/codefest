

import { FC } from "react";

type ButtonComponentType = {
  nombre: string;
};

const OutlineButton: FC<ButtonComponentType> = ({ nombre }) => {
  return (
    <div>
      <button type="button" className="btn btn-outline-primary me-1 flex-grow-1">{nombre}</button>
    </div>
  );
};

export default OutlineButton;