import { useRef, useState } from "react";
import styled from "styled-components";
// import { useGetCharacterQuote } from "../pages/api/hello";
import { useRouter } from "next/router";

export const SearchBar: React.FunctionComponent = () => {
  const characterRef: any = useRef(null);

  const router = useRouter();

  const SearchInput = styled.input.attrs((props) => ({
    type: "text",
    placeholder: "...",
  }))`
    height: 50px;
    border: black 2px solid;
    border-radius: 20px;
  `;

  const ValidInput = styled.button`
    padding: 15px;
    border: black 2px solid;
    border-radius: 20px;
    cursor: pointer;
  `;
  const handleRefValue = () => {
    // const searchedValue = characterRef.current.value;

    console.log(characterRef.current.value);
    // fetch(
    //   `https://animechan.vercel.app/api/quotes/character?name=${characterRef.current.value}`
    // )
    //   .then((response) => response.json())
    //   .then((datas) => {
    //     console.log(datas);

    router.replace(`${characterRef.current.value}`);
    //   });
  };

  return (
    <div>
      <SearchInput ref={characterRef}></SearchInput>
      <ValidInput onClick={handleRefValue}>Search</ValidInput>
    </div>
  );
};
export default SearchBar;
