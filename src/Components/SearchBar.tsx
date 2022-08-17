import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowsRotate,
  faArrowCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";

type VisibleManager = {
  visible: boolean;
};

const SearchBarContainer = styled.div`
  border-radius: 20px;
  /* border: red 2px solid; */
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
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
          border-radius: 10px;
          transition: 0.5s all ease;
          text-align: center;
          border: none;
          cursor: auto;
          display: none;

          :focus {
            border: none;
            outline-width: 0;
          }
        `;

      case false:
        return css`
          /* border: red 2px solid; */
          /* height: 100px; */
          border-radius: 10px;
          z-index: 1000;
          height: 35px;

          :focus {
            border: none;
            outline-width: 0;
          }
        `;
    }
  }}

  @media screen and (max-width: 900px) {
    ${(props: VisibleManager) => {
      switch (props.visible) {
        case true:
          return css`
            padding: 10px 30px;
          `;

        case false:
          return css`
            padding: 7px 20px;
          `;
      }
    }};
  }
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
          display: none;
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

  @media screen and (max-width: 900px) {
    ${(props: VisibleManager) => {
      switch (props.visible) {
        case true:
          return css`
            opacity: 0;
            transition: all ease 0.5s;
            padding: 10px;
            /* border: green 2px solid; */
            border-radius: 10px;
            cursor: pointer;
            z-index: 100;
          `;

        case false:
          return css`
            transition: all ease 0.5s;
            padding: 7px;
            /* height: 100%; */
            border-radius: 10px;
            cursor: pointer;
            z-index: 100;
          `;
      }
    }};
  }
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
          /* border: red 2px solid; */
        `;
    }
  }}
`;

const HiderButton = styled.p`
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
          padding: 5px 10px;
          border: none;
          cursor: pointer;
          font-size: 16px;
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

  @media screen and (max-width: 900px) {
    ${(props: VisibleManager) => {
      switch (props.visible) {
        case true:
          return css`
            padding: 2px 30px;
            font-size: 15px;

            :hover {
              color: orangered;
              transform: scale(1.05);
            }
            margin-left: 5px;
          `;

        case false:
          return css`
            padding: 5px 10px;
            font-size: 15px;

            :hover {
              color: orangered;
              transform: scale(1.05);
            }
            margin-left: 20px;
          `;
      }
    }};
  }

  @media screen and (max-width: 600px) {
    ${(props: VisibleManager) => {
      switch (props.visible) {
        case true:
          return css`
            padding: 5px 30px;
            font-size: 15px;
            /* border: yellow 2px solid; */

            :hover {
              color: orangered;
              transform: scale(1.05);
            }
            margin-left: 5px;
          `;

        case false:
          return css`
            margin-left: 20px;
          `;
      }
    }};
  }
`;

export const SearchBar: React.FunctionComponent = () => {
  const characterRef: any = useRef(null);
  const [hideBar, setHideBar] = useState(true);

  const isDesktopScreen = useMediaQuery({ query: "(min-width: 900px)" });
  const isTabletScreen = useMediaQuery({ query: "(min-width: 500px)" });
  const isMobileScreen = useMediaQuery({ query: "(max-width: 700px)" });

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
      {/* input */}
      <SearchInput
        visible={hideBar}
        ref={characterRef}
        onKeyDown={(e) => {
          e.key === "Enter" && handleRefValue();
        }}
      ></SearchInput>
      {/* BOUTN LOUPE */}
      <ValidInputButton visible={hideBar} onClick={handleRefValue}>
        <FontAwesomeIcon color="orange" icon={faSearch} />
      </ValidInputButton>

      {/*  BOUTON GENERATE */}

      <HiderButton onClick={() => setHideBar(false)} visible={hideBar}>
        {!isMobileScreen ? (
          "Generate quote"
        ) : (
          <>
            <FontAwesomeIcon icon={faArrowsRotate} color="white" />
          </>
        )}
      </HiderButton>
      <Celophane visible={hideBar} onClick={() => setHideBar(true)}></Celophane>
    </SearchBarContainer>
  );
};
export default SearchBar;
