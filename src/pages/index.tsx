import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import Layout from "../Components/Layout";

// font-family: 'Proza Libre', sans-serif;
// font-family: 'Rubik', sans-serif;
// font-family: 'Rubik Glitch', cursive;

const MainContainer = styled.div`
  border: 2px solid black;
  background-color: black;
  height: 800px;
  box-sizing: border-box;
  position: relative;
`;

export const Content = styled.div`
  margin: 80px 100px 0;
  display: flex;
  height: 600px;
`;

export const Colored = styled.span`
  color: orange;
  transition: all ease 0.5s;
`;

const LinkToQuotePage = styled.button`
  color: white;
  cursor: pointer;
  /* border: white 2px solid; */
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
`;

const MainTitle = styled.h1`
  font-size: 70px;
  color: white;
  margin: 80px 0 120px;
  font-family: "Rubik", sans-serif;
`;

const OrangeWordTitle = styled.span`
  color: orangered;
`;

const SectionWritings = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const SectionMainImage = styled.div`
  background: url("/ressources/naruto-bras-accueil.png") no-repeat center /
    cover;
  width: 50%;
  height: 520px;
  box-shadow: inset 0px -40px 10px 0px rgba(0, 0, 0, 1);
`;

const Home: NextPage = () => {
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
            <Link href="quotes/quotes">
              <LinkToQuotePage>
                Generate a <Colored> random quote </Colored> now
              </LinkToQuotePage>
            </Link>
          </SectionWritings>
          <SectionMainImage></SectionMainImage>
        </Content>
      </MainContainer>
    </Layout>
  );
};

export default Home;
