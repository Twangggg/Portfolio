import { createContext, useContext, useState } from "react";

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [section, setSection] = useState(null);

  const openModal = (name) => setSection(name);
  const closeModal = () => setSection(null);

  return (
    <ModalContext.Provider value={{ section, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
