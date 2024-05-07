import { useEffect, useState } from "react";

interface ToastProps {
  title: string;
  description?: string;
  type?: string;
  onClose?: () => void;
}

export default function Toast(props: ToastProps) {
  const [show, setShow] = useState(true);
  const [remove, setRemove] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleAnimationEnd = () => {
    setShow(false);
    setRemove(true);
    if (props.onClose) props.onClose();
  };

  if (remove) return null;
  return (
    <div
      onTransitionEnd={handleAnimationEnd}
      className={`toast toast-top toast-end cursor-pointer ${
        show ? "show" : ""
      }`}
      onClick={() => setShow(false)}
    >
      <div className={`alert ${props.type}`}>
        <span>{props.title}</span>
      </div>
    </div>
  );
}
