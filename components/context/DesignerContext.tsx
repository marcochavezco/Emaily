'use client';

import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { EmailElementInstance } from '../EmailElements';

type DesignerContextType = {
  elements: EmailElementInstance[];
  addElement: (index: number, element: EmailElementInstance) => void;
  removeElement: (id: string) => void;

  selectedElement: EmailElementInstance | null;
  setSelectedElement: Dispatch<SetStateAction<EmailElementInstance | null>>;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [elements, setElements] = useState<EmailElementInstance[]>([]);
  const [selectedElement, setSelectedElement] =
    useState<EmailElementInstance | null>(null);

  const addElement = (index: number, element: EmailElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (id: string) => {
    return setElements((prev) => prev.filter((element) => element.id !== id));
  };

  return (
    <DesignerContext.Provider
      value={{
        elements,
        addElement,
        removeElement,
        selectedElement,
        setSelectedElement,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
