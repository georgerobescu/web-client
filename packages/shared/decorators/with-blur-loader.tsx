import * as React from "react";
import { BlurContainer } from "shared/components/blur-container/blur-container";

export interface WithBlurLoaderProps<T> {
  className?: string;
  loaderData: T;
}

export const withBlurLoader = <T, U extends { data?: T }>(
  Component: React.ComponentType<U>
): React.ComponentType<WithBlurLoaderProps<T> & U> => ({
  data,
  loaderData,
  className,
  ...other
}) => (
  <BlurContainer blur={!data} className={className}>
    <Component {...other as U} data={data ? data : loaderData} />
  </BlurContainer>
);