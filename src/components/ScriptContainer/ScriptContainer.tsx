/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState } from 'react';
import { useEffect } from 'react';

import { Modal } from 'antd';
import { Radio } from 'antd';

import { Tag } from '../../models/tagModel';

const rangy = require('rangy');

import { v4 as uuid } from 'uuid';
import { useAddTagMutation } from '../../services/projectApi';

import 'rangy/lib/rangy-classapplier';
import 'rangy/lib/rangy-highlighter';
import 'rangy/lib/rangy-selectionsaverestore';

import './ScriptContainer.css';

interface Props {
  content: any;
  projectId: string;
  currentSequenceSelected: string;
}

export const mapCategoryToClass = new Map([
  ['Lieux', 'highlightBlue'],
  ['Décors', 'highlightRed'],
  ['Accessoires', 'highlightGreen']
]);

export const ScriptContainer = ({ content, projectId, currentSequenceSelected }: Props) => {
  const [highlighter, setHighlighter] = useState(rangy.createHighlighter);
  const [openModalCategory, setOpenModalCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentHighlightedSelection, setCurrentHighlightedSelection] = useState();
  const [currentIdToDelete, setCurrentIdToDelete] = useState<string | undefined>('');

  const [addTag] = useAddTagMutation();

  // Use effect to initialize the highlighter
  useEffect(() => {
    rangy.init();
    const tmpHighlighter = rangy.createHighlighter();
    tmpHighlighter.addClassApplier(
      rangy.createClassApplier('highlightRed', {
        ignoreWhiteSpace: true,
        tagNames: ['span', 'a'],
        elementProperties: {
          id: uuid()
        }
      })
    );
    tmpHighlighter.addClassApplier(
      rangy.createClassApplier('highlightBlue', {
        ignoreWhiteSpace: true,
        tagNames: ['span', 'a'],
        elementProperties: {
          id: uuid()
        }
      })
    );
    tmpHighlighter.addClassApplier(
      rangy.createClassApplier('highlightGreen', {
        ignoreWhiteSpace: true,
        tagNames: ['span', 'a'],
        elementProperties: {
          id: uuid()
        }
      })
    );
    setHighlighter(tmpHighlighter);
  }, []);

  // Know if a highlited text is already highlited
  const isAlreadyHighlighted = () => {
    const sel = window.getSelection();
    if (sel?.rangeCount) {
      const range = sel.getRangeAt(0).cloneRange();
      if (
        range.commonAncestorContainer.parentElement?.className === 'highlightRed' ||
        range.commonAncestorContainer.parentElement?.className === 'highlightGreen' ||
        range.commonAncestorContainer.parentElement?.className === 'highlightBlue'
      ) {
        return true;
      }
    }
    return false;
  };

  // Function to highlight a text
  const highlightText = () => {
    const sel = window.getSelection();
    if (sel?.toString()) {
      setOpenModalCategory(true);
      setCurrentHighlightedSelection(rangy.saveSelection());
    }
  };

  // Function call when a text is higghlighted
  const onTextHighlighted = () => {
    if (isAlreadyHighlighted()) {
      const sel = window.getSelection();
      const tmpIdToDelete = sel?.getRangeAt(0).commonAncestorContainer.parentElement?.id;
      setCurrentIdToDelete(tmpIdToDelete);
      console.log(sel?.getRangeAt(0).commonAncestorContainer.parentElement?.id);
      highlighter.unhighlightSelection();
    } else highlightText();
  };

  const onOkModalCategory = () => {
    rangy.restoreSelection(currentHighlightedSelection, true);
    highlighter.highlightSelection(mapCategoryToClass.get(selectedCategory));
    const sel = window.getSelection();
    const id = sel?.getRangeAt(0).commonAncestorContainer.parentElement?.id;
    setOpenModalCategory(false);
    const tag: Tag = {
      text: window.getSelection()?.toString()!,
      sequenceId: currentSequenceSelected,
      categoryId: selectedCategory,
      uuid: id!
    };
    addTag({ projectId, tag });
  };

  const onChangeRadioButton = (value: any) => {
    setSelectedCategory(value.target.value);
  };

  return (
    <div className="script-page">
      <Modal
        title="Selectionnez une catégorue"
        open={openModalCategory}
        onCancel={() => setOpenModalCategory(false)}
        onOk={onOkModalCategory}
        width="20vw">
        <div className="categories-selection-container">
          <Radio.Group onChange={onChangeRadioButton} defaultValue={selectedCategory}>
            <Radio.Button value="Lieux">Lieux</Radio.Button>
            <Radio.Button value="Décors">Décor</Radio.Button>
            <Radio.Button value="Accessoires">Accessoires</Radio.Button>
          </Radio.Group>
        </div>
      </Modal>
      <div className="script-text-container" onMouseUp={onTextHighlighted}>
        <div className="text-container">{content}</div>
      </div>
    </div>
  );
};
