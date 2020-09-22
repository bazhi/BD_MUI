import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Box, Divider, Grid, Input, Typography, withStyles } from "@material-ui/core";
import ImageUpload from "shared/components/ImageUpload";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

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
		marginBottom:10,
	}
});



function EditUserInfo(props) {
	const {classes} = props;
	
	return (
		<Paper variant="outlined">
			<Box className={classes.fragment}>
				<Typography variant={"body1"}>
					0001
				</Typography>
				<Divider className={classes.divider}/>
				<Grid container spacing={3}  direction="row">
					<Grid item xl={4}>
						<ImageUpload width={CellHeight} name={"上传头像"}>
						</ImageUpload>
					</Grid>
					<Grid item xl={4}>
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
					<Grid item xl={4}>
						<Box className={classes.content}>
							<Grid container spacing={1}  direction="column" justify={"space-between"}>
					
								<Grid item>
									<TextField label="Title2" variant="outlined" size="small"/>
								</Grid>
								<Grid item>
									<TextField label="Description1" variant="outlined" size="small"/>
								</Grid>
							</Grid>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Paper>
	);
}

EditUserInfo.propTypes = {
	theme: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles, {withTheme: true})(EditUserInfo);
