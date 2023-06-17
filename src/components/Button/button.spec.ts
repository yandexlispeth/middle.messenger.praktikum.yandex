import * as Sinon from "sinon";
import { Button } from "./Button";
import { expect } from "chai";

describe("Тесты на компонент Button", () => {
  it("по клику вызывает переданный обработчик", function () {
    const navigateMock = Sinon.mock();

    const instance = new Button({
      label: "click",
      class: "button",
      events: {
        click: () => navigateMock(),
      },
    });

    const elem = instance.element;

    console.log("AADD", navigateMock);
    elem?.click();

    expect(navigateMock.callCount).to.eq(1);
  });

  it("должен иметь актуальный лейбл", function () {
    const label = "click";

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
