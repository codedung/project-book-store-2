import { styled } from "styled-components";
import logo from "../../assets/images/logo.png";
import {
  FaSignInAlt,
  FaRegUser,
  FaUserCircle,
  FaBars,
  FaAngleRight
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCategory } from "../../hooks/useCategory";
import { useAuthStore } from "../../store/authStore";
import Button from "./Button";
import Dropdown from "./Dropdown";
import ThemeSwitcher from "../header/ThemeSwitcher";
import { useState } from "react";

function Header() {
  const { isLoggedIn, storeLogout } = useAuthStore();
  const { category } = useCategory();

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <HeaderStyled $isOpen={isMobileOpen}>
      <h1 className="logo">
        <Link to="/">
          <img src={logo} alt="book store" />
        </Link>
      </h1>
      <nav className="category">
        <button
          className="menu-button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <FaAngleRight /> : <FaBars />}
        </button>
        <ul>
          {category.map((item) => {
            return (
              <li key={item.idx}>
                <Link
                  to={
                    item.idx === null
                      ? `/books`
                      : `/books?category_id=${item.idx}`
                  }
                >
                  {item.category_ko}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <nav className="auth">
        <Dropdown toggleButton={<FaUserCircle />}>
          <>
            {isLoggedIn && (
              <ul>
                <li>
                  <Link to="/cart">장바구니</Link>
                </li>
                <li>
                  <Link to="/order">주문내역</Link>
                </li>
                <li>
                  <button onClick={storeLogout}>로그아웃</button>
                </li>
              </ul>
            )}
            {!isLoggedIn && (
              <ul>
                <li>
                  <Link to="/login">
                    <FaSignInAlt />
                    로그인
                  </Link>
                </li>
                <li>
                  <Link to="/signup">
                    <FaRegUser />
                    회원가입
                  </Link>
                </li>
                <li>
                  <ThemeSwitcher />
                </li>
              </ul>
            )}
          </>
        </Dropdown>
      </nav>
    </HeaderStyled>
  );
}

interface HeaderStyleProps {
  $isOpen: boolean;
}
const HeaderStyled = styled.header<HeaderStyleProps>`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};

  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};

  .logo {
    img {
      width: 200px;
    }
  }

  .category {
    .menu-button {
      display: none;
    }
    ul {
      display: flex;
      gap: 32px;
      li {
        a {
          font-size: 1.5rem;
          font-weight: 600;
          text-decoration: none;
          color: ${({ theme }) => theme.color.text};

          &:hover {
            color: ${({ theme }) => theme.color.primary};
          }
        }
      }
    }
  }

  .auth {
    ul {
      display: flex;
      flex-flow: column;
      gap: 16px;

      width: 100px;
      li {
        a,
        button {
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          background: none;
          border: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          line-height: 1;
          width: 100%;
          cursor: pointer;

          svg {
            margin-right: 6px;
          }
        }
      }
    }
  }

  @media screen and (${({ theme }) => theme.mediaQuery.mobile}) {
    height: 52px;
    padding: 0;
    .logo {
      padding: 0 0 0 12px;

      img {
        width: 140px;
      }
    }
    .auth {
      position: absolute;
      top: 12px;
      right: 12px;
    }
    .category {
      .menu-button {
        display: flex;
        background: #fff;
        border: 0;
        position: absolute;
        top: 14px;
        right: ${({ $isOpen }) => ($isOpen ? "62%" : "56px")};
        cursor: pointer;
        font-size: 1.5rem;
        transition: all 0.5s ease-in-out;
      }
      ul {
        position: fixed;
        top: 0;
        right: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
        width: 60%;
        height: 100vh;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0.2);
        transition: all 0.5s ease-in-out;

        margin: 0;
        padding: 24px;
        z-index: 1000;

        flex-flow: column;
      }
    }
  }
`;

export default Header;
