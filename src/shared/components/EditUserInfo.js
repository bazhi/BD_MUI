import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Typography, withStyles } from "@material-ui/core";
import ImageUpload from "shared/components/ImageUpload";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Delete from '@material-ui/icons/Delete';
import AddBox from '@material-ui/icons/AddBox';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const CellHeight = 150;

const styles = theme => ({
	size :{
		maxWidth:300,
	},
	fragment: {
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 10,
	},
	divider: {
		marginBottom: 4,
		marginTop: 4,
	}
});

function EditUserInfo(props) {
	const {classes, id} = props;
	
	return (
		<Paper variant="outlined" className={classes.size}>
			<Box className={classes.fragment}>
				<Grid container spacing={1} direction="column">
					<Grid item>
						<Grid container spacing={1} direction="row" alignItems={"center"}>
							<Grid item>
								<ImageUpload width={CellHeight} name={"上传头像"}>
								</ImageUpload>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container spacing={1} direction="column" justify={"space-between"}>
							<Grid item>
								<TextField label="Name" variant="outlined" size="small" fullWidth />
							</Grid>
							<Grid item>
								<TextField label="Title" variant="outlined" size="small" fullWidth />
							</Grid>
							<Grid item>
								<TextField label="Description" variant="outlined" size="small" fullWidth />
							</Grid>
							<Grid item>
								<TextField label="Description" multiline variant="outlined" size="small" rows={4} fullWidth />
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container spacing={1} direction="row" justify={"space-between"}>
							<Grid item>
								<Typography variant={"caption"} color={"secondary"}>
									ID:{id}
								</Typography>
							</Grid>
							<Grid item>
								<ButtonGroup size="small">
									<Button>
										<Delete color="primary" />
									</Button>
									<Button>
										<AddBox color="secondary" />
									</Button>
								</ButtonGroup>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</Paper>
	);
}

EditUserInfo.propTypes = {
	theme: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	id: PropTypes.number.isRequired,
}

export default withStyles(styles, {withTheme: true})(EditUserInfo);
