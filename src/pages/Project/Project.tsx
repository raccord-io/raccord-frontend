import React from 'react';
import './Project.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjectQuery } from '../../services/projectApi';

import { SequencesCollapse } from '../../components';

function Project() {
  const { projectId } = useParams();
  const { data, isLoading, isError } = useProjectQuery(projectId!);

  console.log(data);

  console.log(projectId);

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
