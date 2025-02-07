import * as React from "react";
import { Icon, IIconProps } from "shared/components/icon/icon";

export const DashboardIcon: React.FC<IIconProps> = props => (
  <Icon type={"dashboard"} {...props}>
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.0628 3.52881L14.5859 5.54808"
        stroke="#15BBAF"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M14.5878 16.4173L16.0572 18.4284C18.3424 16.7536 19.8192 14.0405 19.8192 10.9912C19.8192 5.90698 15.6981 1.78662 10.6147 1.78662C5.53052 1.78662 1.41016 5.90698 1.41016 10.9912C1.41016 14.0405 2.88616 16.7536 5.17134 18.4284L10.6147 10.983"
        stroke="#15BBAF"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M5.16406 3.52881L6.72761 5.54808"
        stroke="#15BBAF"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M17.1211 10.9829H19.6116"
        stroke="#15BBAF"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M1.61328 10.9829H4.44092"
        stroke="#15BBAF"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  </Icon>
);
