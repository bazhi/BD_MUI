import React, { Fragment, lazy, memo, Suspense, useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Box, withStyles } from "@material-ui/core";
import NavBar from "./navigation/NavBar";
import Footer from "./footer/Footer";
import {NavState} from "./constants/NavState"
import AxiosCache from "shared/components/AxiosCache";

const Vote = lazy(() => import("./vote/Vote"));
const Rule = lazy(() => import("./rule/Rule"));

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
	const {classes, theme} = props;
	const [scroll, setScroll] = useState(undefined);
	const [navState, setNavState] = useState(null);
	
	const [userData, setUserData] = useState({
		theme:{
			background : "#ffffff",
			wave : "#FFFFFF",
		}
	});
	
	const LoadData = useCallback(() => {
		AxiosCache({
			url: `/data/data01.json`,
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
		LoadData();
	}, [setScroll, scrollRef, LoadData])
	
	return (
		<Box className={classes.wrapper} style={{backgroundColor:userData.theme.background}}>
			<NavBar target={GetTarget} />
			<Box className={classes.body} ref={scrollRef}  style={{backgroundColor:userData.theme.background}}>
				{navState === NavState.Vote &&(<Suspense fallback={<Fragment>Loading</Fragment>}><Vote userData={userData}/></Suspense>)}
				{navState === NavState.Rule &&(<Suspense fallback={<Fragment>Loading</Fragment>}><Rule/></Suspense>)}
			</Box>
			<Footer onNavState={onNavState}/>
		</Box>
	);
}

Main.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(memo(Main));
