import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type VisibleManager = {
  visible: boolean;
};

const SearchBarContainer = styled.div`
  border-radius: 20px;
`;

const SearchInput = styled.input.attrs(() => ({
  type: "text",
  placeholder: "Which character ?",
}))`
  ${(props: VisibleManager) => {
    switch (props.visible) {
      case true:
        return css`
          opacity: 0;
          z-index: -1000;

          font-family: "Rubik", sans-serif;
          height: 100%;
          padding: 10px 30px;
          /* border: black 2px solid; */
          border-radius: 10px;
          transition: 0.5s all ease;

          text-align: center;
          border: none;
          cursor: auto;

          :focus {
            border: none;
            outline-width: 0;
          }
        `;

      case false:
        return css`
          z-index: -1000;
          font-family: "Rubik", sans-serif;
          height: 100%;
          padding: 10px 30px;
          /* border: black 2px solid; */
          border-radius: 10px;
          transition: 0.5s all ease;

          text-align: center;
          border: none;

          :focus {
            border: none;
            outline-width: 0;
          }
        `;
    }
  }}
`;

const ValidInputButton = styled.button`
  ${(props: VisibleManager) => {
    switch (props.visible) {
      case true:
        return css`
          opacity: 0;
          transition: all ease 0.5s;
          padding: 10px;
          border: black 2px solid;
          border-radius: 10px;
          cursor: pointer;
          z-index: 100;
        `;

      case false:
        return css`
          transition: all ease 0.5s;
          padding: 10px;
          border: black 2px solid;
          border-radius: 10px;
          cursor: pointer;
          z-index: 100;
        `;
    }
  }}
`;

const Celophane = styled.div`
  ${(props: VisibleManager) => {
    switch (props.visible) {
      case true:
        return css``;

      case false:
        return css`
          position: absolute;
          left: 0;
          bottom: 0;
          z-index: 50;
          background-color: transparent;
          height: 90%;
          width: 100%;
        `;
    }
  }}
`;

const HiderButton = styled.button`
  ${(props: VisibleManager) => {
    switch (props.visible) {
      case true:
        return css`
          padding: 5px 60px;
          border: none;
          cursor: pointer;
          font-size: 18px;
          background-color: orange;
          border-radius: 10px;
          font-family: "Rubik", sans-serif;
          font-weight: bold;
          transition: all 0.3s ease;
          color: whitesmoke;
          transition: all ease 0.5s;

          :hover {
            color: orangered;
            transform: scale(1.05);
          }
          margin-left: 5px;
        `;

      case false:
        return css`
          /* z-index: -100;
          opacity: 0; */
          padding: 5px 60px;
          border: none;
          cursor: pointer;
          font-size: 18px;
          background-color: orange;
          border-radius: 10px;
          font-family: "Rubik", sans-serif;
          font-weight: bold;
          color: orangered;
          transition: all ease 0.4s;

          :hover {
            color: orangered;
            transform: scale(1.05);
          }
          margin-left: 20px;
        `;
    }
  }};
`;

export const SearchBar: React.FunctionComponent = () => {
  const characterRef: any = useRef(null);
  const [hideBar, setHideBar] = useState(true);

  const router = useRouter();
  const handleRefValue = () => {
    console.log(characterRef.current.value);

    if (characterRef.current.value) {
      router.push(`/quotes/${characterRef.current.value.split(" ").join("")}`);
    } else {
      router.push(`/quotes/quotes`);
    }
  };

  useEffect(() => {}, [hideBar]);

  return (
    <SearchBarContainer>
      <SearchInput visible={hideBar} ref={characterRef}></SearchInput>
      <ValidInputButton visible={hideBar} onClick={handleRefValue}>
        <FontAwesomeIcon color="orange" icon={faSearch} />
      </ValidInputButton>
      <HiderButton onClick={() => setHideBar(false)} visible={hideBar}>
        Generate quote
      </HiderButton>
      <Celophane visible={hideBar} onClick={() => setHideBar(true)}></Celophane>
    </SearchBarContainer>
  );
};
export default SearchBar;
