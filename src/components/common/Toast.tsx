import React from "react";
import { motion } from "framer-motion";

type ToastProps = {
  text: string;
};

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ text }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="toast"
      >
        {text}
      </motion.div>
    );
  }
);

export default Toast;
