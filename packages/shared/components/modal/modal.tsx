import "./modal.scss";

import classNames from "classnames";
import React, { useCallback } from "react";
import EventListener from "react-event-listener";
import Portal from "shared/components/portal/portal";

const _Modal: React.FC<Props> = ({
  onClose,
  open,
  disableBackdropClick,
  transparentBackdrop,
  children,
  fixed
}) => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent & React.MouseEvent<HTMLElement>) =>
      event.keyCode === 27 && handleClose(event),
    [onClose]
  );

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLElement>): void => handleClose(event),
    [onClose]
  );

  const handleClose = useCallback(
    (event: React.MouseEvent<HTMLElement>): void => onClose && onClose(event),
    [onClose]
  );

  return (
    <Portal open={open}>
      <div
        className={classNames("modal", {
          "modal--position-absolute": !disableBackdropClick && !fixed,
          "modal--position-fixed": fixed
        })}
      >
        {disableBackdropClick || (
          <EventListener target={document} onKeyUp={handleKeyPress}>
            <div
              className={classNames("modal__backdrop", {
                "modal__backdrop--transparent": transparentBackdrop
              })}
              onClick={handleBackdropClick}
            />
          </EventListener>
        )}
        {children}
      </div>
    </Portal>
  );
};

interface Props {
  onClose?: (event: React.MouseEvent<HTMLElement>) => void;
  open: boolean;
  disableBackdropClick?: boolean;
  transparentBackdrop?: boolean;
  fixed?: boolean;
}

const Modal = React.memo(_Modal);
export default Modal;
