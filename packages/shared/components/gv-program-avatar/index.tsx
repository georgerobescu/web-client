import "./style.scss";

import classNames from "classnames";
import React from "react";
import ImageBase from "shared/components/avatar/image-base";
import GVColors from "shared/components/gv-styles/gv-colors";
import PieContainer from "shared/components/pie-container/pie-container";

import GVProgramDefaultAvatar from "./gv-propgram-default-avatar";

const _GVProgramAvatar: React.FC<GVProgramAvatarProps> = ({
  url,
  alt,
  level,
  levelProgress = 0,
  size = "small",
  className,
  color,
  imageClassName,
  levelClassName,
  onMouseOverLevel,
  onMouseEnterLevel,
  onMouseLeaveLevel,
  onClickLevel
}) => (
  <div
    className={classNames("program-avatar", className, {
      "program-avatar--small": size === "small",
      "program-avatar--medium": size === "medium",
      "program-avatar--big": size === "big"
    })}
  >
    <ImageBase
      DefaultImageComponent={GVProgramDefaultAvatar}
      url={url}
      color={color}
      imageClassName={classNames("program-avatar__image", imageClassName)}
      alt={alt}
    />
    {level !== undefined && (
      <div
        onMouseOver={onMouseOverLevel}
        onMouseEnter={onMouseEnterLevel}
        onMouseLeave={onMouseLeaveLevel}
        onClick={onClickLevel}
        className={"program-avatar__level"}
      >
        <PieContainer
          color={(GVColors as any)[`$levelColor${level}`]}
          label={String(level)}
          value={levelProgress}
        />
      </div>
    )}
  </div>
);

export interface GVProgramAvatarProps {
  url?: string;
  alt: string;
  level?: number;
  levelProgress?: number;
  size?: "small" | "medium" | "big";
  className?: string;
  color?: string;
  imageClassName?: string;
  levelClassName?: string;
  onMouseOverLevel?: (e: any) => void;
  onMouseEnterLevel?: (e: any) => void;
  onMouseLeaveLevel?: (e: any) => void;
  onClickLevel?: (e: any) => void;
}

const GVProgramAvatar = React.memo(_GVProgramAvatar);
export default GVProgramAvatar;
