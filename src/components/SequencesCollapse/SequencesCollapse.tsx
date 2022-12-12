import React from 'react';
import './SequencesCollapse.css';

import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

import { SequenceCollapse } from '../index';

export function SequencesCollapse() {
  const { Panel } = Collapse;

  const sequencesName = [
    { name: 'Séquence 1', id: '1' },
    { name: 'Séquence 2', id: '2' },
    { name: 'Séquence 3', id: '3' },
    { name: 'Séquence 4', id: '4' }
  ];

  const categoriesName = [
    { header: 'Lieu', key: '1' },
    { header: 'Accessoire', key: '2' },
    { header: 'Décors', key: '3' },
    { header: 'Personnages', key: '4' }
  ];

  const sequences = (
    <>
      {sequencesName.map((item) => {
        return (
          <Panel header={item.name} key={item.id} className="site-collapse-custom-collapse">
            <SequenceCollapse content={categoriesName} keyId={'1'} />
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
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      className="site-collapse-custom-collapse">
      {sequences}
    </Collapse>
  );
}
