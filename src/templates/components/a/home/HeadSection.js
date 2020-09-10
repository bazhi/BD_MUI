import React, { Fragment, useCallback, useEffect, useRef } from "react";
import intl from 'react-intl-universal';
import PropTypes from "prop-types";
import classNames from "classnames";
import { Box, Button, Card, Grid, Hidden, isWidthUp, Typography, withStyles, withWidth, } from "@material-ui/core";
import ZoomImage from "shared/components/ZoomImage";
import WaveBorder from "shared/components/WaveBorder";

const styles = (theme) => ({
	extraLargeButtonLabel: {
		fontSize: theme.typography.body1.fontSize,
		[theme.breakpoints.up("sm")]: {
			fontSize: theme.typography.h6.fontSize,
		},
	},
	extraLargeButton: {
		paddingTop: theme.spacing(1.5),
		paddingBottom: theme.spacing(1.5),
		[theme.breakpoints.up("xs")]: {
			paddingTop: theme.spacing(1),
			paddingBottom: theme.spacing(1),
		},
		[theme.breakpoints.up("lg")]: {
			paddingTop: theme.spacing(2),
			paddingBottom: theme.spacing(2),
		},
	},
	card: {
		boxShadow: theme.shadows[4],
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("xs")]: {
			paddingTop: theme.spacing(3),
			paddingBottom: theme.spacing(3),
		},
		[theme.breakpoints.up("sm")]: {
			paddingTop: theme.spacing(5),
			paddingBottom: theme.spacing(5),
			paddingLeft: theme.spacing(4),
			paddingRight: theme.spacing(4),
		},
		[theme.breakpoints.up("md")]: {
			paddingTop: theme.spacing(5.5),
			paddingBottom: theme.spacing(5.5),
			paddingLeft: theme.spacing(5),
			paddingRight: theme.spacing(5),
		},
		[theme.breakpoints.up("lg")]: {
			paddingTop: theme.spacing(6),
			paddingBottom: theme.spacing(6),
			paddingLeft: theme.spacing(6),
			paddingRight: theme.spacing(6),
		},
		[theme.breakpoints.down("lg")]: {
			width: "auto",
		},
	},
	wrapper: {
		position: "relative",
		backgroundColor: theme.palette.secondary.main,
		paddingBottom: theme.spacing(2),
	},
	image: {
		maxWidth: "100%",
		verticalAlign: "middle",
		borderRadius: theme.shape.borderRadius,
		boxShadow: theme.shadows[4],
	},
	container: {
		marginTop: theme.spacing(6),
		marginBottom: theme.spacing(12),
		[theme.breakpoints.down("md")]: {
			marginBottom: theme.spacing(9),
		},
		[theme.breakpoints.down("sm")]: {
			marginBottom: theme.spacing(6),
		},
		[theme.breakpoints.down("sm")]: {
			marginBottom: theme.spacing(3),
		},
	},
	containerFix: {
		[theme.breakpoints.up("md")]: {
			maxWidth: "none !important",
		},
	},
	waveBorder: {
		paddingTop: theme.spacing(4),
	},
});

function HeadSection(props) {
	const {classes, theme, width} = props;
	const bgMusic = useRef();
	
	const autoPlay = useCallback(()=>{
		if(bgMusic.current){
			if(bgMusic.current.paused){
				bgMusic.current.play();
			}
		}
	},[]);
	
	useEffect(()=>{
		autoPlay();
	}, [autoPlay])
	
	return (
		<Fragment>
			<div className={classNames("lg-p-top", classes.wrapper)}>
				<div className={classNames("container-fluid", classes.container)}>
					<Box display="flex" justifyContent="center" className="row">
						<Card className={classes.card} data-aos-delay="200" data-aos="zoom-in">
							<div className={classNames(classes.containerFix, "container")}>
								<Box justifyContent="space-between" className="row">
									<Grid item xs={12} md={5}>
										<Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
											<Box mb={4}>
												<Typography variant={isWidthUp("lg", width) ? "h3" : "h4"}>
													{intl.get("HeadTitle")}
												</Typography>
											</Box>
											<div>
												<Box mb={2}>
													<Typography variant={isWidthUp("lg", width) ? "h6" : "body1"} color="textSecondary">
														{intl.get("HeadContent")}
													</Typography>
												</Box>
												<Button variant="contained" color="secondary" fullWidth className={classes.extraLargeButton}
												        classes={{label: classes.extraLargeButtonLabel}} href="">
													{intl.get("HeadButton")}
												</Button>
											</div>
										</Box>
									</Grid>
									<Hidden smDown>
										<Grid item md={6}>
											<audio autoPlay={"autoplay"} loop={"loop"} preload={"auto"} ref={bgMusic}
											       src="https://sharefs.yun.kugou.com/202009100954/5cfd42f23dcb5a7a9cb15e81aa9bb594/G192/M04/0F/19/oJQEAF5OQE-AKFxeAEbYgOmsMEw983.mp3">
												你的浏览器不支持audio标签
											</audio>
										</Grid>
									</Hidden>
								</Box>
							</div>
						</Card>
					</Box>
				</div>
			</div>
			<WaveBorder upperColor={theme.palette.secondary.main} lowerColor="#FFFFFF" className={classes.waveBorder} animationNegativeDelay={2} />
		</Fragment>
	);
}

HeadSection.propTypes = {
	classes: PropTypes.object,
	width: PropTypes.string,
	theme: PropTypes.object,
};

export default withWidth()(
	withStyles(styles, {withTheme: true})(HeadSection)
);
