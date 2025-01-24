import React, { useEffect, useMemo, useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { hasCookie } from "../../utils/cookie";

interface LoginRegisterModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const LoginRegisterModal: React.FC<LoginRegisterModalProps> = ({
  isOpen: externalIsOpen,
  onClose: externalOnClose,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  const isControlled = externalIsOpen !== undefined && externalOnClose !== undefined;
  const modalIsOpen = isControlled ? externalIsOpen : isOpen;
  const handleClose = useMemo(
    () =>
      isControlled
        ? () => {
            externalOnClose?.();
            setIsRegistering(false);
          }
        : () => {
            setIsOpen(false);
            setIsRegistering(false);
          },
    [isControlled, externalOnClose]
  );

  useEffect(() => {
    if (modalIsOpen && hasCookie("sessionIndicator")) {
      handleClose();
    }
  }, [modalIsOpen, handleClose]);

  const toggleRegistering = () => setIsRegistering((prev) => !prev);

  if (!modalIsOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {!isRegistering ? (
        <LoginModal
          isOpen={modalIsOpen}
          onClose={handleClose}
          toggleRegistering={toggleRegistering}
        />
      ) : (
        <RegisterModal
          isOpen={modalIsOpen}
          onClose={handleClose}
          toggleRegistering={toggleRegistering}
        />
      )}
    </div>
  );
};

export default LoginRegisterModal;
