import { TextEmailElement } from './elements/Text';

export type ElementsType = 'Text';

export type EmailElement = {
  type: ElementsType;

  construct: (id: string) => EmailElementInstance;

  DesignerBtn: {
    icon: React.ElementType;
    label: string;
  };

  Designer: React.FC;
  Renderer: React.FC;
  Inspector: React.FC;
};

export type EmailElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, unknown>;
};

export type EmailElementsType = {
  [key in ElementsType]: EmailElement;
};

export const EmailElements: EmailElementsType = {
  Text: TextEmailElement,
};
