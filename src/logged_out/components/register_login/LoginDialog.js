import React, { Fragment, useCallback, useRef, useState } from "react";
import intl from 'react-intl-universal';
import PropTypes from "prop-types";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import { Button, Checkbox, FormControlLabel, TextField, Typography, withStyles, } from "@material-ui/core";
import FormDialog from "shared/components/FormDialog";
import HighlightedInformation from "shared/components/HighlightedInformation";
import ButtonCircularProgress from "shared/components/ButtonCircularProgress";
import VisibilityPasswordTextField from "shared/components/VisibilityPasswordTextField";
import {ST_Login} from "shared/constants/StatusCommon";
import axios from "axios";
import * as ActionTypes from "shared/constants/ActionType";
import * as URL from "shared/constants/Url";
import * as Key from "shared/constants/Keyword"
import storage from "shared/storage/local";

const styles = (theme) => ({
	forgotPassword: {
		marginTop: theme.spacing(2),
		color: theme.palette.link.main,
		cursor: "pointer",
		"&:enabled:hover": {
			color: theme.palette.primary.dark,
		},
		"&:enabled:focus": {
			color: theme.palette.primary.dark,
		},
	},
	disabledText: {
		cursor: "auto",
		color: theme.palette.text.disabled,
	},
	formControlLabel: {
		marginRight: 0,
	},
});

function LoginDialog(props) {
	const {
		setStatus,
		history,
		classes,
		onClose,
		openChangePasswordDialog,
		status,
	} = props;
	const [isLoading, setIsLoading] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const loginEmail = useRef();
	const loginPassword = useRef();
	
	const onLoginSuccess = useCallback((info)=>{
		setTimeout(() => {
			history.push(URL.Dashboard);
		}, 150);
		storage.set(Key.UserName, info.username);
	}, [history]);
	
	const login = useCallback(() => {
		setIsLoading(true);
		setStatus(null);
		
		axios.post(ActionTypes.LOGIN,{
			username:loginEmail.current.value,
			password:loginPassword.current.value
		}).then(function (resp){
			if(resp.err === 1){
				setTimeout(() => {
					setStatus(ST_Login.invalidEmail);
					setIsLoading(false);
				}, 1500);
			}else if(resp.err === 2){
				setTimeout(() => {
					setStatus(ST_Login.invalidPassword);
					setIsLoading(false);
				}, 1500);
			}else if(resp.err === 0){
				onLoginSuccess({
					username : loginEmail.current.value
				});
			}
		}).catch(function (error){
			onLoginSuccess({
				username : loginEmail.current.value
			});
		})
	}, [setIsLoading, loginEmail, loginPassword, setStatus, onLoginSuccess]);
	
	return (
		<Fragment>
			<FormDialog
				open
				onClose={onClose}
				loading={isLoading}
				onFormSubmit={(e) => {
					e.preventDefault();
					login();
				}}
				hideBackdrop
				headline={intl.get("SignIn")}
				content={
					<Fragment>
						<TextField variant="outlined" margin="normal" error={status === ST_Login.invalidEmail} required fullWidth
						           label={intl.get("EmailAddress")} inputRef={loginEmail} autoFocus autoComplete="off" type="email"
						           onChange={() => {
							           if (status === ST_Login.invalidEmail) {
								           setStatus(null);
							           }
						           }}
						           helperText={
							           status === ST_Login.invalidEmail && intl.get("InvalidEmail")
						           }
						           FormHelperTextProps={{error: true}}
						/>
						<VisibilityPasswordTextField
							variant="outlined" margin="normal" required fullWidth error={status === ST_Login.invalidPassword}
							label={intl.get("Password")} inputRef={loginPassword} autoComplete="off"
							onChange={() => {
								if (status === ST_Login.invalidPassword) {
									setStatus(null);
								}
							}}
							helperText={
								status === ST_Login.invalidPassword && intl.getHTML("PasswordError")
							}
							FormHelperTextProps={{error: true}}
							onVisibilityChange={setIsPasswordVisible}
							isVisible={isPasswordVisible}
						/>
						
						<FormControlLabel
							className={classes.formControlLabel}
							control={<Checkbox color="primary" />}
							label={<Typography variant="body1"> {intl.get("RememberMe")}</Typography>}
						/>
						
						{status === ST_Login.verificationEmailSend &&
							<HighlightedInformation>
								{intl.get("VerificationEmailSend")}
							</HighlightedInformation>
						}
					</Fragment>
				}
				actions={
					<Fragment>
						<Button type="submit" fullWidth variant="contained" color="secondary" disabled={isLoading} size="large">
							<Typography variant="h6"> {intl.getHTML("SignIn_Width")} </Typography>
							{isLoading && <ButtonCircularProgress />}
						</Button>
						<Typography
							align="center"
							className={classNames(
								classes.forgotPassword,
								isLoading ? classes.disabledText : null
							)}
							color="primary" onClick={isLoading ? null : openChangePasswordDialog} tabIndex={0} role="button" onKeyDown={(event) => {
							if (
								(!isLoading && event.keyCode === 13) ||
								event.keyCode === 32
							) {
								openChangePasswordDialog();
							}
						}}>
							{intl.getHTML("ForgetPassword")}?
						</Typography>
					</Fragment>
				}
			/>
		</Fragment>
	);
}

LoginDialog.propTypes = {
	classes: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
	setStatus: PropTypes.func.isRequired,
	openChangePasswordDialog: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	status: PropTypes.string,
};

export default withRouter(withStyles(styles)(LoginDialog));
