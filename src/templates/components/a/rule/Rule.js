import React from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const styles = (theme) => ({});

function Rule(props) {
	return (
		<div>
		
		</div>
	);
}

Rule.propTypes = {
	theme: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(Rule)
