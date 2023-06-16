import * as Sinon from "sinon";
import{ SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from "sinon"
import HTTPTransport from "./HttpTransport";
import { expect } from "chai"

describe("HTTPTransport", () => {
	let xhr: SinonFakeXMLHttpRequestStatic
	let instance: HTTPTransport
	const requests: SinonFakeXMLHttpRequest[] = []

	beforeEach(() => {
		xhr = Sinon.useFakeXMLHttpRequest()

		// @ts-ignore
		global.XMLHttpRequest = xhr

		xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
			requests.push(request)
		})

		instance = new HTTPTransport("/auth")
	})

	afterEach(() => {
		requests.length = 0
	})

	it("метод get() должен отправить GET запрос", () => {
		instance.get("/user")

		const [request] = requests

		expect(request.method).to.eq("Get")
	})
})
