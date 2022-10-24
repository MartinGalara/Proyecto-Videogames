import React from "react";

export default function Paginado({ itemsPerPage, allVideogames, paginado }) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allVideogames / itemsPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <div>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <button key={number} onClick={() => paginado(number)}>{number}</button>
          ))}
    </div>
  );
}
