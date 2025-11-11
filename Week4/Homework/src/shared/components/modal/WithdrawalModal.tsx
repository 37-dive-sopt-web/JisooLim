import { createPortal } from "react-dom";
import Button from "@/shared/components/button/Button";
import * as styles from "./WithdrawalModal.css";

interface WithdrawalModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const WithdrawalModal = ({
  isOpen,
  onCancel,
  onConfirm,
}: WithdrawalModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="withdrawal-modal-title"
      onClick={onCancel}
    >
      <div
        className={styles.content}
        onClick={(event) => event.stopPropagation()}
      >
        <h3 id="withdrawal-modal-title" className={styles.title}>
          정말 탈퇴하실 건가요?
        </h3>
        <p className={styles.description}>
          탈퇴 후에는 모든 정보가 삭제됩니다.
        </p>
        <div className={styles.actions}>
          <Button
            text="취소"
            tone="secondary"
            size="small"
            fullWidth={false}
            className={styles.actionButton}
            onClick={onCancel}
          />
          <Button
            text="회원 탈퇴"
            tone="danger"
            size="small"
            fullWidth={false}
            className={styles.actionButton}
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default WithdrawalModal;
