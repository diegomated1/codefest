import { FC } from "react";

type AnclaNavbar = {
  nombre: string;
};

const AnclaNavbar: FC<AnclaNavbar> = ({ nombre }) => {
  return (
    <>
    <a className="nav-link text-primary" href="#">
     {nombre}<span className="sr-only"></span>
    </a>
    </>
  );
};

export default AnclaNavbar;