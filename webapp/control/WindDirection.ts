import Control from "sap/ui/core/Control";
import RenderManager from "sap/ui/core/RenderManager";
import type { MetadataOptions } from "sap/ui/core/Element";

/**
 * @namespace ui5.typescript.sample.control
 */
export default class WindDirection extends Control {
	static readonly metadata: MetadataOptions = {
		properties: {
			direction: "float",
		},
	};

	constructor(idOrSettings?: string | $WindDirectionSettings);
	constructor(id?: string, settings?: $WindDirectionSettings);
	constructor(id?: string, settings?: $WindDirectionSettings) {
		super(id, settings);
	}

	renderer = {
		apiVersion: 2,
		render: (rm: RenderManager, control: WindDirection) => {
			rm.openStart("div", control);
			rm.style("font-size", "2rem");
			rm.style("width", "2rem");
			rm.style("height", "2rem");
			rm.style("display", "inline-block");
			rm.style("color", "blue");
			rm.style("transform-origin", "center");
			rm.style("transform", `rotate(${control.getDirection() + 90}deg)`); // arrow is pointing right by default, direction 0 means blowing FROM the north, so the arrow has to point down
			rm.openEnd();
			rm.text("➢");
			rm.close("div");
		},
	};
}
