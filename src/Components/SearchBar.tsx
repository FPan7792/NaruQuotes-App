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
    console.log(characterRef.current.value);

    characterRef.current.value &&
      router.replace(`${characterRef.current.value.split(" ").join("")}`);
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
