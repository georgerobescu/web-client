import "./style.scss";

import classnames from "classnames";
import React from "react";

export interface GVTabProps {
  label: React.ReactNode;
  value: string;
  count?: number;
  selected?: boolean;
  visible?: boolean;
  className?: string;
  countClassName?: string;
  onChange?: (e: React.SyntheticEvent<EventTarget>, value: string) => void;
  onClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

const GVTab: React.SFC<GVTabProps> = ({
  label,
  value,
  count,
  selected,
  visible = true,
  className,
  countClassName,
  onChange,
  onClick
}) => {
  const handleChange = (e: React.SyntheticEvent<EventTarget>) => {
    if (onChange) {
      onChange(e, value);
    }
    if (onClick) {
      onClick(e);
    }
  };

  const renderCount = () => {
    if (count === undefined) return null;
    return (
      <span className={classnames(countClassName, "gv-tab__count")}>
        {count}
      </span>
    );
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className={classnames(className, "gv-tab", {
        "gv-tab--active": selected
      })}
      onClick={handleChange}
    >
      {label}
      {renderCount()}
    </div>
  );
};

GVTab.defaultProps = {
  visible: true
};

export default GVTab;
