import styled from "styled-components";
import Button from "../common/Button";
import { useSearchParams } from "react-router-dom";
import { useCategory } from "../../hooks/useCategory";
import { QUERYSTRING } from "../../constants/querystring";

const BooksFilter: React.FC = () => {
  // 상태
  // 1. 카테고리
  // 2. 신간여부 true, false

  // 쿼리스트링 = 상태공유, 재사용성 보장, 검색엔진 최적화, 데이터추적 및 분석 용이
  // filter => 쿼리스트링 요청
  // useBook(hooks) => 쿼리스트링을 감지 후 fetch 진행, fetch 완료되면 list 갱신
  // 리스트가 갱신되면 Books 컴포넌트 갱신

  const { category } = useCategory();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategory = (id: number | null) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (id === null) {
      newSearchParams.delete(QUERYSTRING.CATEGORY_ID);
    } else {
      newSearchParams.set(QUERYSTRING.CATEGORY_ID, id.toString());
    }

    setSearchParams(newSearchParams);
  };

  const handleNews = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newSearchParams.get(QUERYSTRING.NEWS)) {
      newSearchParams.delete(QUERYSTRING.NEWS);
    } else {
      newSearchParams.set(QUERYSTRING.NEWS, "true");
    }
    setSearchParams(newSearchParams);
  };

  return (
    <BooksFilterStyle>
      <div className="category">
        {category.map((item) => {
          return (
            <Button
              size="medium"
              scheme={item.isActive ? "primary" : "normal"}
              key={item.idx}
              onClick={() => handleCategory(item.idx)}
            >
              {item.category_ko}
            </Button>
          );
        })}
      </div>
      <div className="new">
        <Button
          size="medium"
          scheme={searchParams.get("news") ? "primary" : "normal"}
          onClick={() => handleNews()}
        >
          신간
        </Button>
      </div>
    </BooksFilterStyle>
  );
};

const BooksFilterStyle = styled.div`
  display: flex;
  gap: 24px;

  .category {
    display: flex;
    gap: 8px;
  }
`;

export default BooksFilter;
