import { FC } from "react";

type CheckboxComponentType = {
    nombre: string
}

const CheckboxComponent: FC<CheckboxComponentType> = ({
    nombre
}) => {
    return (
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label" htmlFor="exampleCheck1">
          {nombre}
        </label>
      </div>
    );
  };

  export default CheckboxComponent;