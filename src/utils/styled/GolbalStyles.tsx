import { Global, css } from "@emotion/react";

const global = () => css`
  html {
    font-family: "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma,
      Sans-Serif;
    line-height: 1.5;
    color: black;
    font-weight: 400;
  }
  body {
    padding: 0;
    margin: 0;
  }
  h1 {
    padding: 0;
    margin: 0;
  }
  h2 {
    padding: 0;
    margin: 0;
  }
  h3 {
    padding: 0;
    margin: 0;
  }
  h4 {
    padding: 0;
    margin: 0;
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
    color: red;
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
