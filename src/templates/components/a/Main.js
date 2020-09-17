import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Box, withStyles } from "@material-ui/core";
import NavBar from "./navigation/NavBar";
import Footer from "./footer/Footer";
import Home from "./home/Home";

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
	
	const scrollRef = useRef();
	
	const GetTarget = useCallback(() => {
		return scroll;
	}, [scroll])
	
	useEffect(() => {
		setScroll(scrollRef.current);
	}, [setScroll, scrollRef])
	
	return (
		<Box className={classes.wrapper}>
			<NavBar target={GetTarget} />
			<Box className={classes.body} ref={scrollRef}>
				<Home />
			</Box>
			<Footer />
		</Box>
	);
}

Main.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(memo(Main));
