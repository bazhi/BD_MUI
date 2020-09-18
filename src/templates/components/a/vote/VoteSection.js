import React from "react";
import PropTypes from "prop-types";
import { Grid, withStyles, withWidth } from "@material-ui/core";
import CalculateSpacing from "./CalculateSpacing"
import { CSSTransition } from "react-transition-group";
import VoteItem from "./VoteItem";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
	title: {
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(4),
	},
});

function VoteSection(props) {
	const {classes, width, theme, userData} = props;
	
	return (
		<div >
			<div className="container-fluid container-gap">
				<Typography variant="h3" align="center" className={classes.title} >
					候选列表
				</Typography>
				<div className="container-fluid">
					<Grid container spacing={CalculateSpacing(width)} alignItems={"center"}>
						{userData && userData.list && userData.list.map(element => (
							<Grid item xs={12} sm={6} md={4} key={element.id}>
								<CSSTransition in={true} appear={true} classNames="bz-fade" timeout={100} unmountOnExit={true} overflow={"true"}>
									<div>
										<VoteItem
											id={element.id}
											image={element.image}
											color={element.color}
											name={element.name}
											description={element.description}
											brief={element.brief}
										/>
									</div>
								</CSSTransition>
							</Grid>
						))}
					</Grid>
				</div>
			</div>
		</div>
	);
}

VoteSection.propTypes = {
	classes: PropTypes.object,
	theme: PropTypes.object,
	width: PropTypes.string.isRequired,
	userData: PropTypes.object.isRequired,
};

export default withWidth()(withStyles(styles, {withTheme: true})(VoteSection));
