import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';

function useEditors() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        underline: false,
        listItem: false,
        bulletList: false,
        orderedList: false,
      }),
      Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      ListItem,
      BulletList,
      OrderedList,
    ],
    content: '',
  });

  return editor;
}

export default useEditors;
