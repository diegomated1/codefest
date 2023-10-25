import Button from "../../components/Button";
import PrimaryButton from "../../components/Button";
import CheckboxComponent from "../../components/CheckBox";
import Input from "../../components/Input";
import ImageComponent from "../../components/LogoUPB";

export const Register = () => {
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://20fisi.bucaramanga.upb.edu.co/assets/landing/img/codefest.png"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <img
              src="https://20fisi.bucaramanga.upb.edu.co/assets/landing/img/logo_UPB_2022.png"
              className="img-fluid"
              alt="Phone image"
            />
            <form style={{ margin: "20px" }}>
              <div className="form-outline mb-4">
                <Input nombre={"Nombre"} />
              </div>

              <div className="form-outline mb-4">
                <Input nombre={"Correo Electronico"} />
              </div>

              <div className="form-outline mb-4">
                <Input nombre={"Celular"} />
              </div>

              <div className="form-outline mb-4">
                <Input nombre={"Contraseña"} />
              </div>

              <div className="form-outline mb-4">
                <Input nombre={"Confirmar Contraseña"} />
              </div>

              <CheckboxComponent nombre={"Aceptar terminos y condiciones"}/>

              <div className="d-flex justify-content-around align-items-center mb-4">
                <PrimaryButton nombre={"Registrarse"} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
