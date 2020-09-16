import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { CardContent, Grid, GridListTileBar, SvgIcon, Typography, withStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import { AirplanemodeActive, Favorite, FavoriteBorderOutlined, Redeem, ThumbUp, ThumbUpOutlined } from "@material-ui/icons";
import Badge from "@material-ui/core/Badge";

const styles = {
	imageContainer: {
		width: "100%",
		paddingTop: "100%",
		overflow: "hidden",
		position: "relative",
	},
	image: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		margin: "auto",
	},
	titleBar: {
		background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 20%, rgba(0,0,0,0) 100%)',
		height: 24,
	},
};

function VoteItem(props) {
	const {
		classes,
		image,
		name,
		border,
		theme,
		id,
		description,
	} = props;
	const img = useRef();
	const [hasMoreWidthThanHeight, setHasMoreWidthThanHeight] = useState(null);
	const [hasLoaded, setHasLoaded] = useState(false);
	const [list, setList] = useState([]);
	const [change, setChanged] = useState(1);
	
	const onLoad = useCallback(() => {
		if (img.current.naturalHeight < img.current.naturalWidth) {
			setHasMoreWidthThanHeight(true);
		} else {
			setHasMoreWidthThanHeight(false);
		}
		setHasLoaded(true);
	}, [img, setHasLoaded, setHasMoreWidthThanHeight]);
	
	const onClickIcon = useCallback((index) => {
		list[index].count++;
		setList(list);
		setChanged(change+1);
	},[setList, list, setChanged, change]);
	
	useEffect(()=>{
		setList([
			{
				count: 0,
				tips: "favorites",
				component: FavoriteBorderOutlined,
				componentOk: Favorite,
			}, {
				count: 0,
				tips: "support",
				component: ThumbUpOutlined,
				componentOk: ThumbUp,
			}, {
				count: 0,
				tips: "gift",
				component: AirplanemodeActive,
				componentOk: AirplanemodeActive,
			}, {
				count: 0,
				tips: "gift",
				component: Redeem,
				componentOk: Redeem,
			}
		])
	},[setList]);
	
	return (
		<Card>
			<div className={classes.imageContainer}>
				<img
					style={{
						height: hasMoreWidthThanHeight ? "100%" : "auto",
						width: hasMoreWidthThanHeight ? "auto" : "100%",
						display: hasLoaded ? "block" : "none",
						borderRadius: border ? theme.shape.borderRadius : 0,
					}}
					ref={img}
					className={classes.image}
					onLoad={onLoad}
					src={image}
					alt=""
				/>
				{id && (
					<GridListTileBar
						subtitle={"ID: " + id}
						titlePosition={"top"}
						className={classes.titleBar}
					/>
				)}
			</div>
			<CardContent>
				{name && (
					<Typography variant="h5">
						{name}
					</Typography>
				)}
				{description && (<Typography variant="caption" color="textSecondary">
						{description}
					</Typography>
				)}
			</CardContent>
			<CardActions disableSpacing>
				<Grid container>
					{
						change && list.map((element, index) => (
							<IconButton aria-label={element.tips} key={index} onClick={() => {
								onClickIcon(index);
							}}>
								<Badge badgeContent={element.count} color="primary">
									{
										element.count === 0 && (<SvgIcon component={element.component} color={"primary"} />)
									}
									{
										element.count > 0 && (<SvgIcon component={element.componentOk} color={"primary"} />)
									}
								</Badge>
							</IconButton>
						))
					}
				</Grid>
			</CardActions>
		</Card>
	);
}

VoteItem.propTypes = {
	classes: PropTypes.object.isRequired,
	image: PropTypes.string.isRequired,
	theme: PropTypes.object.isRequired,
	name: PropTypes.string,
	id: PropTypes.number,
	border: PropTypes.bool,
	description: PropTypes.string,
};

export default withStyles(styles, {withTheme: true})(VoteItem);
