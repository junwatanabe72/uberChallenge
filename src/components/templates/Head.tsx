import React from "react";
import { Helmet } from "react-helmet-async";
import {
  appTitle,
  description,
  imagePath,
  siteUrl,
} from "../../utils/constant";

const Head: React.FC = () => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{appTitle}</title>
      <link rel="canonical" href="" />
      <meta property="og:title" content={appTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={imagePath} />
      <meta property="og:site_name" content={appTitle} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={appTitle} />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={appTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imagePath} />
      <link rel="canonical" href={siteUrl} />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </Helmet>
  );
};
export default Head;
