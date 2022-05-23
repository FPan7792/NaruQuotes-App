import styled from "styled-components";
import { QuoteObject } from "../api/hello";
import SearchBar from "../../Components/SearchBar";

interface Datas {
  isDatas: boolean;
  charactersDatas: QuoteObject[];
  searchedString: string;
  quotesFound: number;
}

const CharactersQuotes = (props: Datas) => {
  const { isDatas, charactersDatas, searchedString, quotesFound } = props;

  console.log("searched", props);

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

      {isDatas && quotesFound ? (
        charactersDatas?.map((item, index) => {
          if (item.anime.toLowerCase().includes("naruto")) {
            return (
              <QuoteContainer key={index}>
                <h3>{item.character}</h3>
                <p>{item.anime}</p>
                <p> {item.quote}</p>
              </QuoteContainer>
            );
          }
        })
      ) : (
        <p>No datas for this choice</p>
      )}

      {/* {props.charactersDatas[0].anime} */}
    </Container>
  );
};

export const getServerSideProps = async (context: any) => {
  // console.log(context);

  const character = context.params.characterId;

  console.log("charac", character);

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
        let quotesFound = 0;
        datas.forEach((quote: QuoteObject) => {
          if (quote.anime.toLowerCase().includes("naruto")) {
            quotesFound += 1;
          }
        });

        return {
          props: {
            isDatas: true,
            charactersDatas: datas,
            searchedString: character,
            quotesFound,
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
