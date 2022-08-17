import SearchBar from "./SearchBar";
import styled from "styled-components";
import Link from "next/link";
import { Colored } from "../pages/index";

type Props = {
  children: any;
};

const HeaderBar = styled.header`
  width: 100%;
  background-color: black;
  padding: 15px 0;

  @media screen and (max-width: 900px) {
  }

  @media screen and (max-width: 600px) {
  }
`;

const HeaderNavBar = styled.nav`
  display: flex;
  /* border: white 2px solid; */
  color: white;
  margin: 0 100px;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 900px) {
    margin: 0 5%;
    /* flex-direction: column;
    justify-content: center; */
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const LogoClickable = styled.span`
  font-family: "Rubik Glitch", cursive;
  /* border: white 2px solid; */
  /* height: 100%; */
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media screen and (max-width: 900px) {
    font-size: 20px;
  }

  @media screen and (max-width: 600px) {
    margin-bottom: 5%;
    font-size: 30px;
  }
`;

const Footer = styled.footer`
  background-color: orange;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Rubik", sans-serif;
  font-weight: bold;

  @media screen and (max-width: 900px) {
  }

  @media screen and (max-width: 600px) {
    height: 40px;
    font-size: 12px;
  }
`;

export default function Layout(Props: Props) {
  return (
    <>
      <HeaderBar>
        <HeaderNavBar>
          <Link href={"/"}>
            <LogoClickable>
              <Colored>Naru</Colored>
              Quotes
            </LogoClickable>
          </Link>
          <SearchBar />
        </HeaderNavBar>
      </HeaderBar>
      {Props.children}
      <Footer>
        <p>Made w/ ♥️ and passion by FPan7792</p>
      </Footer>
    </>
  );
}
