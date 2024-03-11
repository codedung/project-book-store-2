import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { FaAngleDown } from "react-icons/fa";

interface EllipsisProps {
  children: React.ReactNode;
  linelimit: number;
}

const EllipsisBox: React.FC<EllipsisProps> = ({ children, linelimit }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <EllipsisBoxStyle linelimit={linelimit} $expanded={expanded}>
      <p>{children}</p>
      <div className="toggle">
        <Button
          size="small"
          scheme="normal"
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          {expanded ? "접기" : "펼치기"}
          <FaAngleDown />
        </Button>
      </div>
    </EllipsisBoxStyle>
  );
};

interface EllipsisStyleProps {
  linelimit: number;
  $expanded: boolean;
}
const EllipsisBoxStyle = styled.div<EllipsisStyleProps>`
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${({ linelimit, $expanded }) =>
      $expanded ? "none" : linelimit};
    -webkit-box-orient: vertical;
    padding: 0;
    padding-top: 20px;
    margin: 0;
  }
  .toggle {
    display: flex;
    justify-content: end;

    button {
      cursor: pointer;
      display: flex;
      align-items: center;
    }

    svg {
      fill: #fff;
      transform: ${({ $expanded }) =>
        $expanded ? "rotate(180deg)" : "rotate(0deg)"};
    }
  }
`;

export default EllipsisBox;
