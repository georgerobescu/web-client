import "./broker-card.scss";

import classnames from "classnames";
import { ProgramTag } from "gv-api-web";
import * as React from "react";
import SelectedMark from "shared/components/selected-mark/selected-mark";
import TagBrokerContainer from "shared/components/tags/tag-broker-container/tag-broker-container";
import filesService from "shared/services/file-service";

import BrokerCardAdornment from "./broker-card-adornment";
import { BROKER_CARD_EXTRA_STATE } from "./broker-card.constants";
import { slugBrokerName } from "./broker-card.helpers";

const _BrokerCard: React.FC<Props> = ({
  logo,
  brokerName,
  onSelect,
  isSelected,
  cardState,
  tags
}) => {
  const isActive = [
    BROKER_CARD_EXTRA_STATE.NONE,
    BROKER_CARD_EXTRA_STATE.KYC_REQUIRED
  ].includes(cardState);
  const className = classnames("broker-card", {
    "broker-card--clickable": !!onSelect,
    "broker-card--active": isActive,
    "broker-card--inactive": !isActive
  });
  let logoClassName = classnames(
    "broker-card__logo",
    "broker-card__logo--" + slugBrokerName(brokerName)
  );

  return (
    <div
      className={className}
      onClick={isActive ? onSelect && onSelect(brokerName) : undefined}
    >
      {isSelected && (
        <div className="broker-card__selected-mark">
          <SelectedMark selected />
        </div>
      )}
      <BrokerCardAdornment
        condition={cardState !== BROKER_CARD_EXTRA_STATE.NONE}
        cardState={cardState}
      />
      <img
        className={logoClassName}
        src={filesService.getFileUrl(logo)}
        alt={brokerName}
      />
      {tags && (
        <TagBrokerContainer
          tags={tags}
          condition={tags.length !== 0}
          className="broker-card__tags"
        />
      )}
    </div>
  );
};

const BrokerCard = React.memo(_BrokerCard);
export default BrokerCard;

interface Props {
  logo: string;
  brokerName: string;
  onSelect?(brokerName: string): () => void;
  cardState: BROKER_CARD_EXTRA_STATE;
  tags?: ProgramTag[];
  isSelected?: boolean;
}
