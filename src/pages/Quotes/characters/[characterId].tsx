import type { NextPage } from "next";
import styled from "styled-components";
import { QuoteObject } from "../../api/hello";

interface Datas {
  charactersDatas: QuoteObject[];
}

const CharactersQuotes = (props: Datas) => {
  const { charactersDatas } = props;

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
      {charactersDatas.map((item, index) => {
        if (item.anime.toLowerCase().includes("naruto")) {
          return (
            <QuoteContainer key={index}>
              <h3>{item.character}</h3>
              <p>{item.anime}</p>
              <p> {item.quote}</p>
            </QuoteContainer>
          );
        }
      })}

      {/* {props.charactersDatas[0].anime} */}
    </Container>
  );
};

export const getServerSideProps = async (context: any) => {
  // console.log(context);

  const character = context.params.characterId;

  // try {
  //   const response = fetch(`https://animechan.vercel.app/api/quotes/character?name=${character}`)

  //   // console.log(response.data);

  //   return { props: { recipes: response.data, diet: context.params.dietName } };
  // } catch (error) {
  //   return { notFound: true };
  // }
  return fetch(
    `https://animechan.vercel.app/api/quotes/character?name=${character}`
  )
    .then((response) => response.json())
    .then((datas) => {
      // console.log("DATAS", datas);
      return { props: { charactersDatas: datas } };
    })
    .catch((e) => {
      console.log(e.message);
      return { notFound: true };
    });
};

export default CharactersQuotes;
