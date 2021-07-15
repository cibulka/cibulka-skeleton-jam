import { CSSProperties } from "react";

export interface Keyframes {
  [keyframe: string]: CSSProperties;
}

export interface Theme {
  colors: {
    [key: string]: Record<string, string>;
  };
  screens: {
    [name: string]: number | undefined;
  };
}

export interface Styles {
  [selector: string]: CSSProperties | Styles;
}
