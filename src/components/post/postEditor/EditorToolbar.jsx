import { IconButton, Toolbar } from '@mui/material';
import React from 'react';
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa';
import { MdFormatListBulleted, MdFormatListNumbered } from 'react-icons/md';
import { LuHeading1, LuHeading2, LuHeading3 } from 'react-icons/lu';

const EditorToolbar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <Toolbar
      variant="dense"
      sx={{
        bgcolor: 'grey.100',
        borderRadius: 1,
        mb: 1,
        justifyContent: 'flex-start',
        gap: 1,
      }}
    >
      <IconButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        color={editor.isActive('bold') ? 'primary' : 'default'}
        title="Bold"
      >
        <FaBold />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        color={editor.isActive('italic') ? 'primary' : 'default'}
        title="Italic"
      >
        <FaItalic />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        color={editor.isActive('underline') ? 'primary' : 'default'}
        title="Underline"
      >
        <FaUnderline />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        color={editor.isActive('heading', { level: 1 }) ? 'primary' : 'default'}
        title="Heading 1"
      >
        <LuHeading1 />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        color={editor.isActive('heading', { level: 2 }) ? 'primary' : 'default'}
        title="Heading 2"
      >
        <LuHeading2 />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        color={editor.isActive('heading', { level: 3 }) ? 'primary' : 'default'}
        title="Heading 3"
      >
        <LuHeading3 />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        color={editor.isActive('bulletList') ? 'primary' : 'default'}
        title="Bullet List"
      >
        <MdFormatListBulleted />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        color={editor.isActive('orderedList') ? 'primary' : 'default'}
        title="Ordered List"
      >
        <MdFormatListNumbered />
      </IconButton>
    </Toolbar>
  );
};

export default EditorToolbar;
