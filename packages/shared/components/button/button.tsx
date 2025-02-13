import "./button.css";

import classnames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

interface IButton {
  label: any;
  className: string;
  disabled: boolean;
  fullWidth: boolean;
  primary: boolean;
  secondary: boolean;
  onClick?(): any;
  href?: string;
  isExternal: boolean;
  icon?: any;
}
interface IGVLinkProps {
  className: string;
  isExternal: boolean;
  href: string;
}
const GVLink: React.FC<IGVLinkProps> = ({
  className,
  isExternal,
  children,
  href,
  ...other
}) => {
  const target = isExternal ? "_self" : "";
  return (
    <Link to={href} target={target} className={className} {...other}>
      {children}
    </Link>
  );
};

export default class Button extends React.PureComponent<IButton> {
  render() {
    const {
      label = null,
      className = "",
      disabled = false,
      primary = false,
      secondary = false,
      href,
      onClick,
      fullWidth = false,
      isExternal = false,
      icon = null,
      ...other
    } = this.props;
    const cn = classnames("gv-btn", className, {
      "gv-btn--full-width": fullWidth,
      "gv-btn--disabled": disabled,
      "gv-btn--primary": primary,
      "gv-btn--secondary": secondary
    });
    return href ? (
      <GVLink isExternal={isExternal} className={cn} href={href} {...other}>
        {label}
      </GVLink>
    ) : (
      <button
        disabled={disabled}
        className={cn}
        onClick={onClick}
        title={label}
        {...other}
      >
        {icon}
        {label}
      </button>
    );
  }
}
