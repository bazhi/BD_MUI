import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Box, Divider, Grid, Input, Typography, withStyles } from "@material-ui/core";
import ImageUpload from "shared/components/ImageUpload";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Delete from '@material-ui/icons/Delete';
import AddBox from '@material-ui/icons/AddBox';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const CellHeight = 150;

const styles = theme => ({
	content:{
		height:CellHeight,
	},
	fragment:{
		marginTop:10,
		marginLeft:10,
		marginRight:10,
		marginBottom:10,
	},
	divider:{
		marginBottom:4,
		marginTop: 4,
	}
});

function EditUserInfo(props) {
	const {classes, id} = props;
	
	return (
		<Paper variant="outlined">
			<Box className={classes.fragment}>
				<Typography variant={"caption"} color={"secondary"}>
					ID:{id}
				</Typography>
				<Divider className={classes.divider}/>
				<Grid container spacing={3}  direction="row">
					<Grid item xl={3}>
						<ImageUpload width={CellHeight} name={"上传头像"}>
						</ImageUpload>
					</Grid>
					<Grid item xl={3}>
						<Box className={classes.content}>
							<Grid container spacing={1}  direction="column" justify={"space-between"}>
								<Grid item>
									<TextField label="Name" variant="outlined" size="small"/>
								</Grid>
								<Grid item>
									<TextField label="Title" variant="outlined" size="small"/>
								</Grid>
								<Grid item>
									<TextField label="Description" variant="outlined" size="small"/>
								</Grid>
							</Grid>
						</Box>
					</Grid>
					<Grid item xl={6}>
						<Grid item>
							<TextField label="Description" multiline variant="outlined" size="small" rows={6} fullWidth/>
						</Grid>
					</Grid>
				</Grid>
				<Divider className={classes.divider}/>
				<Grid container justify={"flex-end"}>
					<ButtonGroup size="small">
						<Button>
							<Delete color="primary"/>
						</Button>
						<Button>
							<AddBox color="secondary"/>
						</Button>
					</ButtonGroup>
				</Grid>
			</Box>
		</Paper>
	);
}

EditUserInfo.propTypes = {
	theme: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	id:PropTypes.number.isRequired,
}

export default withStyles(styles, {withTheme: true})(EditUserInfo);
