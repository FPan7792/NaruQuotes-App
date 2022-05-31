import Head from "next/head";
import styled from "styled-components";
import { Datas } from "../../types";
import Layout from "../../Components/Layout";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 50px 100px 0;
`;

const NextButton = styled.button`
  font-family: "Rubik", sans-serif;

  background-color: orange;
  padding: 0 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  height: 40px;
  width: 30%;
  color: whitesmoke;
  transition: all ease-in-out 0.3s;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  color: black;

  :active {
    /* transform: scale(1.1); */
    background-color: black;
    color: whitesmoke;
  }
  margin: 20px 0;
`;

const SectionQuoteTitle = styled.h3`
  position: relative;
  font-size: 35px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  margin-left: 10px;
  transform: translateY(-35px);
  margin-left: 20px;
  ::before {
    content: "";
    position: absolute;
    display: inline-block;
    width: 70%;
    height: 30%;
    background-color: black;
    transform: translate(0%, 40%) skew(20deg);
    z-index: -10;
    background-color: orange;
    opacity: 60%;
    border-left: 10px orangered solid;
  }
  font-family: "Proza Libre", sans-serif;
`;

const PictureAndQuoteBox = styled.div`
  display: flex;
  margin-top: 50px;
  width: 50%;
  /* border: black 2px solid; */
`;

const Picture = styled.img.attrs({})`
  /* border: 2px solid black; */
  box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  width: 200px;
  height: 200px;
  object-fit: cover;
  object-position: center;
`;

const DinamicContentSection = styled.div`
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  width: 80%;
  height: 550px;
  /* border: black 2px solid; */
  margin-bottom: 100px;
`;

const SectionQuoteAnime = styled.p`
  /* border: 2px solid black; */
  font-family: "Proza Libre", sans-serif;
  min-height: 250px;
  width: 50%;
  font-weight: bold;
  overflow-y: auto;
  margin: 10px 0;
  border-radius: 20px;
  display: flex;
  align-items: center;
`;

const Anime = styled.p`
  /* border: 2px solid black; */
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  color: orangered;
  font-size: 20px;
  transform: translate(-210px, 100px);
  font-weight: bold;
  text-transform: capitalize;
`;

export const Quote: any = (Props: Datas) => {
  const { datas } = Props;
  const router = useRouter();

  if (datas) {
    return (
      <Layout>
        <Head>
          <title>
            NaruQuotes: Generate random citations now ! - QuotePage{" "}
          </title>
        </Head>
        <Container>
          <NextButton
            onClick={() => {
              router.replace(router.asPath);
            }}
          >
            Get another quote
          </NextButton>
          <DinamicContentSection>
            <PictureAndQuoteBox>
              <Picture
                src="/ressources/images/generics/0.png"
                alt="naruto"
              ></Picture>
              <SectionQuoteTitle>{datas.character}</SectionQuoteTitle>
              {/* <Anime>{datas[index].anime}</Anime> */}
            </PictureAndQuoteBox>
            <SectionQuoteAnime>&quot; {datas.quote} &quot;</SectionQuoteAnime>
          </DinamicContentSection>
        </Container>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Container>Not Quotes Found, Sorry</Container>;
      </Layout>
    );
  }
};

export const getServerSideProps = async () => {
  try {
    return await fetch(
      "https://animechan.vercel.app/api/quotes/anime?title=naruto"
    )
      .then((response) => response.json())
      .then((datas) => {
        const index = Math.floor(Math.random() * datas.length);

        return { props: { datas: datas[index] } };
      })
      .catch((e: any) => {
        return { props: { error: e.message } };
      });
  } catch (e: any) {
    console.log(e.message);
    return { notFound: true };
  }
};

export default Quote;
