import { FC } from "react";
import Button from "./Button";

type FriendTileComponentType = {
  nombre: string;
};

const FriendTile: FC<FriendTileComponentType> = ({ nombre }) => {
  return (
    <div className="card-body p-4">
      <div className="d-flex text-black">
        <div className="flex-shrink-0">
          <img
            src="https://cdn130.picsart.com/279571127023211.png"
            alt="Generic placeholder image"
            className="img-fluid"
            style={{ width: "100px", borderRadius: "10px" }}
          />
        </div>
        <div className="flex-grow-1 ms-3">
          <h5 className="mb-1">Danny McLoan</h5>
          <div className="d-flex justify-content-between rounded-3 p-2 mb-2">
            <div>
              <p className="small text-muted mb-1">Articles</p>
              <p className="mb-0">41</p>
            </div>
            <div className="px-3">
              <p className="small text-muted mb-1">Followers</p>
              <p className="mb-0">976</p>
            </div>
            
            <div style={{display:"flex", justifyContent:"space-between", width:"50%"}}>
            <Button nombre={"Hola"}/>
            <Button nombre={"Hola"}/>
            <Button nombre={"Hola"}/>

            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendTile;
