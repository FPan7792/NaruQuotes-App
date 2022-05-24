import { useState } from "react";
import styled from "styled-components";
import { QuoteObject } from "../api/hello";
import SearchBar from "../../Components/SearchBar";

interface Datas {
  isDatas: boolean;
  charactersDatas: { numberOfQuotesFound: number; quotesFound: QuoteObject[] };
  searchedString: string;
  quotesFound: number;
}

const CharactersQuotes = (props: Datas) => {
  const { isDatas, charactersDatas, searchedString, quotesFound } = props;

  console.log("searched", props);

  console.log("render");

  const [page, setPage] = useState<number>(1);

  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 20px;
    border: black 2px solid;
  `;

  const QuoteContainer = styled.div`
    border: black 2px solid;
    border-radius: 20px;
    width: 100%;
  `;

  const Loading = styled.p`
    color: blue;
  `;
  const Error = styled.p`
    color: red;
  `;

  const Picture = styled.img`
    border: 2px solid black;
    border-radius: 20px;
    padding: 200px;
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
        // charactersDatas?.map((item, index) => {
        // if (item.anime.toLowerCase().includes("naruto")) {
        //   return (
        //     <QuoteContainer key={index}>
        //       <h3>{item.character}</h3>
        //       <p>{item.anime}</p>
        //       <p> {item.quote}</p>
        //     </QuoteContainer>
        //   );
        // }
        // }

        <QuoteContainer>
          <h3>{charactersDatas.quotesFound[page - 1].character}</h3>
          <p>{charactersDatas.quotesFound[page - 1].anime}</p>
          <p> {charactersDatas.quotesFound[page - 1].quote}</p>
        </QuoteContainer>
      ) : (
        <p>No datas for this choice</p>
      )}

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
      {/* {props.charactersDatas[0].anime} */}
    </Container>
  );
};

export const getServerSideProps = async (context: any) => {
  // console.log("CONTEXTE", context);
  const { req, res, params } = context;

  // res.setHeader(
  //   "Cache-Control",
  //   "public, s-maxage=10, stale-while-revalidate=59"
  // );

  const character = params.characterId;

  return fetch(
    `https://animechan.vercel.app/api/quotes/character?name=${character}`
  )
    .then((response) => {
      return response.json();
    })
    .then((datas) => {
      console.log("DATAS", datas);

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
