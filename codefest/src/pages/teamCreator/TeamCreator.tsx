import PrimaryButton from "../../components/Button";
import Input from "../../components/Input";
import InputDescription from "../../components/Input.desription";
import PersonaAñadida from "../../components/PersonaAñadida";
import AnclaNavbar from "../../components/AnclasNabvar";

export const TeamCreator = () => {
  return (
    <section className="vh-100">
      <div className="container py-5 h-50">
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

              <div
                className="form-outline mb-4"
                style={{ display: "flex", flexDirection: "column"}}
              >
                <Input nombre={"Ingrese los usuarios"} />
                <PersonaAñadida nombre={"Kevin David Quintana"}/>
                <PrimaryButton nombre={"Ingresar usuario"} />
                
              </div>

              <div className="d-flex justify-content-around align-items-center mb-4">
                <PrimaryButton nombre={"Crear equipo"} />
              </div>
            </form>
          </div>
          <div className="col-md-8 col-lg-7 col-xl-6" style={{display:'flex' , flexDirection:'column', alignItems:'center'}}>
            <img
              src="https://20fisi.bucaramanga.upb.edu.co/assets/landing/img/codefest.png"
              className="img-fluid"
              alt="Phone image"
            />
            <AnclaNavbar nombre={"Añadir imagen"} />
          </div>
        </div>
      </div>
    </section>
  );
};
