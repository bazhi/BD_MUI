import React, { memo, useEffect } from "react";
import PropTypes from "prop-types";
import { BottomNavigation, BottomNavigationAction, withStyles } from "@material-ui/core";
import { ListAlt, Poll, Share, ImportContacts } from "@material-ui/icons";
import {NavState} from "../constants/NavState"

const styles = theme => ({});


function Footer(props) {
	const {onNavState,} = props;
	const [value, setValue] = React.useState(NavState.Vote);
	
	useEffect(()=>{
		onNavState(value);
	},[value, onNavState])
	
	return (
		<BottomNavigation
		                  value={value}
		                  onChange={(event, newValue) => {
			                  setValue(newValue);
			                  onNavState(newValue);
		                  }}
		                  showLabels={true}
		                  >
			<BottomNavigationAction label="Vote" value={NavState.Vote} icon={<Poll />} />
			<BottomNavigationAction label="Rule" value={NavState.Rule} icon={<ImportContacts />} />
			<BottomNavigationAction label="Rank" value={NavState.Rank} icon={<ListAlt />} />
			<BottomNavigationAction label="Share" value={NavState.Share} icon={<Share />} />

		</BottomNavigation>
	);
}

Footer.propTypes = {
	classes: PropTypes.object.isRequired,
	onNavState: PropTypes.func.isRequired,
};

export default withStyles(styles, {withTheme: true})(memo(Footer));
