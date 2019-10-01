import React from 'react';
import {Link} from "react-router-dom";

export default () => (
    <div className="bounds">
      <h1>Unhandled Error</h1>
      <p>Oh my! We didn't plan for this! Sorry, you've found an unexpected problem!</p>
      <Link className="button" to="/courses">Return to List</Link>
    </div>

);