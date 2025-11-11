import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & {
  width?: number;
  height?: number;
};

const SvgIcMenubar = ({
  width = 24,
  height = 24,
  ...props
}: Props): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 77 77"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M64.167 19.25q1.363 0 2.284.924t.924 2.284-.924 2.285-2.284.924H12.833q-1.363 0-2.287-.924t-.921-2.285.924-2.287 2.284-.921zm0 16.042q1.363 0 2.284.924t.924 2.284-.924 2.284-2.284.924H12.833q-1.363 0-2.287-.924T9.625 38.5t.924-2.288 2.284-.92zm0 16.041q1.363 0 2.284.924t.924 2.285-.924 2.284-2.284.924H12.833q-1.363 0-2.287-.924t-.921-2.284.924-2.288 2.284-.92z"
    />
  </svg>
);

export default SvgIcMenubar;
