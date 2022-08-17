import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import Layout from "../Components/Layout";
import { useMediaQuery } from "react-responsive";

// font-family: 'Proza Libre', sans-serif;
// font-family: 'Rubik', sans-serif;
// font-family: 'Rubik Glitch', cursive;

const MainContainer = styled.div`
  /* border: 2px solid white; */
  background-color: black;
  height: 850px;
  box-sizing: border-box;
  position: relative;

  @media screen and (min-width: 600px) and (max-width: 1154px) {
    height: 100%;
  }

  @media screen and (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
  }
`;

export const Content = styled.div`
  /* border: red 2px solid; */
  margin: 0px 100px 0;
  display: flex;
  min-height: 600px;
  height: 100%;
  padding-top: 50px;

  @media screen and (min-width: 600px) and (max-width: 1154px) {
    /* margin: 0px 5%; */
    font-size: 60px;
    /* height: 520px; */
    margin: 0px auto;
    /* border: green 2px solid; */
    width: 90%;
    padding: 20px 0;
    position: relative;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column-reverse;
    align-items: center;
    /* height: auto; */
    width: 90%;
    margin: 0;
    margin-top: 20px;
  }
`;

export const Colored = styled.span`
  color: orange;
  transition: all ease 0.5s;
`;

const LinkToQuotePage = styled.div`
  color: white;
  cursor: pointer;
  border: blue 2px solid;
  font-size: 30px;
  transition: all 0.5s ease;
  margin-left: 25px;
  width: 70%;
  border-radius: 20px;
  padding: 10px 25px 15px;
  background-color: transparent;
  border: none;
  border-bottom: white 3px solid;
  font-family: "Proza Libre", sans-serif;
  z-index: 1000;

  :hover {
    background-color: orange;
    color: black;
    border-bottom: transparent 3px solid;
  }

  :hover {
    ${Colored} {
      color: white;
    }
  }

  @media screen and (min-width: 600px) and (max-width: 1154px) {
    width: 100%;
    font-size: 26px;
    position: absolute;
    bottom: 0;
    margin-bottom: 50px;
    margin-left: 0;
  }

  @media screen and (max-width: 600px) {
    font-size: 19px;
    margin: 20px 0 40px;
    margin-left: 0;
    width: 80%;
    border: white 2px solid;
  }

  :hover {
    background-color: orange;
    color: black;
    border-bottom: transparent 3px solid;
    border: none;
  }
`;

const MainTitle = styled.h1`
  font-size: 70px;
  color: white;
  margin: 80px 0 120px;
  font-family: "Rubik", sans-serif;

  @media screen and (min-width: 600px) and (max-width: 1154px) {
    font-size: 50px;
    margin: 0;
  }

  @media screen and (max-width: 600px) {
    font-size: 30px;
    text-align: center;
    margin: 0 50px;
    margin-top: 10px;
  }
`;

const OrangeWordTitle = styled.span`
  color: orangered;
`;

const SectionWritings = styled.div`
  /* border: pink 2px solid; */
  display: flex;
  flex-direction: column;
  width: 70%;

  @media screen and (min-width: 600px) and (max-width: 1154px) {
    /* height: auto; */
  }

  @media screen and (max-width: 600px) {
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: -30px;
    z-index: 10;
    /* font-size: 20px; */
  }
`;

const SectionMainImage = styled.div`
  background: url("/ressources/naruto-bras-accueil.png") no-repeat center /
    cover;
  width: 50%;
  height: 520px;
  box-shadow: inset 0px -40px 10px 0px rgba(0, 0, 0, 1);
  /* border: yellow 2px solid; */

  @media screen and (min-width: 600px) and (max-width: 1154px) {
    width: 60%;
    height: 400px;
    transform: translateX(5px);
  }

  @media screen and (max-width: 600px) {
    width: 80%;
    height: 300px;
    transform: translateX(-25px);
  }
`;

const Home: NextPage = () => {
  const isDesktopScreen = useMediaQuery({ query: "(min-width: 900px)" });
  const isTabletScreen = useMediaQuery({
    query: "(min-width: 600px) and (max-width: 900px)",
  });
  const isMobileScreen = useMediaQuery({ query: "(max-width: 700px)" });

  return (
    <Layout>
      <Head>
        <title>NaruQuotes: Generate random citations now ! - HomePage </title>
      </Head>
      <MainContainer>
        <Content>
          <SectionWritings>
            <MainTitle>
              <OrangeWordTitle>Generate </OrangeWordTitle>
              any of your favorite anime characters citations
            </MainTitle>
            <br />
            {/* {!isTabletScreen && ( */}
            <Link href="quotes/quotes">
              <LinkToQuotePage>
                Generate a <Colored> random quote </Colored> now
              </LinkToQuotePage>
            </Link>
            {/* )} */}
          </SectionWritings>
          <SectionMainImage />
        </Content>
      </MainContainer>
    </Layout>
  );
};

export default Home;
