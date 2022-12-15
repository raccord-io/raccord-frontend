import React from 'react';
import './SequenceCollapse.css';

import { Collapse, Tag } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useGetSequenceQuery } from '../../services/projectApi';
import { useParams } from 'react-router-dom';

interface Props {
  keyId: string;
}

const categoryInfos = [
  { category: 'Lieu', tags: ['Hopital', 'piscine'] },
  { category: 'Accessoire', tags: ['Boule', 'Ballon'] }
];

export function SequenceCollapse({ keyId }: Props) {
  const { Panel } = Collapse;
  const { projectId } = useParams();
  const { data: sequenceContent } = useGetSequenceQuery({
    projectId: projectId!,
    sequenceId: keyId
  });

  return (
    <Collapse
      key={keyId}
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      className="site-collapse-custom-collapse">
      {sequenceContent?.categories.map((item: any) => {
        return (
          <Panel
            style={{ backgroundColor: item.color }}
            header={item.name}
            key={item.uuid}
            className="site-collapse-custom-panel">
            {item.tags.map((tag: any) => {
              return (
                <Tag style={{ backgroundColor: item.color }} key={tag.uuid}>
                  {tag.content}
                </Tag>
              );
            })}
          </Panel>
        );
      })}
    </Collapse>
  );
}
