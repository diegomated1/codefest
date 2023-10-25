import { ChangeEventHandler, FC } from "react";

type CheckboxComponentType = {
    nombre: string,
    value: boolean,
    onChange?: ChangeEventHandler<HTMLInputElement>
}

const CheckboxComponent: FC<CheckboxComponentType> = ({
    nombre, onChange, value
}) => {
    return (
      <div className="form-check m-4">
              <input className="form-check-input" type="checkbox" value="" id="form1Example3" onChange={onChange}  checked={value}/>
              <label className="form-check-label"> {nombre} </label>
            </div>
    );
  };

  export default CheckboxComponent;