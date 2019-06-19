import { SocialLinkViewModel } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Link } from "react-router-dom";
import SocialLinkImage from "shared/components/avatar/social-link/social-link";
import DetailsFavorite from "shared/components/details/details-description-section/details-description/controls/details-favorite";
import DetailsNotification from "shared/components/details/details-description-section/details-description/controls/details-notification";
import GVButton from "shared/components/gv-button";
import { composeManagerDetailsUrl } from "shared/utils/compose-url";

const _FundDetailsDescription: React.FC<Props> = ({
  t,
  assetDescription,
  AssetDetailsAvatar,
  AssetDetailsExtraBlock
}) => (
  <div className="program-details-description__main">
    <div className="program-details-description__avatar">
      <AssetDetailsAvatar />
    </div>
    <div className="program-details-description__info">
      <h1 className="title-small-padding">{assetDescription.title}</h1>
      <Link
        to={{
          pathname: composeManagerDetailsUrl(assetDescription.managerUrl),
          state: `/ ${assetDescription.title}`
        }}
      >
        <GVButton
          variant="text"
          className="program-details-description__author-btn"
        >
          {assetDescription.managerName}
        </GVButton>
      </Link>
      <div className="program-details-description__social-links">
        {assetDescription.managerSocialLinks.map(socialLink => (
          <a
            key={socialLink.type}
            href={socialLink.url + socialLink.value}
            target="_blank"
            rel="noopener noreferrer"
            className="program-details-description__social-link"
          >
            <SocialLinkImage url={socialLink.logo} alt={socialLink.name} />
          </a>
        ))}
      </div>
      <AssetDetailsExtraBlock />
      <h4 className="program-details-description__subheading">
        {t("program-details-page.description.strategy")}
      </h4>
      <div className="program-details-description__text">
        {assetDescription.description}
      </div>
    </div>
    <div className="program-details-description__settings">
      <DetailsFavorite
        id={assetDescription.id}
        isFavorite={assetDescription.isFavorite}
      />
      <DetailsNotification
        title={assetDescription.title}
        url={assetDescription.notificationsUrl}
        hasNotifications={assetDescription.hasNotifications}
      />
    </div>
  </div>
);

const FundDetailsDescription = translate()(React.memo(_FundDetailsDescription));
export default FundDetailsDescription;

type AssetDescription = {
  id: string;
  title: string;
  description: string;
  logo: string;
  notificationsUrl: string;
  isFavorite: boolean;
  hasNotifications: boolean;
  managerUrl: string;
  managerName: string;
  managerSocialLinks: SocialLinkViewModel[];
};

interface OwnProps {
  AssetDetailsAvatar: React.ComponentType<any>;
  AssetDetailsExtraBlock: React.ComponentType<any>;
  assetDescription: AssetDescription;
}

interface Props extends OwnProps, InjectedTranslateProps {}
