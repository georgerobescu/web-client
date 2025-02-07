import * as React from "react";
import { Icon, IIconProps } from "shared/components/icon/icon";

export const DetailsIcon: React.FC<IIconProps> = props => (
  <Icon type={"details"} {...props}>
    <svg
      width="12"
      height="14"
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="1">
        <rect
          width="10"
          height="13"
          fill="black"
          fillOpacity="0"
          transform="translate(1 1)"
        />
        <path
          d="M5.96615 5.66667C7.25481 5.66667 8.29948 4.622 8.29948 3.33333C8.29948 2.04467 7.25481 1 5.96615 1C4.67748 1 3.63281 2.04467 3.63281 3.33333C3.63281 4.622 4.67748 5.66667 5.96615 5.66667Z"
          stroke="white"
          strokeWidth="1.5"
        />
        <path
          d="M1.54688 13.6062V11.8397C1.54688 9.9033 3.75784 8.3335 5.9688 8.3335C8.17977 8.3335 10.3907 9.9033 10.3907 11.8397V13.6062"
          stroke="white"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  </Icon>
);
