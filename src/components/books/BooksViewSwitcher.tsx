import styled from "styled-components";
import Button from "../common/Button";
import { FaList, FaTh } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/querystring";
import { useEffect } from "react";

const viewOption = [
  { value: "list", icon: <FaList /> },
  { value: "grid", icon: <FaTh /> }
];

export type ViewMode = "grid" | "list";

const BooksViewSwitcher: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const handleSwitch = (value: string) => {
    newSearchParams.set(QUERYSTRING.VIEW, value);
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    if (!searchParams.get(QUERYSTRING.VIEW)) {
      handleSwitch("grid");
    }
  }, [searchParams.get(QUERYSTRING.VIEW)]);
  return (
    <BooksViewSwitcherStyle>
      {viewOption.map((option) => (
        <Button
          size="medium"
          scheme={
            searchParams.get(QUERYSTRING.VIEW) === option.value
              ? "primary"
              : "normal"
          }
          key={option.value}
          onClick={() => {
            handleSwitch(option.value as ViewMode);
          }}
        >
          {option.icon}
        </Button>
      ))}
    </BooksViewSwitcherStyle>
  );
};

const BooksViewSwitcherStyle = styled.div`
  display: flex;
  gap: 8px;

  svg {
    fill: #fff;
  }
`;

export default BooksViewSwitcher;
