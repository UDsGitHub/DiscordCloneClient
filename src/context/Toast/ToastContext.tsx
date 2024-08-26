import React, { createContext, useState } from "react";
import { Toast } from "components";
import { AnimatePresence } from "framer-motion";

type ToastContextType = {
  showToast: (text: string) => void;
};

type Props = {
  children: React.ReactNode;
};

export const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

const ToastProvider = ({ children }: Props) => {
const [text, setText] = useState<string>('');
const [isVisible, setIsVisible] = useState<boolean>(false);

  function showToast(text: string) {
    setText(text)
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 2500)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <AnimatePresence mode="popLayout">
        <Toast text={text} isVisible={isVisible} />
      </AnimatePresence>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
