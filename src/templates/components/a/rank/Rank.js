import { Box, withStyles } from "@material-ui/core";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import {AxiosNoCache} from "shared/components/AxiosCache";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";

const StyledBadge = withStyles((theme) => ({
	badge: {},
}))(Badge);

const styles = (theme) => ({
	wrapper: {
		position: "relative",
		paddingBottom: theme.spacing(1),
	},
	container: {
		marginTop: theme.spacing(0),
		marginBottom: theme.spacing(0),
	},
	item: {
		paddingTop: theme.spacing(1),
	},
	table: {
		maxWidth: 800,
		marginTop: theme.spacing(2),
	},
});

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

function Rank(props) {
	const {classes, actionID} = props
	
	const [userData, setUserData] = useState(null);
	
	const LoadData = useCallback((id) => {
		AxiosNoCache({
			url: `/data/${id}/rank.json`,
			method: 'get'
		}).then(function (res) {
			let data = res.data;
			if (data.list) {
				data.list.sort(function (a, b) {
					return (b.vote + b.favour * data.favourScore) - (a.vote + a.favour * data.favourScore);
				});
			}
			setUserData(data);
		}).catch(function (error) {
			console.log(error);
		});
	}, [setUserData]);
	
	useEffect(() => {
		LoadData(actionID);
	}, [LoadData, actionID]);
	
	const GetRankColor = useCallback((index) => {
		if (index === 0) {
			return "primary";
		} else if (index === 1) {
			return "secondary"
		} else if (index === 2) {
			return "error";
		}
		return "default";
	}, []);
	
	return (
		<Fragment>
			{userData && (
				<div className={classNames("lg-p-top", classes.wrapper)}>
					<div className={classNames("container-fluid", classes.container)}>
						<Typography variant="h3" align="center">
							{userData.title}
						</Typography>
						<Box display="flex" justifyContent="center" className="column">
							<TableContainer component={Paper} className={classes.table}>
								<Table aria-label="customized table" align={"center"}>
									<TableHead>
										<TableRow>
											<StyledTableCell align="center">排名</StyledTableCell>
											<StyledTableCell align="center">名称</StyledTableCell>
											<StyledTableCell align="center">编号</StyledTableCell>
											<StyledTableCell align="center">赞</StyledTableCell>
											<StyledTableCell align="center">票数</StyledTableCell>
											<StyledTableCell align="center">总计</StyledTableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{userData.list && userData.list.map((row, index) => (
											<StyledTableRow key={index}>
												<StyledTableCell align="center" component="th" scope="row">
													<StyledBadge badgeContent={index + 1} color={GetRankColor(index)} anchorOrigin={{vertical: 'top', horizontal: 'left'}}>
														<Avatar alt="Remy Sharp" src={row.image} />
													</StyledBadge>
												</StyledTableCell>
												<StyledTableCell align="center">{row.name}</StyledTableCell>
												<StyledTableCell align="center">{row.id}</StyledTableCell>
												<StyledTableCell align="center">{row.favour}</StyledTableCell>
												<StyledTableCell align="center">{row.vote}</StyledTableCell>
												<StyledTableCell align="center">{row.vote + row.favour * userData.favourScore}</StyledTableCell>
											</StyledTableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Box>
					</div>
				</div>
			)}
		</Fragment>
	);
}

Rank.propTypes = {
	theme: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	actionID: PropTypes.string.isRequired,
};

export default withStyles(styles, {withTheme: true})(Rank)
