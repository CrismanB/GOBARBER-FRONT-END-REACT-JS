import React, { createContext, useContext, useCallback, useState } from "react";
import { uuid } from "uuidv4";
import ToastContainer from "../components/ToastContainer";

interface ToastContextProps {
  addToast(message: Omit<ToastMessage, "id">): void;
  removeToast(id: string): void;
}

export interface ToastMessage {
  id: string;
  type?: "success" | "error" | "info";
  title: string;
  description?: string;
}

const ToastContext = createContext<ToastContextProps>({} as ToastContextProps);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ title, type, description }: Omit<ToastMessage, "id">): void => {
      const id = uuid();

      const toast = {
        id,
        title,
        type,
        description,
      };

      setMessages((state) => [...state, toast]);
    },
    []
  );

  const removeToast = useCallback((id: string): void => {
    setMessages((state) => state.filter((message) => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextProps {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}

export { ToastProvider, useToast };
