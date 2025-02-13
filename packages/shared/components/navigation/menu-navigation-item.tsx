import * as React from "react";
import { useTranslation } from "react-i18next";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import FilterArrowIcon from "shared/components/table/components/filtering/filter-arrow-icon";
import useAnchor from "shared/hooks/anchor.hook";
import { TMenuItem } from "shared/routes/menu";

import NavigationItem from "./navigation-item";

const _MenuNavigationItem: React.FC<Props> = ({
  item: { Icon, route, label, children },
  popover
}) => {
  const [t] = useTranslation();
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const renderNavigationItem = ({ Icon, route, label }: TMenuItem) => (
    <NavigationItem
      icon={<Icon primary />}
      href={route}
      onClick={clearAnchor}
      key={label}
    >
      {label && t(label)}
    </NavigationItem>
  );
  const havePopover = !!children && popover;
  const haveSecondLevel = !!children && !popover;
  return (
    <>
      <NavigationItem icon={<Icon primary />} href={route} onClick={setAnchor}>
        {label && t(label)}
        {havePopover && <FilterArrowIcon isOpen={!!anchor} />}
      </NavigationItem>
      {havePopover && (
        <Popover
          className="navigation__popover"
          vertical={VERTICAL_POPOVER_POS.BOTTOM}
          fixedVertical
          anchorEl={anchor}
          onClose={clearAnchor}
          horizontal={HORIZONTAL_POPOVER_POS.CENTER}
          noPadding
        >
          {children!.map(renderNavigationItem)}
        </Popover>
      )}
      {haveSecondLevel && (
        <div className="navigation__second-level">
          {children!.map(renderNavigationItem)}
        </div>
      )}
    </>
  );
};

interface Props {
  popover?: boolean;
  item: TMenuItem;
}

export const MenuNavigationItem = React.memo(_MenuNavigationItem);
