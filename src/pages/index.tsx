import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import styled from "styled-components";
import { myTheme } from "../my-theme";

const Home: NextPage = () => {
  const MainDiv = styled.div`
    text-align: center;
    border: 2px solid black;
    border-radius: 20px;
    margin: 200px;
  `;

  const LinkToQuotePage = styled.a`
    color: ${myTheme.colors.secondary};
    cursor: pointer;
  `;

  return (
    <MainDiv>
      Je suis une lanfing page
      <br />
      <Link href="Quotes/quotes">
        <LinkToQuotePage>Go To Quote Page</LinkToQuotePage>
      </Link>
    </MainDiv>
  );
};

export default Home;
