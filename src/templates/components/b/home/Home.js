import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";

const styles = (theme) => ({
	wrapper: {
		position: "relative",
		backgroundColor: theme.palette.secondary.main,
		flex: 1,
	},
});

function Home(props) {
	const {classes} = props;
	return (
		<Box className={classNames(classes.wrapper, "lg-p-top")}>
		
		</Box>
	);
}

Home.propTypes = {
	theme: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(Home)
