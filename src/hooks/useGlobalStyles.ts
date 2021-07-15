import { createUseStyles } from "react-jss";

import defaults from "src/styles/defaults";
import layout from "src/styles/layout";
import { Theme } from "src/types/styles";

const classes = (theme: Theme) => ({
  "@global": {
    ...layout,
    ...defaults(theme),
  },
});

export default createUseStyles(classes);
