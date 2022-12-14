import React, { useState } from 'react';
import './SequencesCollapse.css';

import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useGetSequencesQuery } from '../../services/projectApi';

import { SequenceCollapse } from '../index';
import { Id } from '@reduxjs/toolkit/dist/query/tsHelpers';

interface Props {
  currentSequenceSelected: string;
  setCurrentSequenceSelected: (value: string) => void;
}

export function SequencesCollapse({ currentSequenceSelected, setCurrentSequenceSelected }: Props) {
  const { Panel } = Collapse;
  const { projectId } = useParams();
  const { data, isLoading, isError } = useGetSequencesQuery(projectId!);

  const setSequence = (key: any) => {
    setCurrentSequenceSelected(key);
    console.log(key);
  };

  const sequences = (
    <>
      {data?.map((item) => {
        return (
          <Panel header={item.name} key={item.uuid} className="site-collapse-custom-collapse">
            <SequenceCollapse keyId={'1'} />
          </Panel>
        );
      })}
    </>
  );

  return (
    <Collapse
      accordion
      key={'1'}
      bordered={false}
      onChange={setSequence}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      className="site-collapse-custom-collapse">
      {sequences}
    </Collapse>
  );
}
