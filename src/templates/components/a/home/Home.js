import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import HeadSection from "./HeadSection"
import VoteSection from "./VoteSection";

const styles = (theme) => ({
	wrapper: {
		position: "relative",
		backgroundColor: theme.palette.common.white,
		flex: 1,
		overflowY: "auto",
	},
});

function Home(props) {
	const {classes, onScrollTarget} = props;
	const scrollRef = useRef();
	
	useEffect(()=>{
		onScrollTarget(scrollRef.current);
	},[onScrollTarget, scrollRef])
	
	return (
		<Box className={classNames(classes.wrapper)} ref={scrollRef}>
			<HeadSection />
			<VoteSection />
		</Box>
	);
}

Home.propTypes = {
	theme: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	onScrollTarget: PropTypes.func,
};

export default withStyles(styles, {withTheme: true})(Home)
