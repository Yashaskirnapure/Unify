import React from 'react';
import ImageRecord from './ImageRecord';

function Table({ images, handleView, handleDelete, handleTransform }) {
  return (
    <table className="CatalogTable">
        <thead>
        <tr>
            <th></th>
            <th>Name</th>
            <th></th>
            <th></th>
            <th></th>
        </tr>
        </thead>
        <tbody>
            {images.map((img) => (
              <ImageRecord key={img.id}
                  { ...img }
                  handleView={ handleView }
                  handleDelete={ handleDelete }
                  handleTransform={ handleTransform }
              />))}
        </tbody>
    </table>
  )
}

export default Table