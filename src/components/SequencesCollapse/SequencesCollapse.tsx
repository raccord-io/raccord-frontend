import React, { useState } from 'react';
import './SequencesCollapse.css';

import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useGetSequencesNameQuery, useGetSequenceQuery } from '../../services/projectApi';

import { SequenceCollapse } from '../index';

interface Props {
  currentSequenceSelected: string;
  setCurrentSequenceSelected: (value: string) => void;
}

export function SequencesCollapse({ currentSequenceSelected, setCurrentSequenceSelected }: Props) {
  const { Panel } = Collapse;
  const { projectId } = useParams();
  const { data: sequencesName } = useGetSequencesNameQuery(projectId!);

  const setSequence = (key: any) => {
    key && setCurrentSequenceSelected(key);
  };

  const sequences = (
    <>
      {sequencesName?.map((item, key) => {
        return (
          <Panel header={item.name} key={key} className="site-collapse-custom-collapse">
            <SequenceCollapse keyId={item.uuid} />
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
      defaultActiveKey={['0']}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      className="site-collapse-custom-collapse">
      {sequences}
    </Collapse>
  );
}
