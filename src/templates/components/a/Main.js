import React, { memo, useCallback, useState } from "react";
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
		height: "100vh",
	},
});

function Main(props) {
	const {classes} = props;
	
	const [target, setTarget] = useState();
	
	const GetTarget = useCallback(() => {
		return target;
	}, [target])
	
	const OnTarget = useCallback((target) => {
		setTarget(target);
	}, [setTarget]);
	
	return (
		<Box className={classes.wrapper}>
			<NavBar target={GetTarget} />
			<Home onScrollTarget={OnTarget} />
			<Footer />
		</Box>
	);
}

Main.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(memo(Main));
