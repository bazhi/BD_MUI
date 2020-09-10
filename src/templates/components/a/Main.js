import React, { memo } from "react";
import PropTypes from "prop-types";
import AOS from "aos/dist/aos";
import { withStyles, Box } from "@material-ui/core";
import NavBar from "./navigation/NavBar";
import Footer from "./footer/Footer";
import Home from "./home/Home";
import "aos/dist/aos.css";

AOS.init({once: true});

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
	console.log("Main a");
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
