import { useState } from "react";
import styled from "styled-components";
import { QuoteObject } from "../api/hello";
import SearchBar from "../../Components/SearchBar";
import Image from "next/image";
import * as fs from "fs/promises";

interface Datas {
  isDatas: boolean;
  charactersDatas: { numberOfQuotesFound: number; quotesFound: QuoteObject[] };
  searchedString: string;
  parseDirs: PicturesObject[];
}

function getRandomImage(
  listOfFolders: PicturesObject[],
  searchedTerm: string
): string {
  let pathToImageOfSearchedTerm: string = "";
  for (const Folder of listOfFolders) {
    let randomIndex = Math.round(
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

  return pathToImageOfSearchedTerm;
}

const CharactersQuotes = (props: Datas) => {
  const { isDatas, charactersDatas, searchedString, parseDirs } = props;
  const [page, setPage] = useState<number>(1);

  console.log("PD", parseDirs);

  const pictureOfQuote = getRandomImage(parseDirs, searchedString);

  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 20px;
    border: black 2px solid;
  `;

  const PictureBox = styled.div`
    border: black 2px solid;
    border-radius: 10px;
    object-position: center;
    object-fit: cover;
    overflow: hidden;
    width: 400px;
    height: 400px;
  `;

  return (
    <Container>
      <SearchBar />
      <h1>
        {searchedString[0].toUpperCase() +
          searchedString.split("").splice(1).join("")}
        &apos;s quotes
      </h1>

      {isDatas && charactersDatas.quotesFound ? (
        <div>
          <h3>{charactersDatas?.quotesFound[page - 1]?.character}</h3>
          <p>{charactersDatas?.quotesFound[page - 1]?.anime}</p>
          <p> {charactersDatas?.quotesFound[page - 1]?.quote}</p>
        </div>
      ) : (
        <p>No datas for this choice</p>
      )}

      <PictureBox>
        <Image
          src={pictureOfQuote}
          alt={searchedString}
          width={400}
          height={400}
          objectFit="cover"
          objectPosition="center"
          // layout="responsive"
        />
      </PictureBox>

      {/* AFFICHER SEUELEMENT SI UN PERSONNAGE EST TROUVE */}
      {/* !!!!!!!!!! */}
      <button
        onClick={() => {
          page > 1 && setPage((page) => page - 1);
        }}
      >
        Page précédente
      </button>
      <p>
        Page {page} sur {charactersDatas.numberOfQuotesFound}{" "}
      </p>
      <button
        onClick={() => {
          page < charactersDatas.numberOfQuotesFound &&
            setPage((page) => page + 1);
        }}
      >
        Page suivante
      </button>
    </Container>
  );
};

type PicturesObject = { name: string; numberOfPicturesAvailable: number };

export const getServerSideProps = async (context: any) => {
  const { params } = context;
  const character = params.characterId;
  const parseDirs: PicturesObject[] = [];

  async function findSalesFind(folderName: string): Promise<any> {
    const storesFiles = await fs.readdir(folderName, { withFileTypes: true });

    for await (const File of storesFiles) {
      const pictureFolderInfos = {
        name: File.name,
        numberOfPicturesAvailable: 0,
      };
      // console.log("FILE", File);
      if (!File.isDirectory()) {
        let index = parseDirs.length - 1;

        if (parseDirs?.length === 0) {
          await parseDirs.push(pictureFolderInfos);
          parseDirs[0].numberOfPicturesAvailable += 1;
        } else parseDirs[index].numberOfPicturesAvailable += 1;
      } else {
        await parseDirs.push(pictureFolderInfos);
        await findSalesFind(`${folderName}/${File.name}`);
      }
    }

    return parseDirs;
  }

  await findSalesFind("public/ressources/images");
  console.log("PD", parseDirs);

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
            isDatas: true,
            charactersDatas: selectedQuotes,
            searchedString: character,
            parseDirs,
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
