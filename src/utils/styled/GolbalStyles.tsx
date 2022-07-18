import React from "react";
import { Global, css } from "@emotion/react";

const global = () => css`
  html {
    font-family: "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma,
      Sans-Serif;
    line-height: 1.5;
    color: black;
    font-weight: 400;
    text-transform: none;
  }
  body {
    padding: 0;
    margin: 0;
  }
  h1 {
    padding: 0;
    margin: 0;
    font-weight: 400;
  }
  h2 {
    padding: 0;
    margin: 0;
    font-weight: 400;
  }
  h3 {
    padding: 0;
    margin: 0;
    font-weight: 400;
  }
  h4 {
    padding: 0;
    margin: 0;
    font-weight: 400;
  }
  ul {
    padding: 0;
    margin: 0;
  }
  iframe {
    padding: 0;
    margin: 0;
  }
  li {
    list-style-type: none;
  }
  img {
    vertical-align: top;
  }
  a {
    text-decoration: none;
    color: black;
  }
  textarea {
    min-height: 150px;
  }
  a:visited {
    color: none;
  }
`;
const GlobalStyles: React.FC = () => {
  return <Global styles={global} />;
};

export default GlobalStyles;
