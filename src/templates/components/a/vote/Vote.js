import React from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import HeadSection from "./HeadSection"
import VoteSection from "./VoteSection";

const styles = (theme) => ({});

function Vote(props) {
	const {userData} = props;
	return (
		<div>
			<HeadSection userStyle={userData.theme}/>
			<VoteSection userStyle={userData.theme} userData={userData}/>
		</div>
	);
}

Vote.propTypes = {
	theme: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	userData : PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(Vote)
