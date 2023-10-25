import { FC } from "react";

type CheckboxComponentType = {
    nombre: string
}

const CheckboxComponent: FC<CheckboxComponentType> = ({
    nombre
}) => {
    return (
      <div className="form-check m-4">
              <input className="form-check-input" type="checkbox" value="" id="form1Example3" checked />
              <label className="form-check-label"> {nombre} </label>
            </div>
    );
  };

  export default CheckboxComponent;