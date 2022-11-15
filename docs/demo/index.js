import React from "react";
import { styled } from "@nextui-org/react";
import Iframe from "react-iframe";

const CodeSandBox = styled("div", {
  width: "100%",
  padding: "10px 0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",

  h1: {
    fontSize: "3em",
    fontFamily: "'Roboto',sans-serif",
    color: "$primary",
    padding: "20px",
  },

  div: {
    width: "100%",
    padding: "2px",
    ".sandbox": {
      width: "100%",
      border: "none",
      borderRadius: "8px",
      boxShadow: "$sm",
    },
  },
});

export function Demo(props) {
  return (
    <CodeSandBox>
      <div>
        <Iframe
          url={props.url}
          width="100%"
          height="700px"
          className="sandbox"
          id="myId"
          position="relative"
        />
      </div>
    </CodeSandBox>
  );
}
