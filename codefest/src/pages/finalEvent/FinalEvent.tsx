
import PrimaryButton from "../../components/Button"
import ChatComponent from "../../components/ChatComponent"
import Input from "../../components/Input"
import InputDescription from "../../components/Input.desription"
import PersonaAñadida from "../../components/PersonaAñadida"

export const FinalEvent = () => {
    return (
        <div className="container py-5 h-50">
            <h1>Proyectos Integradores</h1>
            <div className="d-flex flex-column justify-content-center">
                <div className="align-items-start mb-4">
                    <span className="badge bg-danger px-2 py-1 shadow-1-strong mb-3">
                        16/02/2023 - J201
                    </span>
                </div>

                <img src="https://20fisi.bucaramanga.upb.edu.co/assets/landing/img/logo_UPB_2022.png" className="mx-auto d-block img-fluid" />

                <div className="py-5">
                    <h3>Descripción</h3>
                    <p className="text-muted">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                        consequatur eligendi quisquam doloremque vero ex debitis veritatis
                        placeat unde animi laborum sapiente illo possimus, commodi dignissimos
                        obcaecati illum maiores corporis.
                    </p>
                </div>

                <div className="py-1">
                    <h3>Grupos</h3>
                        <div className="d-flex container p-3 border border-black align-items-center mb-4">
                            <p>Grupo de Proyecto 2</p>
                        </div>
                    </div>

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
                </div>
            </div>
    )
}
