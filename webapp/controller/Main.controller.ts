import { InputBase$ChangeEvent } from "sap/m/InputBase";
import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import * as Nominatim from "nominatim-client";
import MessageBox from "sap/m/MessageBox";
// import Input from "sap/m/Input";

type WeatherInfo = {
	current_weather: {
		temperature: number;
		windspeed: number;
		windDirection: number;
	};
	placeName: string;
};

/**
 * @namespace ui5.typescript.sample.controller
 */
export default class Main extends BaseController {
	public viewModel: JSONModel = null;

	onInit(): void {
		const model = new JSONModel();
		this.setModel(model);
		void this.loadWeatherData();

		// (OPTIONAL / alternatively) Although it makes no sense in this case, it sometimes is required
		// to attach event handlers dynamically in controller code. E.g. in onInit one could do the following.

		// const input = this.byId("location");
		// if (input.isA<Input>("sap.m.Input")) {
		// 	input.attachChange(function (evt) {
		// 		const location = evt.getParameter("value");
		// 	});
		// }
	}

	async loadWeatherData(lat = "49.31", lon = "8.64", placeName = "Walldorf") {
		const response = await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
		);

		const jsonData = (await response.json()) as WeatherInfo;
		jsonData.placeName = placeName;
		(this.getModel() as JSONModel).setData(jsonData);
	}

	locationChange(evt: InputBase$ChangeEvent) {
		const location = evt.getParameters().value;

		Nominatim.createClient({
			useragent: "UI5 Typescript tutorial app",
			referer: "https://localhost",
		})
			.search({ q: location })
			.then((results) => {
				if (results.length > 0) {
					return this.loadWeatherData(
						results[0].lat,
						results[0].lon,
						results[0].display_name
					);
				} else {
					MessageBox.alert(`Location ${location} not found`, {
						actions: MessageBox.Action.CLOSE,
					});
				}
			})
			.catch(() => {
				MessageBox.alert(`Failure while searching ${location}`, {
					actions: MessageBox.Action.CLOSE,
				});
			});
	}
}
