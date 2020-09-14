import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Grid, Typography, withStyles, withWidth } from "@material-ui/core";
import PriceCard from "./PriceCard";
import calculateSpacing from "./calculateSpacing";
import Lazyload from "react-lazyload";
import { CSSTransition } from "react-transition-group";

const styles = theme => ({
	containerFix: {
		[theme.breakpoints.down("md")]: {
			paddingLeft: theme.spacing(6),
			paddingRight: theme.spacing(6)
		},
		[theme.breakpoints.down("sm")]: {
			paddingLeft: theme.spacing(4),
			paddingRight: theme.spacing(4)
		},
		[theme.breakpoints.down("xs")]: {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2)
		},
		overflow: "hidden",
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1)
	},
	cardWrapper: {
		[theme.breakpoints.down("xs")]: {
			marginLeft: "auto",
			marginRight: "auto",
			maxWidth: 340
		}
	},
	cardWrapperHighlighted: {
		[theme.breakpoints.down("xs")]: {
			marginLeft: "auto",
			marginRight: "auto",
			maxWidth: 360
		}
	}
});

function PricingSection(props) {
	const {width, classes} = props;
	return (
		<Lazyload once={false} debounce={200} height={120} offset={-80}>
			<CSSTransition in={true} appear={true} classNames="bz-fade" timeout={Math.random()*150+350} unmountOnExit={true}>
				<div className="lg-p-top" style={{backgroundColor: "#FFFFFF"}}>
					<Typography variant="h3" align="center" className="lg-mg-bottom">
						Pricing
					</Typography>
					<div className={classNames("container-fluid", classes.containerFix)}>
						<Grid container spacing={calculateSpacing(width)} className={classes.gridContainer}>
							<Grid item xs={12} sm={6} lg={3} className={classes.cardWrapper}>
								<PriceCard title="Starter" pricing={
									<span>
                                $14.99
                                <Typography display="inline"> / month</Typography>
                            </span>
								} features={["Feature 1", "Feature 2", "Feature 3"]}
								/>
							</Grid>
							<Grid item className={classes.cardWrapperHighlighted} xs={12} sm={6} lg={3}>
								<PriceCard highlighted title="Premium" pricing={
									<span>
                                $29.99
                                <Typography display="inline"> / month</Typography>
                             </span>
								} features={["Feature 1", "Feature 2", "Feature 3"]}
								/>
							</Grid>
							<Grid item className={classes.cardWrapper} xs={12} sm={6} lg={3}>
								<PriceCard title="Business" pricing={
									<span>
                                $49.99
								<Typography display="inline"> / month</Typography>
                            </span>
								} features={["Feature 1", "Feature 2", "Feature 3"]}
								/>
							</Grid>
							<Grid item className={classes.cardWrapper} xs={12} sm={6} lg={3}>
								<PriceCard title="Tycoon" pricing={
									<span>
                                $99.99
                                <Typography display="inline"> / month</Typography>
                            </span>
								} features={["Feature 1", "Feature 2", "Feature 3"]}
								/>
							</Grid>
						</Grid>
					</div>
				</div>
			</CSSTransition>
		</Lazyload>
	);
}

PricingSection.propTypes = {
	width: PropTypes.string.isRequired
};

export default withStyles(styles, {withTheme: true})(
	withWidth()(PricingSection)
);
