import React, { Component, Fragment, lazy, Suspense } from "react";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import * as serviceWorker from "./serviceWorker";
import Pace from "./shared/components/Pace";
import intl from 'react-intl-universal';
import axios from 'axios';
import _ from 'lodash';
import SUPPORT_LOCALES from "./shared/components/SupportLocales"

const LoggedInComponent = lazy(() => import("./logged_in/components/Main"));
const LoggedOutComponent = lazy(() => import("./logged_out/components/Main"));



class App extends Component {
	componentDidMount() {
		this.loadLocales();
	}
	
	loadLocales() {
		let currentLocale = intl.determineLocale({
			urlLocaleKey: 'lang',
			cookieLocaleKey: 'lang'
		});
		
		// 如果没找到，则默认为汉语
		if (!_.find(SUPPORT_LOCALES, {value: currentLocale})) {
			currentLocale = 'zh-CN';
		}
		
		axios
			.get(`locales/${currentLocale}.json`)
			.then(res => {
				console.log('App locale data', res.data);
				// init 方法将根据 currentLocale 来加载当前语言环境的数据
				return intl.init({
					currentLocale,
					locales: {
						[currentLocale]: res.data
					}
				});
			})
			.then(() => {
				// After loading CLDR locale data, start to render
				this.setState({initDone: true});
			});
	}
	
	render() {
		return (
			<BrowserRouter>
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
			</BrowserRouter>
		);
	}
}

serviceWorker.register();

export default App;
