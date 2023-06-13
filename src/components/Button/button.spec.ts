import sinon = require("sinon");
import { Button } from "./Button";
import { expect } from "chai";

describe("button tests", () => {
  it("Should call router.go on click", function () {
    const navigateMock = sinon.mock();

    const instance = new Button({
      label: "click",
      class: "btn",
      events: {
        click: () => navigateMock,
      },
    });

    const elem = instance.element;

    elem?.click();

    expect(navigateMock.callCount).to.eq(1);
  });

  it("should render button with correct label", function () {
    const label = " click me ";

    const instance = new Button({
        label: "click",
        class: "btn",
        events: {
          click: () => {},
        },
    });

    const elem = instance.element;

    expect(elem?.innerHTML).to.eq(label);
  });
});
