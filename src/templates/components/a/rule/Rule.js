import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Box, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import AxiosCache from "shared/components/AxiosCache";

const styles = (theme) => ({
	wrapper: {
		position: "relative",
		paddingBottom: theme.spacing(1),
	},
	container: {
		marginTop: theme.spacing(0),
		marginBottom: theme.spacing(0),
	},
	card: {
		boxShadow: theme.shadows[4],
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		maxWidth: 600,
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
	},
	item: {
		paddingTop: theme.spacing(1),
	}
});

function Rule(props) {
	const {classes, actionID, userTheme} = props
	
	const [userRule, setUserRule] = useState(null);
	
	const LoadData = useCallback((id) => {
		AxiosCache({
			url: `/data/${id}/rule.json`,
			method: 'get'
		}).then(function (res) {
			setUserRule(res.data);
		}).catch(function (error) {
			console.log(error);
		});
	}, [setUserRule]);
	
	useEffect(() => {
		LoadData(actionID);
	}, [LoadData, actionID]);
	
	return (
		<Fragment>
			{userRule && (
				<div className={classNames("lg-p-top", classes.wrapper)}>
					<div className={classNames("container-fluid", classes.container)}>
						<Box display="flex" justifyContent="center" className="column">
							<Box className={classes.card} style={{
								backgroundColor:userTheme.container.bg,
								color:userTheme.container.color
							}}>
								<Typography variant="h5" align="center">
									{userRule.title}
								</Typography>
								{
									userRule && userRule.list && userRule.list.map((element, index) => {
										return (<div className={classes.item} key={index}>
											{element}
										</div>)
									})
								}
							</Box>
						</Box>
					</div>
				</div>
			)}
		</Fragment>
	);
}

Rule.propTypes = {
	theme: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	userTheme: PropTypes.object.isRequired,
	actionID: PropTypes.string.isRequired,
};

export default withStyles(styles, {withTheme: true})(Rule)
