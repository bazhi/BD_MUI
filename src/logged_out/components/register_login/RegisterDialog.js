import React, { Fragment, useCallback, useRef, useState } from "react";
import intl from 'react-intl-universal';
import PropTypes from "prop-types";
import { Button, Checkbox, FormControlLabel, FormHelperText, TextField, Typography, withStyles, } from "@material-ui/core";
import FormDialog from "../../../shared/components/FormDialog";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
import VisibilityPasswordTextField from "../../../shared/components/VisibilityPasswordTextField";
import {ST_Register} from "../../../shared/Constants/StatusCommon"

const styles = (theme) => ({
	link: {
		transition: theme.transitions.create(["background-color"], {
			duration: theme.transitions.duration.complex,
			easing: theme.transitions.easing.easeInOut,
		}),
		cursor: "pointer",
		color: theme.palette.primary.main,
		"&:enabled:hover": {
			color: theme.palette.primary.dark,
		},
		"&:enabled:focus": {
			color: theme.palette.primary.dark,
		},
	},
});

function RegisterDialog(props) {
	const {setStatus, theme, onClose, openTermsDialog, status, classes} = props;
	const [isLoading, setIsLoading] = useState(false);
	const [hasTermsOfServiceError, setHasTermsOfServiceError] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const registerTermsCheckbox = useRef();
	const registerPassword = useRef();
	const registerPasswordRepeat = useRef();
	
	const register = useCallback(() => {
		if (!registerTermsCheckbox.current.checked) {
			setHasTermsOfServiceError(true);
			return;
		}
		if (
			registerPassword.current.value !== registerPasswordRepeat.current.value
		) {
			setStatus(ST_Register.passwordsDontMatch);
			return;
		}
		setStatus(null);
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, 1500);
	}, [
		setIsLoading,
		setStatus,
		setHasTermsOfServiceError,
		registerPassword,
		registerPasswordRepeat,
		registerTermsCheckbox,
	]);
	
	return (
		<FormDialog
			loading={isLoading}
			onClose={onClose}
			open
			headline={intl.get("Register")}
			onFormSubmit={(e) => {
				e.preventDefault();
				register();
			}}
			hideBackdrop
			hasCloseIcon
			content={
				<Fragment>
					<TextField
						variant="outlined" margin="normal" required fullWidth error={status === ST_Register.invalidEmail}
						label={intl.get("EmailAddress")} autoFocus autoComplete="off" type="email"
						onChange={() => {
							if (status === ST_Register.invalidEmail) {
								setStatus(null);
							}
						}} FormHelperTextProps={{error: true}}
					/>
					<VisibilityPasswordTextField
						variant="outlined" margin="normal" required fullWidth
						error={
							status === ST_Register.passwordTooShort || status === ST_Register.passwordsDontMatch
						}
						label={intl.get("Password")} inputRef={registerPassword} autoComplete="off"
						onChange={() => {
							if (
								status === ST_Register.passwordTooShort ||
								status === ST_Register.passwordsDontMatch
							) {
								setStatus(null);
							}
						}}
						helperText={(() => {
							if (status === ST_Register.passwordTooShort) {
								return "Create a password at least 6 characters long.";
							}
							if (status ===  ST_Register.passwordsDontMatch) {
								return "Your passwords dont match.";
							}
							return null;
						})()}
						FormHelperTextProps={{error: true}} isVisible={isPasswordVisible} onVisibilityChange={setIsPasswordVisible}
					/>
					<VisibilityPasswordTextField
						variant="outlined" margin="normal" required fullWidth
						error={
							status === ST_Register.passwordTooShort || status ===  ST_Register.passwordsDontMatch
						}
						label={intl.get("RepeatPwd")} inputRef={registerPasswordRepeat} autoComplete="off"
						onChange={() => {
							if (
								status === ST_Register.passwordTooShort ||
								status === ST_Register.passwordsDontMatch
							) {
								setStatus(null);
							}
						}}
						helperText={(() => {
							if (status === ST_Register.passwordTooShort) {
								return "Create a password at least 6 characters long.";
							}
							if (status === ST_Register.passwordsDontMatch) {
								return "Your passwords dont match.";
							}
						})()}
						FormHelperTextProps={{error: true}} isVisible={isPasswordVisible} onVisibilityChange={setIsPasswordVisible}
					/>
					<FormControlLabel
						style={{marginRight: 0}}
						control={
							<Checkbox
								color="primary"
								inputRef={registerTermsCheckbox}
								onChange={() => {
									setHasTermsOfServiceError(false);
								}}
							/>
						}
						label={
							<Typography variant="body1">
								{intl.get("IAgree")}
								<span className={classes.link} onClick={isLoading ? null : openTermsDialog}
								      tabIndex={0} role="button" onKeyDown={(event) => {
									if (
										(!isLoading && event.keyCode === 13) ||
										event.keyCode === 32
									) {
										openTermsDialog();
									}
								}}>
                                    {" "}
									{intl.get("TermsService")}
                                 </span>
							</Typography>
						}
					/>
					{hasTermsOfServiceError && (
						<FormHelperText
							error
							style={{
								display: "block",
								marginTop: theme.spacing(-1),
							}}>
							{intl.get("AgreeTips")}
						</FormHelperText>
					)}
					{status === "accountCreated" ? (
						<HighlightedInformation>
							We have created your account. Please click on the link in the
							email we have sent to you before logging in.
						</HighlightedInformation>
					) : (
						<HighlightedInformation>
							{intl.get("AgreeTipsContent")}
						</HighlightedInformation>
					)}
				</Fragment>
			}
			actions={
				<Button
					type="submit"
					fullWidth
					variant="contained"
					size="large"
					color="secondary"
					disabled={isLoading}
				>
					<Typography variant="h6">注&nbsp;&nbsp;&nbsp;&nbsp;册</Typography>
					{isLoading && <ButtonCircularProgress />}
				</Button>
			}
		/>
	);
}

RegisterDialog.propTypes = {
	theme: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
	openTermsDialog: PropTypes.func.isRequired,
	status: PropTypes.string,
	setStatus: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(RegisterDialog);
