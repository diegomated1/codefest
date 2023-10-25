
import PrimaryButton from "../../components/Button"


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
                        <div id="rating1" className="star-rating px-3 mb-3" role="rating" data-rating="3">
                            <span className="star" data-value="1">&#9733;<span className="star-notification"></span></span>
                            <span className="star" data-value="2">&#9733;<span className="star-notification"></span></span>
                            <span className="star" data-value="3">&#9733;<span className="star-notification"></span></span>
                            <span className="star" data-value="4">&#9733;<span className="star-notification"></span></span>
                            <span className="star" data-value="5">&#9733;<span className="star-notification"></span></span>
                        </div>
                    </div>
                </div>

                <div className="py-1">
                    <h3>Comentarios</h3>
                    <div className="d-flex flex-column container p-3 border border-black mb-4">
                        <h6>Diego</h6>
                        <p>kjbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb</p>
                    </div>
                </div>

                <div className="d-flex justify-content-start align-items-start mb-4">
                    <PrimaryButton nombre={"Comentar"} />
                </div>
            </div>
        </div>
    )
}
