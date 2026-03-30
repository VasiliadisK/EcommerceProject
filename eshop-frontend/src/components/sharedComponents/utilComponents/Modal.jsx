import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, className = "", onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const modal = dialogRef.current;

    if (open) {
      modal?.showModal();
    }

    return () => modal.close();
  }, [open]);

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) onClose();
  };

  //handle the scenario where the user presses escape key to close the modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  return createPortal(
    <dialog
      ref={dialogRef}
      className={`modal ${className}`}
      onClick={handleBackdropClick}
    >
      {children}
    </dialog>,
    document.getElementById("modal"), //points to the div with id "modal" in index.html
  );
}
