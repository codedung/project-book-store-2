import styled from "styled-components";
import logo from "../../assets/images/logo.png";

function Footer() {
  return (
    <>
      <FooterStyle>
        <h1 className="logo">
          <img src={logo} alt="book store" />
        </h1>
        <div className="copyright">
          <p>copyright (c) 2024, book store.</p>
        </div>
      </FooterStyle>
    </>
  );
}

const FooterStyle = styled.footer`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  border-top: 1px solid ${({ theme }) => theme.color.border};
  padding: 20px 0;

  display: flex;
  justify-content: space-between;
  .logo {
    img {
      width: 140px;
      filter: grayscale(100);
    }
  }
  .copyright {
    p {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.color.text};
    }
  }
  @media screen and (${({ theme }) => theme.mediaQuery.mobile}) {
    flex-flow: column;
    align-items: center;
  }
`;
export default Footer;
