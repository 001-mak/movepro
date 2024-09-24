import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface ModalContent {
  title: string;
  message: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  onClose: () => void;
}

export interface ModalContextType {
  isOpen: boolean;
  openModal: (content: ModalContent) => void;
  closeModal: () => void;
  content: ModalContent;
}

export const defaultModalContent: ModalContent = {
  title: '',
  message: '',
  primaryButtonText: '',
  secondaryButtonText: '',
  onClose: () => {}
};

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};


interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ModalContent>(defaultModalContent);

  const openModal = (newContent: ModalContent) => {
    setContent(newContent);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    content.onClose();
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, content }}>
      {children}
    </ModalContext.Provider>
  );
};