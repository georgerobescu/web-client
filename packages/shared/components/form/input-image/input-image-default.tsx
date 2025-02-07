import * as React from "react";
import ImageBase from "shared/components/avatar/image-base";

const InputImageDefault: React.FC<Props> = ({ src = "", defaultImage }) => {
  return (
    <ImageBase
      alt="Default Profile Avatar"
      defaultImage={defaultImage}
      url={src}
    />
  );
};

export default React.memo(InputImageDefault);

interface Props {
  src?: string;
  defaultImage: string;
}
