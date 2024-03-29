import * as Sinon from "sinon";
import Router from "./Router";
import { expect } from "chai";
import { describe } from "mocha";

describe("Router", () => {
  const originalForward = window.history.forward;
  const originalBack = window.history.back;

  beforeEach(() => {
    Router.reset();
    window.history.forward = Sinon.fake();
    window.history.back = Sinon.fake();
  });

  describe("Функция back", () => {
    it("должна вызываться один раз", function () {
      Router.back();

      expect((window.history.back as any).callCount).to.eq(1);
    });
  });
  describe("Функция вперёд", () => {
    it("должны вызываться один раз", function () {
      Router.forward();

      expect((window.history.forward as any).callCount).to.eq(1);
    });
  });

  after(() => {
    window.history.forward = originalForward;
    window.history.back = originalBack;
  });
});
