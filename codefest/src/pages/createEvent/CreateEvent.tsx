
import PrimaryButton from "../../components/Button"
import Input from "../../components/Input"
import InputDescription from "../../components/Input.desription"
import PersonaAñadida from "../../components/PersonaAñadida"

export const EventCreate = () => {
    return (
        <section className="vh-100">
            <div className="container py-5 h-50">
            <h1>CREACION DE EVENTO</h1>
                <div className="row d-flex align-items-start justify-content-center h-100">
                    <div className="col-md-7 col-lg-5 col-xl-5">
                        <form>
                            <div className="form-outline mb-4">
                                <Input nombre={"Nombre"} />
                            </div>

                            <div className="form-outline mb-4">
                                <InputDescription nombre={"Descripcion"} />
                            </div>

                            <div className="form-outline mb-4">
                                <Input nombre={"Imágenes"} />
                            </div>

                            <div
                                className="form-outline mb-4 d-flex flex-column"
                            >
                                <Input nombre={"Grupos Participantes"} />
                                <PersonaAñadida nombre={"Pelea de botargas"} />
                            </div>
                            <div className="d-flex justify-content-around align-items-center mb-4">
                            <PrimaryButton nombre={"Ingresar grupo"} />
                            </div>

                            {/* <div className="d-flex justify-content-around align-items-center mb-4">
                                <PrimaryButton nombre={"Crear equipo"} />
                            </div> */}
                        </form>
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <form >
                            <div className="form-outline mb-4">
                                <Input nombre={"Fecha Inicio"} />
                            </div>

                            <div className="form-outline mb-4">
                                <Input nombre={"Fecha Final"} />
                            </div>

                            <div className="form-outline mb-4">
                                <Input nombre={"Ubicación"} />
                            </div>

                            {/* <div
                                className="form-outline mb-4 d-flex flex-column"
                            >
                                <Input nombre={"Ingrese los usuarios"} />
                                <PersonaAñadida nombre={"Kevin David Quintana"} />
                                <PrimaryButton nombre={"Ingresar usuario"} />

                            </div> */}
                        </form>
                    </div>
                    <div className="d-flex justify-content-around align-items-center mb-4">
                        <PrimaryButton nombre={"Crear equipo"} />
                    </div>
                </div>
            </div>
        </section>
    )
}
