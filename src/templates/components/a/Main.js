import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Box, withStyles } from "@material-ui/core";
import NavBar from "./navigation/NavBar";
import Footer from "./footer/Footer";
import Vote from "templates/components/a/vote/Vote";
import Rule from "templates/components/a/rule/Rule";
import {NavState} from "./constants/NavState"

const styles = (theme) => ({
	wrapper: {
		backgroundColor: theme.palette.common.white,
		overflowX: "hidden",
		display: "flex",
		flexDirection: "column",
		height: window.innerHeight,
	},
	body: {
		position: "relative",
		backgroundColor: theme.palette.common.white,
		flex: 1,
		overflowY: "auto",
	}
});

function Main(props) {
	const {classes} = props;
	
	const [scroll, setScroll] = useState(undefined);
	const [navState, setNavState] = useState(null);
	
	const scrollRef = useRef();
	
	const GetTarget = useCallback(() => {
		return scroll;
	}, [scroll])
	
	const onNavState = useCallback((newState) =>{
		setNavState(newState);
	}, [setNavState])
	
	useEffect(() => {
		setScroll(scrollRef.current);
	}, [setScroll, scrollRef])
	
	return (
		<Box className={classes.wrapper}>
			<NavBar target={GetTarget} />
			<Box className={classes.body} ref={scrollRef}>
				{navState === NavState.Vote &&(<Vote/>)}
				{navState === NavState.Rule &&(<Rule/>)}
			</Box>
			<Footer onNavState={onNavState}/>
		</Box>
	);
}

Main.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(memo(Main));
