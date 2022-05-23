import type { NextPage } from "next";
import styled from "styled-components";
import { useGetRandomQuote } from "../api/hello";
import SearchBar from "../../Components/SearchBar";

export const Quote: NextPage = () => {
  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 100px;
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

  const { list, isError, isLoading } = useGetRandomQuote();

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  // if (isError) {
  //   return
  //   <Error>Erreur</Error>;
  // }
  if (isError) {
    return (
      <Container>
        <SearchBar />
        <p>{"Ssauke Uchiwa"}</p>
        <p>{"TEST4"}</p>
        <Picture></Picture>
      </Container>
    );
  }

  if (list) {
    // console.log("LIST", list);

    const index = Math.floor(Math.random() * list.length);
    console.log("INDEX", index);
    return (
      <Container>
        <SearchBar />
        <p>{list[index].character}</p>
        <p>{list[index].quote}</p>
        <Picture></Picture>
      </Container>
    );
  }
  return <Container></Container>;
};
export default Quote;
