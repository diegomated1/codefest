import { FC } from "react";

type ChatComponentType = {
  nombre: string;
  mensage: string
};

const ChatComponent: FC<ChatComponentType> = ({
  nombre,
  mensage
}) => {
  return (
    <>
      <p className="small p-2 me-3 mb-1 text-black rounded-3 bg-white">
        {mensage}
      </p>
      <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
        {nombre}
      </p>
    </>
  );
};

export default ChatComponent;
