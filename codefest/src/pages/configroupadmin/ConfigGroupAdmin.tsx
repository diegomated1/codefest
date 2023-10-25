import PrimaryButton from "../../components/Button"
import Input from "../../components/Input"
import PersonaAñadida from "../../components/PersonaAñadida"

export const ConfigGroupAdmin = () => {
    return (
        <>
            <div className="p-3 text-white bg-dark text-center">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">EventsUPB</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Feed <span className="sr-only"></span></a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Login <span className="sr-only"></span></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div>
                <div className="container mt-4">
                    <div className="tab-pane fade active show" id="account-general">
                        <div className="card-body media d-flex align-items-center">
                            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="ui-w-80 rounded-circle" />
                            <div className="media-body ml-2 d-flex align-items-center p-4">
                                <h2>Grupo de Botargas</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-around align-items-center mb-4">
                    Configuración
                </div>
                <div className="d-flex flex-column p-5 mb-4 form-outline justify-content-around">
                    <Input nombre={"Añadir Integrante"}></Input>
                    <PersonaAñadida nombre={"Santiago Molano"}></PersonaAñadida>
                    <PrimaryButton nombre={"Ingresar usuario"} />
                </div>
            </div>
        </>
    )
}
