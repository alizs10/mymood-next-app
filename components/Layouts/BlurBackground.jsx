import { motion } from "framer-motion";

const BlurBackgtuond = ({ setUserSettingsVisibility, children }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 flex-center left-0 w-screen h-screen bg-slate-100/50 z-20"
            onClick={() => setUserSettingsVisibility(false)}
        >
            {children}
        </motion.div>

    );
}

export default BlurBackgtuond;