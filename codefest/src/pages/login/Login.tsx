import PrimaryButton from "../../components/Button";
import CheckboxComponent from "../../components/CheckBox";
import Input from "../../components/Input";

export const Login = () => {
  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <Input
          nombre="Email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <Input
          nombre="Contraseña"
          />
        </div>
        <div className="form-check">
        <CheckboxComponent
            nombre="hola"
        />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
{/*         <input type="checkbox" className="form-check-input" id="exampleCheck1" /> */}
        </div>
        <PrimaryButton/>
      </form>
    </div>
  );
};
