import React from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import HeadSection from "./HeadSection"
import VoteSection from "./VoteSection";

const styles = (theme) => ({});

function Home(props) {
	return (
		<div>
			<HeadSection />
			<VoteSection />
		</div>
	);
}

Home.propTypes = {
	theme: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(Home)
