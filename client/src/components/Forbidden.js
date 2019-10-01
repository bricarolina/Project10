import React from 'react';
import {Link} from "react-router-dom";

export default () => {
  return (
      <div className="bounds">
        <div className="grid-100">
          <h1>Forbidden</h1>
          <h3>I'm sorry, you do not have authorization to view this page</h3>
        </div>
        <Link className="button" to="/courses">Return to List</Link>
      </div>
  );
}