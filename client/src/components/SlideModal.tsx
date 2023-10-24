
import styles from "./css/modal.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const SlideModal = ({ isOpen, children, onClose }: Props) => {
  return (
    <div
      className={`${styles["modal-overlay"]} ${
        isOpen ? styles["modal-open"] : ""
      }`}
      onClick={onClose}
    >
      <div
        className={`${styles.modal}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default SlideModal;
