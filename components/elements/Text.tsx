'use client';

import { TextIcon } from 'lucide-react';
import {
  ElementsType,
  EmailElement,
  EmailElementInstance,
} from '../EmailElements';

const type: ElementsType = 'Text';

const extraAttributes = {
  text: 'Text here...',
};

export const TextEmailElement: EmailElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes: extraAttributes,
  }),

  DesignerBtn: {
    icon: TextIcon,
    label: 'Text',
  },

  Designer: DesignerComponent,
  Renderer: () => <div>Renderer Component</div>,
  Inspector: () => <div>Inspector Component</div>,
};

type CustomInstance = EmailElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: EmailElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  return <p className='text-center py-4'>{element.extraAttributes.text}</p>;
}
