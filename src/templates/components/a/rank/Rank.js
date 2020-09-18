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
import AxiosCache from "shared/components/AxiosCache";
import Typography from "@material-ui/core/Typography";

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
		marginTop: theme.spacing(4),
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
	const {classes, actionID, userTheme} = props
	
	const [userData, setUserData] = useState(null);
	
	const LoadData = useCallback((id) => {
		AxiosCache({
			url: `/data/${id}/rank.json`,
			method: 'get'
		}).then(function (res) {
			setUserData(res.data);
		}).catch(function (error) {
			console.log(error);
		});
	}, [setUserData]);
	
	useEffect(() => {
		LoadData(actionID);
	}, [LoadData, actionID]);
	
	return (
		<Fragment>
			{userData && (
				<div className={classNames("lg-p-top", classes.wrapper)}>
					<div className={classNames("container-fluid", classes.container)}>
						<Typography variant="h3" align="center" style={{color:userTheme.default.color}}>
							{userData.title}
						</Typography>
						<Box display="flex" justifyContent="center" className="column">
							<TableContainer component={Paper} className={classes.table}>
								<Table aria-label="customized table" align={"center"}>
									<TableHead>
										<TableRow>
											<StyledTableCell>名称</StyledTableCell>
											<StyledTableCell align="right">排名</StyledTableCell>
											<StyledTableCell align="right">简介</StyledTableCell>
											<StyledTableCell align="right">赞</StyledTableCell>
											<StyledTableCell align="right">票数</StyledTableCell>
										
										</TableRow>
									</TableHead>
									<TableBody>
										{userData.list && userData.list.map((row) => (
											<StyledTableRow key={row.name}>
												<StyledTableCell component="th" scope="row">
													{row.name}
												</StyledTableCell>
												<StyledTableCell align="right">{row.brief}</StyledTableCell>
												<StyledTableCell align="right">{row.fat}</StyledTableCell>
												<StyledTableCell align="right">{row.carbs}</StyledTableCell>
												<StyledTableCell align="right">{row.protein}</StyledTableCell>
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
	userTheme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(Rank)
