import React from "react";
import PropTypes from "prop-types";
import { red } from '@material-ui/core/colors';
import { Card, CardContent, CardMedia, IconButton, Typography, withStyles } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import { ExpandMore, Favorite } from "@material-ui/icons";

const styles = theme => ({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 0,
		paddingTop: '100%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
	iconWrapper: {
		borderRadius: theme.shape.borderRadius,
		textAlign: "center",
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: theme.spacing(3),
		padding: theme.spacing(1) * 1.5
	},
	title: {
		alignItems: "flex-start"
	}
});

function VoteItem(props) {
	const {classes, image, description, name, id} = props;
	
	return (
		<div>
			<Card className={classes.root} variant={"outlined"}>
				<CardActions>
					<Typography variant="caption" color="textSecondary" align={"left"}>
						{"ID:" + id}
					</Typography>
				</CardActions>
				<CardMedia
					className={classes.media}
					image={image}
					title={name}
				/>
				<CardContent>
					<Typography variant="h5" component="h2" align={"left"}>
						{name}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p" align={"left"}>
						{description}
					</Typography>
				</CardContent>
				<CardActions>
					<IconButton aria-label="add to favorites">
						<Favorite />
					</IconButton>
					<IconButton
						className={""}
						aria-label="show more"
					>
						<ExpandMore />
					</IconButton>
				</CardActions>
			</Card>
		</div>
	
	);
}

VoteItem.propTypes = {
	classes: PropTypes.object.isRequired,
	color: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	brief: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
};

export default withStyles(styles, {withTheme: true})(VoteItem);
