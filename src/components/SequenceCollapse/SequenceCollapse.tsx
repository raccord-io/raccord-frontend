import React from 'react';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

interface Props {
  content: Array<{ header: string; key: string }>;
  keyId: string;
}

const categoryInfos = [
  { category: 'Lieu', tags: ['Hopital', 'piscine'] },
  { category: 'Accessoire', tags: ['Boule', 'Ballon'] }
];

const SequenceCollapse: React.FC<Props> = (props: Props) => {
  const { Panel } = Collapse;

  return (
    <Collapse
      key={props.keyId}
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      className="site-collapse-custom-collapse">
      {categoryInfos.map((item) => {
        return (
          <Panel header={item.category} key={item.category} className="site-collapse-custom-panel">
            {item.tags.map((tag, index) => {
              return <p key={index}>{tag}</p>;
            })}
          </Panel>
        );
      })}
    </Collapse>
  );
};

export default SequenceCollapse;
