import Head from "next/head";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { QuoteObject, PicturesObject } from "../../types";
import Image from "next/image";
// import * as fs from "fs/promises";
import Layout from "../../Components/Layout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight, faCircleLeft } from "@fortawesome/free-solid-svg-icons";

export const MainContainer = styled.div`
  /* border: pink 2px solid; */
  display: flex;
  justify-content: space-between;
  margin: 80px 200px;
  padding: 0px 0 0px 180px;
  border-left: orangered 1px solid;
  align-items: center;

  @media screen and (min-width: 600px) and (max-width: 1154px) {
    border-left: none;
    padding: 0px;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    /* border: green 2px solid; */
  }

  @media screen and (max-width: 600px) {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    border-left: none;
    margin: 0 auto;
    padding: 0;
    width: 80%;
  }
`;

const SectionQuote = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  /* width: 50%; */
  flex: 2;
  max-height: 400px;
  bottom: 0;
  /* border: black 2px solid; */
  min-width: 300px;
  margin-right: 20px;

  @media screen and (min-width: 600px) and (max-width: 1154px) {
    align-items: center;
  }

  @media screen and (max-width: 600px) {
    /* justify-content: flex-start; */
  }
`;

export const SectionQuoteTitle = styled.h3`
  font-size: 45px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

  span {
    display: inline-block;
    font-weight: normal;
    font-size: 20px;
  }

  @media screen and (min-width: 600px) and (max-width: 1154px) {
    font-size: 40px;
  }

  @media screen and (max-width: 600px) {
    margin-top: -5px;
  }
`;

const SectionQuoteContent = styled.p`
  font-family: "Oregano", cursive;
  font-size: 24px;
  /* border: black 2px solid; */
  max-height: 40%;
  overflow-y: auto;

  @media screen and (min-width: 600px) and (max-width: 1154px) {
    text-align: center;
    width: 60%;
    font-size: 20px;
    margin-top: -20px;
  }

  @media screen and (max-width: 600px) {
  }
`;

const SectionQuoteAnime = styled.span`
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  color: orangered;
  font-size: 15px;
  margin-top: -50px;
  margin-bottom: 40px;
`;

// SECTION IMAGE
const PictureBox = styled.div`
  border-radius: 50px;
  object-position: center;
  object-fit: cover;
  overflow: hidden;
  height: 100%;
  width: auto;
  /* border: red 2px solid; */

  @media screen and (min-width: 600px) and (max-width: 1154px) {
    /* min-height: 500px; */
  }

  @media screen and (max-width: 600px) {
    /* width: 400px;
    height: 400px; */
    margin-top: 50px;
  }
`;

// SECTION PAGE
const PageManager = styled.nav`
  display: flex;
  justify-content: space-between;
  margin: 40px auto;
  width: 40%;
  /* min-width: 700px; */
  /* padding: 0 200px; */
  font-family: "Rubik", sans-serif;
  /* border: black 2px solid; */

  @media screen and (min-width: 600px) and (max-width: 1154px) {
  }

  @media screen and (max-width: 600px) {
  }
`;

const PageButton = styled.button`
  background-color: orange;
  padding: 10px 10px;
  border: none;
  border-radius: 10px;
  font-family: inherit;
  cursor: pointer;
  height: 40px;
  color: whitesmoke;

  :active {
    background-color: orangered;
  }

  @media screen and (min-width: 600px) and (max-width: 1154px) {
    height: 30px;
    padding: 0;
    width: 30px;
  }

  @media screen and (max-width: 600px) {
    height: 40px;
    padding: 6px;
    width: 30px;
  }
`;

interface Datas {
  isDatas: boolean;
  charactersDatas: { numberOfQuotesFound: number; quotesFound: QuoteObject[] };
  searchedString: string;
  parseDirs: PicturesObject[];
}

function getRandomImage(
  listOfFolders: PicturesObject[],
  searchedTerm: string,
  previousValue?: string
): string {
  let pathToImageOfSearchedTerm: string = "";
  // do {
  for (const Folder of listOfFolders) {
    let randomIndex: number;
    randomIndex = Math.round(
      Math.random() * Folder.numberOfPicturesAvailable - 1
    );

    if (
      Folder.name === searchedTerm ||
      Folder.name.includes(searchedTerm.toLowerCase())
    ) {
      pathToImageOfSearchedTerm = `/ressources/images/${Folder.name}/${
        Folder.name
      }${randomIndex < 0 ? "0" : randomIndex}.png`;
      break;
    } else {
      pathToImageOfSearchedTerm = `/ressources/images/generics/${
        randomIndex < 0 ? "0" : randomIndex
      }.png`;
    }
  }
  // } while (pathToImageOfSearchedTerm === previousValue);

  // console.log("PV", previousValue);
  // console.log("Path", pathToImageOfSearchedTerm);

  return pathToImageOfSearchedTerm;
}

const CharactersQuotes = (props: Datas) => {
  const { isDatas, charactersDatas, searchedString, parseDirs } = props;
  const [page, setPage] = useState<number>(1);
  const [previousImagePath, setPreviousImagePath] = useState<string>("");

  // console.log("PROPS", props);

  const pictureOfQuote = getRandomImage(
    parseDirs,
    searchedString,
    previousImagePath
  );

  useEffect(() => {
    setPage(1);
  }, [searchedString]);

  return (
    <Layout>
      <Head>
        <title>
          NaruQuotes: Generate random citations now ! -{" "}
          {isDatas && charactersDatas?.quotesFound[page - 1]?.character}
        </title>
      </Head>
      <MainContainer>
        {isDatas && charactersDatas.quotesFound ? (
          <SectionQuote>
            <SectionQuoteTitle>
              <span>
                {
                  charactersDatas?.quotesFound[page - 1]?.character.split(
                    " "
                  )[1]
                }
              </span>{" "}
              {charactersDatas?.quotesFound[page - 1]?.character.split(" ")[0]}
            </SectionQuoteTitle>
            <SectionQuoteAnime>
              ({charactersDatas?.quotesFound[page - 1]?.anime})
            </SectionQuoteAnime>

            <SectionQuoteContent>
              &quot;
              {charactersDatas?.quotesFound[page - 1]?.quote}
              &quot;
            </SectionQuoteContent>
          </SectionQuote>
        ) : (
          <SectionQuoteTitle>
            {" "}
            <span>
              Sorry, no quotes found from <strong>{searchedString}</strong> 🤷‍♂️{" "}
            </span>
          </SectionQuoteTitle>
        )}

        {isDatas && (
          <PictureBox>
            <Image
              src={pictureOfQuote}
              alt={searchedString}
              width={400}
              height={400}
              objectFit="cover"
              objectPosition="center"
              priority
            />
          </PictureBox>
        )}
      </MainContainer>

      {charactersDatas.numberOfQuotesFound > 1 && (
        <PageManager>
          <PageButton
            onClick={() => {
              page > 1 && setPage((page) => page - 1);
            }}
          >
            <FontAwesomeIcon size={"lg"} icon={faCircleLeft} />
          </PageButton>
          <p>
            {page} sur {charactersDatas.numberOfQuotesFound}{" "}
          </p>
          <PageButton
            onClick={() => {
              page < charactersDatas.numberOfQuotesFound &&
                setPage((page) => page + 1);
            }}
          >
            <FontAwesomeIcon size={"lg"} icon={faCircleRight} />
          </PageButton>
        </PageManager>
      )}
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  const { params } = context;
  const character = params.characterId;
  const parseDirs: PicturesObject[] = [];

  // this func is Not Working w/ Nextjs so far

  // async function findSalesFind(folderName: string): Promise<any> {
  //   const storesFiles = await fs.readdir(folderName, { withFileTypes: true });

  //   for await (const File of storesFiles) {
  //     const pictureFolderInfos = {
  //       name: File.name,
  //       numberOfPicturesAvailable: 0,
  //     };
  //     if (!File.isDirectory()) {
  //       let index = parseDirs.length - 1;

  //       if (parseDirs?.length === 0) {
  //         await parseDirs.push(pictureFolderInfos);
  //         parseDirs[0].numberOfPicturesAvailable += 1;
  //       } else parseDirs[index].numberOfPicturesAvailable += 1;
  //     } else {
  //       await parseDirs.push(pictureFolderInfos);
  //       await findSalesFind(`${folderName}/${File.name}`);
  //     }
  //   }

  //   return parseDirs;
  // }

  // await findSalesFind("public/ressources/images");
  // console.log(parseDirs);

  return fetch(
    `https://animechan.vercel.app/api/quotes/character?name=${character}`
  )
    .then((response) => {
      return response.json();
    })
    .then((datas) => {
      if (datas.error) {
        return {
          props: {
            isDatas: false,
            charactersDatas: [],
            searchedString: character,
            parseDirs,
          },
        };
      } else {
        let selectedQuotes: {
          numberOfQuotesFound: number;
          quotesFound: QuoteObject[];
        } = {
          numberOfQuotesFound: 0,
          quotesFound: [],
        };

        datas.forEach((quote: QuoteObject) => {
          if (quote.anime.toLowerCase().includes("naruto")) {
            selectedQuotes.numberOfQuotesFound += 1;
            selectedQuotes.quotesFound.push(quote);
          }
        });

        return {
          props: {
            isDatas: selectedQuotes.numberOfQuotesFound < 1 ? false : true,
            charactersDatas: selectedQuotes,
            searchedString: character,
            parseDirs: [
              { name: "generics", numberOfPicturesAvailable: 7 },
              { name: "itachi", numberOfPicturesAvailable: 4 },
              { name: "kakashi", numberOfPicturesAvailable: 4 },
              { name: "naruto", numberOfPicturesAvailable: 5 },
              { name: "obito", numberOfPicturesAvailable: 5 },
              { name: "pain", numberOfPicturesAvailable: 4 },
              { name: "sasuke", numberOfPicturesAvailable: 6 },
            ],
          },
        };
      }
    })
    .catch((e) => {
      console.log(e.message);
      return { notFound: true };
    });
};

export default CharactersQuotes;
