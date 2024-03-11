import { useToastStore } from "@/store/toastStore";
import styled from "styled-components";
import Toast from "./Toast";

const ToastContainer: React.FC = () => {
  const toasts = useToastStore((state) => state.toasts);
  return (
    <ToastContainerStyle>
      {toasts.map((toast) => (
        <Toast id={toast.id} msg={toast.msg} type={toast.type} />
      ))}
    </ToastContainerStyle>
  );
};

const ToastContainerStyle = styled.div`
  position: fixed;
  top: 32px;
  right: 24px;
  z-index: 1000;

  display: flex;
  flex-flow: column;
  gap: 12px;
`;

export default ToastContainer;
