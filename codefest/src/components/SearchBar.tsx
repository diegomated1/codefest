import { ChangeEventHandler, FC } from "react";

type SearchBarComponentType = {
  nombre: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const SearchBar: FC<SearchBarComponentType> = ({ nombre, onChange }) => {
  return (
    <div className="input-group rounded">
      <input
        type="search"
        className="form-control rounded"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="search-addon"
      />
      <span className="input-group-text border-0" id="search-addon">
        <i className="fas fa-search"></i>
      </span>
    </div>
  );
};
