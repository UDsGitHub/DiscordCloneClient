import React from "react";
import { motion } from "framer-motion";

type ToastProps = {
  text: string;
  isVisible: boolean;
};

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ text, isVisible }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
        transition={{ duration: 0.5 }}
        className="toast"
      >
        {text}
      </motion.div>
    );
  }
);

export default Toast;
