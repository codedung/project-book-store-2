import { Banner as IBanner } from "@/models/banner.model";
import styled from "styled-components";
import BannerItem from "./BannerItem";
import { useMemo, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface BannerProps {
  banners: IBanner[];
}
const Banner: React.FC<BannerProps> = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log(currentIndex);

  const transFormValue = useMemo(() => {
    return currentIndex * -100;
  }, [currentIndex]);

  const handlePrev = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  };
  const handleNext = () => {
    if (currentIndex === banners.length - 1) return;
    setCurrentIndex(currentIndex + 1);
  };
  const handleIndicatorClick = (id: number) => {
    setCurrentIndex(id);
  };
  return (
    <BannerStyle>
      <BannerContainerStyle $transFormValue={transFormValue}>
        {banners.map((banner) => (
          <BannerItem banner={banner} key={banner.id} />
        ))}
      </BannerContainerStyle>
      <BannerButtonStyle>
        <button onClick={handlePrev} className="prev">
          <FaAngleLeft />
        </button>
        <button onClick={handleNext} className="next">
          <FaAngleRight />
        </button>
      </BannerButtonStyle>
      {/* 인디케이터 */}
      <BannerIndicatorStyle>
        {banners.map((banner, index) => (
          <span
            key={index}
            className={currentIndex === index ? "active" : ""}
            onClick={() => handleIndicatorClick(index)}
          ></span>
        ))}
      </BannerIndicatorStyle>
    </BannerStyle>
  );
};

const BannerStyle = styled.div`
  overflow: hidden;
  position: relative;
`;

interface BnrContainerStyleProps {
  $transFormValue: number;
}

const BannerContainerStyle = styled.div<BnrContainerStyleProps>`
  display: flex;
  transform: translateX(${(props) => props.$transFormValue}%);
  transition: transform 0.5s ease-in-out;
`;

const BannerButtonStyle = styled.div`
  button {
    border: 0;
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    font-size: 2rem;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    &.prev {
      left: 10px;
    }
    &.next {
      right: 10px;
    }
    svg {
      fill: #fff;
    }

    @media screen and (${({ theme }) => theme.mediaQuery.mobile}) {
      width: 28px;
      height: 28px;
      font-size: 1.5rem;
      &.prev {
        left: 0px;
      }
      &.next {
        right: 0px;
      }
    }
  }
`;

const BannerIndicatorStyle = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0);
  span {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    margin: 0 4px;
    cursor: pointer;

    &.active {
      background: ${({ theme }) => theme.color.primary};
    }
  }

  @media screen and (${({ theme }) => theme.mediaQuery.mobile}) {
    bottom: 0;
    span {
      width: 12px;
      height: 12px;
      border-radius: 500px;
      background: #ccc;

      &.active {
        width: 24px;
      }
    }
  }
`;
export default Banner;
