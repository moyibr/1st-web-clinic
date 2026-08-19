import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  labelledBy?: string;
}

/**
 * Minimal dependency-free modal: backdrop click, Escape key, and a close button all
 * dismiss it. Used for doctor "full bio" detail — kept generic so any page can reuse it.
 */
export function Modal({ onClose, children, labelledBy }: ModalProps) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-secondary/60 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-brand bg-surface p-6 shadow-xl"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="float-right -mt-2 -mr-2 flex h-8 w-8 items-center justify-center rounded-full text-ink/50 hover:bg-black/5 hover:text-ink"
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
