import React, { Fragment, lazy, memo, Suspense, useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Box, withStyles } from "@material-ui/core";
import NavBar from "./navigation/NavBar";
import Footer from "./footer/Footer";
import { NavState } from "./constants/NavState"
import { AxiosCache } from "shared/components/AxiosCache";

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
	},
	img: {
		width: 900,
		height: "auto",
		maxHeight: "100%",
		maxWidth: "100%",
	}
});

function Main(props) {
	const {classes, search, theme} = props;
	const [scroll, setScroll] = useState(undefined);
	const [navState, setNavState] = useState(null);
	const [entered, setEntered] = useState(false);
	const scrollRef = useRef();
	
	const [themeLoaded, setThemeLoaded] = useState(null);
	
	const onClickImg = useCallback(() => {
		setEntered(true);
		setTimeout(()=>{
			setScroll(scrollRef.current);
		}, 100);
	}, [setEntered, setScroll, scrollRef])
	
	const LoadData = useCallback((id) => {
		AxiosCache({
			url: `/data/${id}/theme.json`,
			method: 'get'
		}).then(function (res) {
			setThemeLoaded(true);
		}).catch(function (error) {
			console.log(error);
		});
	}, [setThemeLoaded, onClickImg]);
	
	const GetTarget = useCallback(() => {
		return scroll;
	}, [scroll])
	
	const onNavState = useCallback((newState) => {
		setNavState(newState);
	}, [setNavState])
	
	let ActionID = search.get("id");
	if (!ActionID) {
		ActionID = "01";
	}
	useEffect(() => {
		LoadData(ActionID);
	}, [setScroll, scrollRef, LoadData, ActionID])
	
	return (
		<Fragment>
			{themeLoaded && !entered && (
				<div align={"center"}>
					<img src={"/img/bg/01.jpg"} className={classes.img} onClick={onClickImg} alt={""} />
				</div>
			)}
			{themeLoaded && entered && (
				<Box className={classes.wrapper} style={theme.palette.style.default}>
					<NavBar target={GetTarget} />
					<Box className={classes.body} ref={scrollRef}>
						{navState === NavState.Vote && (<Suspense fallback={<Fragment>Loading</Fragment>}><Vote actionID={ActionID} /></Suspense>)}
						{navState === NavState.Rule && (<Suspense fallback={<Fragment>Loading</Fragment>}><Rule actionID={ActionID} /></Suspense>)}
						{navState === NavState.Rank && (<Suspense fallback={<Fragment>Loading</Fragment>}><Rank actionID={ActionID} /></Suspense>)}
						{navState === NavState.Share && (<Suspense fallback={<Fragment>Loading</Fragment>}><Share actionID={ActionID} /></Suspense>)}
					</Box>
					<Footer onNavState={onNavState} />
				</Box>
			)}
		</Fragment>
	);
}

Main.propTypes = {
	classes: PropTypes.object.isRequired,
	search: PropTypes.objectOf(URLSearchParams),
};

export default withStyles(styles, {withTheme: true})(memo(Main));
