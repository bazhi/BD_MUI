import React, { memo } from "react";
import PropTypes from "prop-types";
import { BottomNavigation, BottomNavigationAction, withStyles } from "@material-ui/core";
import { Favorite, Folder, LocationOn, Restore } from "@material-ui/icons";

const styles = theme => ({});


function Footer(props) {
	// const {classes,} = props;
	return (
		<BottomNavigation position="fixed">
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
