import PrimaryButton from "../../components/Button";
import Input from "../../components/Input";
import InputDescription from "../../components/Input.desription";

export const TeamCreator = () => {
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <h1>CREACION DE EQUIPOS</h1>
            <form style={{ margin: "20px" }}>
              <div className="form-outline mb-4">
                <Input nombre={"Nombre"} />
              </div>

              <div className="form-outline mb-4">
                <InputDescription nombre={"Descripcion"} />
              </div>

              <div className="d-flex justify-content-around align-items-center mb-4">
                <PrimaryButton nombre={"Ingresar"} />
              </div>
            </form>
          </div>
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://20fisi.bucaramanga.upb.edu.co/assets/landing/img/codefest.png"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          
        </div>
      </div>
    </section>
  );
};