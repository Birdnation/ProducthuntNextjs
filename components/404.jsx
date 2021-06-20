import { css } from "@emotion/react";
import React from "react";

const Error404 = ({ mensaje }) => {
  return (
    <h1
      css={css`
        margin-top: 5rem;
        text-align: center;
      `}
    >
      {mensaje}
    </h1>
  );
};

export default Error404;
