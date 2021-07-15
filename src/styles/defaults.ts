import { Styles, Theme } from "src/types/styles";

const classes = (theme: Theme): Styles => ({
  svg: {
    display: "flex",
    fill: "currentColor",
  },
  "a:focus, a:active, button:focus, button:active": {
    outline: `dotted 2px ${theme.colors.blue.DEFAULT}`,
    outlineOffset: "0.25em",
  },
  "input:focus, input:active": {
    outline: "dotted 1px",
    outlineOffset: "0.25em",
  },
  "button[disabled]": {
    cursor: "not-allowed",
  },

  // Debug classes
  ".red": { background: "red !important" },
  ".blue": { background: "blue !important" },
  ".green": { background: "green !important" },
});

export default classes;
