import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import classNames from "classnames";

const styles = (theme) => ({
	wrapper: {
		position: "relative",
		backgroundColor: theme.palette.background.default,
		paddingBottom: theme.spacing(1),
	},
});

function Rule(props) {
	const {classes, theme} = props
	
	return (
		<Fragment>
			<div className={classNames("lg-p-top", classes.wrapper)}>
				1111
			</div>
		</Fragment>
	);
}

Rule.propTypes = {
	theme: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(Rule)
