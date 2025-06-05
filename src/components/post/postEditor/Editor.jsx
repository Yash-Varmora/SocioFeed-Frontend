import { EditorContent } from '@tiptap/react';
import React from 'react';
import EditorToolbar from './EditorToolbar';

const Editor = ({ editor }) => {
  return (
    <>
      <EditorToolbar editor={editor} />
      <EditorContent
        editor={editor}
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          minHeight: '100px',
          marginBottom: '16px',
        }}
      />
    </>
  );
};

export default Editor;
