import React, { CSSProperties, FC, useMemo } from "react";

import selection from "src/icons/selection.json";

const Icon: FC<{
  className?: string;
  icon: string;
  style?: CSSProperties;
  title?: string;
}> = (props) => {
  const iconProps = useMemo(() => {
    const result = selection.icons.find(
      (ip) => ip.properties && ip.properties.name === props.icon
    );
    if (result) return result;

    // eslint-disable-next-line no-console
    console.warn(`Icon: ${props.icon} not found.`);
    return undefined;
  }, [props.icon]);

  return (
    <svg
      className={[props.className || "w-4 h-4", !iconProps && "bg-red"]
        .filter(Boolean)
        .join(" ")}
      style={props.style}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
    >
      {props.title && <title>{props.title}</title>}
      {iconProps && iconProps.icon.paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
};

export default Icon;
