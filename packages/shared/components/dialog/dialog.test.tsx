import { mount, shallow } from "enzyme";
import * as React from "react";

import _Dialog from "./dialog";

jest.mock("react-i18next", () => {
  return {
    useTranslation: () => ({
      t: (string: string) => string
    })
  };
});

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
document.body.append(modalRoot);

const handleClick = jest.fn();
const children = <span className="test-children">Any</span>;

describe("Dialog tests", () => {
  test("should render dialog", () => {
    const component = shallow(
      <_Dialog open onClose={handleClick}>
        {children}
      </_Dialog>
    );
    expect(component.find(".dialog")).toHaveLength(1);
    expect(component.find(".test-children")).toHaveLength(1);
  });
  test("should set custom class", () => {
    const anyClass = "any-class";
    const component = shallow(
      <_Dialog className={anyClass} open onClose={handleClick}>
        {children}
      </_Dialog>
    );
    expect(component.find(`.${anyClass}`)).toHaveLength(1);
  });
  test("should call click backdrop", () => {
    const handleClick = jest.fn();
    const component = mount(
      <_Dialog open onClose={handleClick}>
        {children}
      </_Dialog>
    );
    component.find(".dialog-wrapper").simulate("click");
    expect(handleClick).toBeCalled();
  });
  test("should call click close inside button", () => {
    const handleClick = jest.fn();
    const component = shallow(
      <_Dialog open onClose={handleClick}>
        {children}
      </_Dialog>
    );
    component.find(".dialog__close--inside").simulate("click");
    expect(handleClick).toBeCalled();
  });
});
