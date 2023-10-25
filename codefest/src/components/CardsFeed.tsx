import { FC } from "react";
import Button from "./Button";

type CardFeedComponentType = {
  nombre: string;
};

const CardFeed: FC<CardFeedComponentType> = ({ nombre }) => {
  return (
    <div className="row gx-5 p-1">
      <div className="col-md-6 mb-4">
        <div
          className="bg-image hover-overlay ripple shadow-2-strong rounded-5"
          data-mdb-ripple-color="light"
        >
          <img
            src="https://mdbcdn.b-cdn.net/img/new/slides/080.webp"
            className="img-fluid"
          />
          <a href="#!">
            <div className="mask"></div>
          </a>
        </div>
      </div>
      <div className="col-md-6 mb-4">
        
        <h4>
          <strong>Facilis consequatur eligendi</strong>
        </h4>
        <span className="badge bg-danger px-2 py-1 shadow-1-strong mb-3">
          12 de junio - 12pm - i202
        </span>
        <p className="text-muted">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
          consequatur eligendi quisquam doloremque vero ex debitis veritatis
          placeat unde animi laborum sapiente illo possimus, commodi dignissimos
          obcaecati illum maiores corporis.
        </p>
        <Button nombre={"Visualizar el evento"}/>
      </div>
    </div>
  );
};

export default CardFeed;
