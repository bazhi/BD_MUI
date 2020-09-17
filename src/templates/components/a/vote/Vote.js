import React from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import HeadSection from "./HeadSection"
import VoteSection from "./VoteSection";

const styles = (theme) => ({});

function Vote(props) {
	return (
		<div>
			<HeadSection />
			<VoteSection />
		</div>
	);
}

Vote.propTypes = {
	theme: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(Vote)
