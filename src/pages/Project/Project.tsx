import React from 'react';
import './Project.css';

import { SequencesCollapse } from '../../components';

function Project() {
  return (
    <div className="main-container">
      <div className="header-page-project"></div>
      <div className="columns">
        <div className="pages"></div>
        <div className="text"></div>
        <div className="collapse">
          <SequencesCollapse />
        </div>
      </div>
    </div>
  );
}

export default Project;
