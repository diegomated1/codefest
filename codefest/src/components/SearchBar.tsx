import { ChangeEventHandler, FC } from "react";
import Button from "./Button";

type SearchBarComponentType = {
  nombre: string;
};

const SearchBar: FC<SearchBarComponentType> = ({ nombre }) => {
  return (
    <div className="input-group rounded">
      <input
        type="search"
        className="form-control rounded"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="search-addon"
      />
    <Button nombre={"Buscar"}/>
    </div>
  );
};

export default SearchBar;