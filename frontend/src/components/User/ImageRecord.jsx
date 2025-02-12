import React, { useState } from 'react';
import '../../styles/imageRecord.css';

function ImageRecord({ id, name, handleView, handleDelete, handleTransform }) {
  return (
    <tr className="ImageRecord">
      <td>{id}</td>
      <td>{name}</td>
      <td><button onClick={() => handleView(id)}>View</button></td>
      <td><button onClick={() => handleDelete(id)}>Delete</button></td>
      <td><button onClick={() => handleTransform(id)}>Transform</button></td>
    </tr>
  );
}

export default ImageRecord;