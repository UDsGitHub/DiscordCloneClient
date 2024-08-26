import { AnimatePresence, motion } from "framer-motion";

type Props = {
  text: string;
  isVisible: boolean;
};

const Toast = ({ text, isVisible }: Props) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: "-50%", y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5 }}
          className="toast bg-grey-700 text-grey-400"
        >
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
