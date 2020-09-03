import React from "react";
import intl from "react-intl-universal";
import { NativeSelect } from "@material-ui/core";

import SUPPORT_LOCALES from "./SupportLocales";

class LanguageSelector extends React.Component {
	constructor(props) {
		super(props);
		this.onSelectLocale = this.onSelectLocale.bind(this);
	}
	
	onSelectLocale(e) {
		let lang = e.target.value;
		window.location.search = `?lang=${lang}`;
	};
	
	render() {
		let item = intl.get("Language");
		if(!item){
			item = "null";
		}
		
		return (
			<NativeSelect onChange={this.onSelectLocale}>
				<option value="" hidden={true}>
					{item}
				</option>
				{
					SUPPORT_LOCALES.map(locale => {
						if(locale.name !== item){
							return (
								<option key={locale.value} value={locale.value}>
									{locale.name}
								</option>
							)
						}else{
							return null;
						}
					})
				}
			</NativeSelect>
		);
	}
}

export default LanguageSelector;