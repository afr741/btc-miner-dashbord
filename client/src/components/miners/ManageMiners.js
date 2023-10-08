import React, { Fragment } from 'react';
//components

import ListWorkers from './ListWorkers';

function ManageMiners() {
  return (
    <Fragment>
      <div className="container">
        <ListWorkers />
      </div>
    </Fragment>
  );
}

export default ManageMiners;
