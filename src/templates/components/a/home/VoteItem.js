import React from "react";
import PropTypes from "prop-types";
import { red } from '@material-ui/core/colors';
import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Typography, withStyles } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import { ExpandMore, Favorite, MoreVert, Share } from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse";

const styles = theme => ({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
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
	}
});

function VoteItem(props) {
	const {classes, image, brief, description, name, id} = props;
	const [expanded, setExpanded] = React.useState(false);
	
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	
	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						R
					</Avatar>
				}
				action={
					<IconButton aria-label="settings">
						<MoreVert />
					</IconButton>
				}
				title={name}
				subheader={id}
			/>
			<CardMedia
				className={classes.media}
				image={image}
				title="Paella dish"
			/>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{brief}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
					<Favorite />
				</IconButton>
				<IconButton aria-label="share">
					<Share />
				</IconButton>
				<IconButton
					className={""}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMore />
				</IconButton>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography paragraph>{description}</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
}

VoteItem.propTypes = {
	classes: PropTypes.object.isRequired,
	color: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	brief: PropTypes.string.isRequired,
	image : PropTypes.string.isRequired,
	id : PropTypes.number.isRequired,
};

export default withStyles(styles, {withTheme: true})(VoteItem);
