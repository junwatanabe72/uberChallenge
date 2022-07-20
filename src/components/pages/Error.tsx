import React from "react";
import CenterStack from "../atoms/CenterStack";

interface Props {
  errorNumber?: number;
}

const ErrorPage: React.FC<Props> = ({ errorNumber }) => {
  return (
    <CenterStack>
      <h2>{errorNumber} Error</h2>
    </CenterStack>
  );
};
export default ErrorPage;
