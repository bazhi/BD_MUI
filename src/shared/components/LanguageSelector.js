import React from "react";
import intl from "react-intl-universal";
import { NativeSelect } from "@material-ui/core";

import SUPPORT_LOCALES from "./SupportLocales";

class LanguageSelector extends React.Component {
	onSelectLocale(e) {
		let lang = e.target.value;
		window.location.search = `?lang=${lang}`;
	};
	
	render() {
		return (
			<NativeSelect onChange={this.onSelectLocale}>
				<option value="" hidden={true}>
					{intl.get("Language")}
				</option>
				{
					SUPPORT_LOCALES.map(locale => (
						<option key={locale.value} value={locale.value}>
							{locale.name}
						</option>
					))
				}
			</NativeSelect>
		);
	}
}

export default LanguageSelector;