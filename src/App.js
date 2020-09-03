import React, { Component, Fragment, lazy, Suspense } from "react";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter as WebRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import * as serviceWorker from "./serviceWorker";
import Pace from "./shared/components/Pace";
import intl from 'react-intl-universal';
import lodash from 'lodash';

import SUPPORT_LOCALES from "./shared/components/SupportLocales"
import AxiosCache from "./shared/components/AxiosCache";

const LoggedInComponent = lazy(() => import("./logged_in/components/Main"));
const LoggedOutComponent = lazy(() => import("./logged_out/components/Main"));

class App extends Component {
	state = {initDone: false}
	
	componentDidMount() {
		this.loadLocales();
	}
	
	loadLocales() {
		let currentLocale = intl.determineLocale({
			urlLocaleKey: 'lang',
			cookieLocaleKey: 'lang'
		});
		
		if (!lodash.find(SUPPORT_LOCALES, {value: currentLocale})) {
			currentLocale = 'zh-CN';
		}
		
		let self = this;
		AxiosCache({
			url:`/locales/${currentLocale}.json`,
			method : 'get'
		}).then(function (res) {
			return intl.init({
				currentLocale,
				locales: {
					[currentLocale]: res.data
				}
			});
		}).then(function () {
			self.setState({initDone: true});
		}).catch(function (error) {
			console.log(error);
		});
	}
	
	render() {
		return (
			this.state.initDone &&
			<WebRouter>
				<MuiThemeProvider theme={theme}>
					<CssBaseline />
					<GlobalStyles />
					<Pace color={theme.palette.primary.light} />
					<Suspense fallback={<Fragment />}>
						<Switch>
							<Route path="/c">
								<LoggedInComponent />
							</Route>
							<Route>
								<LoggedOutComponent />
							</Route>
						</Switch>
					</Suspense>
				</MuiThemeProvider>
			</WebRouter>
		);
	}
}

serviceWorker.register();

export default App;
