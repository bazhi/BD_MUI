import React, { memo } from "react";
import PropTypes from "prop-types";
import { withStyles, Box } from "@material-ui/core";
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

	return (
		<Box className={classes.wrapper}>
			<NavBar />
			<Home />
			<Footer />
		</Box>
	);
}

Main.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(memo(Main));
