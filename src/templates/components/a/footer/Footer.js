import React, { memo } from "react";
import PropTypes from "prop-types";
import { BottomNavigation, BottomNavigationAction, withStyles } from "@material-ui/core";
import { Favorite, Folder, LocationOn, Restore } from "@material-ui/icons";

const styles = theme => ({
	appBar: {
		boxShadow: theme.shadows[6],
		backgroundColor: theme.palette.common.white
	},
	toolbar: {
		display: "flex",
		justifyContent: "space-between"
	},
	menuButtonText: {
		fontSize: theme.typography.body1.fontSize,
		fontWeight: theme.typography.h6.fontWeight
	},
	
	noDecoration: {
		textDecoration: "none !important"
	},
	brandText: {
		fontFamily: "'Baloo Bhaijaan', cursive",
		fontWeight: 400
	},
});


function Footer(props) {
	// const {classes,} = props;
	return (
		<BottomNavigation>
			<BottomNavigationAction label="Recent" value="recent" icon={<Restore />} />
			<BottomNavigationAction label="Favorites" value="favorites" icon={<Favorite />} />
			<BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOn />} />
			<BottomNavigationAction label="Folder" value="folder" icon={<Folder />} />
		</BottomNavigation>
	);
}

Footer.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(memo(Footer));
