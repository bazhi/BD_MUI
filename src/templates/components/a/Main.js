import React, { Fragment, lazy, memo, Suspense, useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Box, withStyles } from "@material-ui/core";
import NavBar from "./navigation/NavBar";
import Footer from "./footer/Footer";
import {NavState} from "./constants/NavState"
import AxiosCache from "shared/components/AxiosCache";

const Vote = lazy(() => import("./vote/Vote"));
const Rule = lazy(() => import("./rule/Rule"));
const Share = lazy(() => import("./share/Share"));
const Rank = lazy(() => import("./rank/Rank"));

let styles = (theme) => ({
	wrapper: {
		overflowX: "hidden",
		display: "flex",
		flexDirection: "column",
		height: window.innerHeight,
	},
	body: {
		position: "relative",
		flex: 1,
		overflowY: "auto",
	}
});

function Main(props) {
	const {classes, search} = props;
	const [scroll, setScroll] = useState(undefined);
	const [navState, setNavState] = useState(null);
	const scrollRef = useRef();
	
	const [userTheme, setUserTheme] = useState(null);
	
	const LoadData = useCallback((id) => {
		AxiosCache({
			url: `/data/${id}/theme.json`,
			method: 'get'
		}).then(function (res) {
			setUserTheme(res.data);
			setScroll(scrollRef.current);
		}).catch(function (error) {
			console.log(error);
		});
	}, [setUserTheme, setScroll]);
	
	const GetTarget = useCallback(() => {
		return scroll;
	}, [scroll])
	
	const onNavState = useCallback((newState) =>{
		setNavState(newState);
	}, [setNavState])

	let ActionID = search.get("id");
	if(!ActionID){
		ActionID = "01";
	}
	useEffect(() => {
		LoadData(ActionID);
	}, [setScroll, scrollRef, LoadData, ActionID])
	
	return (
		<Fragment>
			{userTheme && (<Box className={classes.wrapper} style={{backgroundColor:userTheme.default.bg}}>
					<NavBar target={GetTarget} />
					<Box className={classes.body} ref={scrollRef}  style={{backgroundColor:userTheme.default.bg}}>
						{navState === NavState.Vote &&(<Suspense fallback={<Fragment>Loading</Fragment>}><Vote userTheme={userTheme} actionID={ActionID}/></Suspense>)}
						{navState === NavState.Rule &&(<Suspense fallback={<Fragment>Loading</Fragment>}><Rule userTheme={userTheme} actionID={ActionID}/></Suspense>)}
						{navState === NavState.Rank &&(<Suspense fallback={<Fragment>Loading</Fragment>}><Rank userTheme={userTheme} actionID={ActionID}/></Suspense>)}
						{navState === NavState.Share &&(<Suspense fallback={<Fragment>Loading</Fragment>}><Share userTheme={userTheme} actionID={ActionID}/></Suspense>)}
					</Box>
					<Footer onNavState={onNavState}/>
				</Box>)
			}
		</Fragment>
	);
}

Main.propTypes = {
	classes: PropTypes.object.isRequired,
	search: PropTypes.objectOf(URLSearchParams),
};

export default withStyles(styles, {withTheme: true})(memo(Main));
