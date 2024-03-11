import styled from "styled-components";
import { FaSpinner } from "react-icons/fa";
const Loading: React.FC = () => {
  return (
    <LoadingStyle>
      <FaSpinner />
    </LoadingStyle>
  );
};

const LoadingStyle = styled.div`
  padding: 40px 0;
  text-align: center;
  svg {
    width: 70px;
    height: 70px;
    fill: #ccc;
    animation: rotate 2s linear infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loading;
