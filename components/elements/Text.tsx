'use client';

import { TextIcon } from 'lucide-react';
import { ElementsType, EmailElement } from '../EmailElements';

const type: ElementsType = 'Text';

export const TextEmailElement: EmailElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      text: 'Text',
    },
  }),

  DesignerBtn: {
    icon: TextIcon,
    label: 'Text',
  },

  Designer: () => <div>Designer Component</div>,
  Renderer: () => <div>Renderer Component</div>,
  Inspector: () => <div>Inspector Component</div>,
};
