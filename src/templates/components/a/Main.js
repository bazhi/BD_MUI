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
	const {classes, theme, search} = props;
	const [scroll, setScroll] = useState(undefined);
	const [navState, setNavState] = useState(null);
	
	const [userData, setUserData] = useState({
		theme:{
			background : theme.palette.background.default,
			wave : theme.palette.background.wave,
		}
	});
	
	const LoadData = useCallback((id) => {
		if(!id){
			id = "01";
		}
		AxiosCache({
			url: `/data/data${id}.json`,
			method: 'get'
		}).then(function (res) {
			setUserData(res.data);
		}).catch(function (error) {
			console.log(error);
		});
	}, [setUserData]);
	
	const scrollRef = useRef();
	
	const GetTarget = useCallback(() => {
		return scroll;
	}, [scroll])
	
	const onNavState = useCallback((newState) =>{
		setNavState(newState);
	}, [setNavState])

	useEffect(() => {
		setScroll(scrollRef.current);
		LoadData(search.get("id"));
	}, [setScroll, scrollRef, LoadData, search])
	
	return (
		<Box className={classes.wrapper} style={{backgroundColor:userData.theme.background}}>
			<NavBar target={GetTarget} />
			<Box className={classes.body} ref={scrollRef}  style={{backgroundColor:userData.theme.background}}>
				{navState === NavState.Vote &&(<Suspense fallback={<Fragment>Loading</Fragment>}><Vote userData={userData}/></Suspense>)}
				{navState === NavState.Rule &&(<Suspense fallback={<Fragment>Loading</Fragment>}><Rule userData={userData.rule}/></Suspense>)}
				{navState === NavState.Rank &&(<Suspense fallback={<Fragment>Loading</Fragment>}><Rank userData={userData}/></Suspense>)}
				{navState === NavState.Share &&(<Suspense fallback={<Fragment>Loading</Fragment>}><Share userData={userData.rule}/></Suspense>)}
			</Box>
			<Footer onNavState={onNavState}/>
		</Box>
	);
}

Main.propTypes = {
	classes: PropTypes.object.isRequired,
	search: PropTypes.objectOf(URLSearchParams),
};

export default withStyles(styles, {withTheme: true})(memo(Main));
