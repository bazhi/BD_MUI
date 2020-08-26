import React, { Fragment, useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button, Checkbox, FormControlLabel, FormHelperText, TextField, Typography, withStyles, } from "@material-ui/core";
import FormDialog from "../../../shared/components/FormDialog";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
import VisibilityPasswordTextField from "../../../shared/components/VisibilityPasswordTextField";

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
			setStatus("passwordsDontMatch");
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
			headline="用户注册"
			onFormSubmit={(e) => {
				e.preventDefault();
				register();
			}}
			hideBackdrop
			hasCloseIcon
			content={
				<Fragment>
					<TextField
						variant="outlined" margin="normal" required fullWidth error={status === "invalidEmail"}
						label="邮件地址" autoFocus autoComplete="off" type="email"
						onChange={() => {
							if (status === "invalidEmail") {
								setStatus(null);
							}
						}} FormHelperTextProps={{error: true}}
					/>
					<VisibilityPasswordTextField
						variant="outlined" margin="normal" required fullWidth
						error={
							status === "passwordTooShort" || status === "passwordsDontMatch"
						}
						label="密码" inputRef={registerPassword} autoComplete="off"
						onChange={() => {
							if (
								status === "passwordTooShort" ||
								status === "passwordsDontMatch"
							) {
								setStatus(null);
							}
						}}
						helperText={(() => {
							if (status === "passwordTooShort") {
								return "Create a password at least 6 characters long.";
							}
							if (status === "passwordsDontMatch") {
								return "Your passwords dont match.";
							}
							return null;
						})()}
						FormHelperTextProps={{error: true}} isVisible={isPasswordVisible} onVisibilityChange={setIsPasswordVisible}
					/>
					<VisibilityPasswordTextField
						variant="outlined" margin="normal" required fullWidth
						error={
							status === "passwordTooShort" || status === "passwordsDontMatch"
						}
						label="重复密码" inputRef={registerPasswordRepeat} autoComplete="off"
						onChange={() => {
							if (
								status === "passwordTooShort" ||
								status === "passwordsDontMatch"
							) {
								setStatus(null);
							}
						}}
						helperText={(() => {
							if (status === "passwordTooShort") {
								return "Create a password at least 6 characters long.";
							}
							if (status === "passwordsDontMatch") {
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
								我同意
								<span
									className={classes.link}
									onClick={isLoading ? null : openTermsDialog}
									tabIndex={0}
									role="button"
									onKeyDown={(event) => {
										// For screen readers listen to space and enter events
										if (
											(!isLoading && event.keyCode === 13) ||
											event.keyCode === 32
										) {
											openTermsDialog();
										}
									}}>
                                    {" "}
									用户协议
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
							In order to create an account, you have to accept our terms of
							service.
						</FormHelperText>
					)}
					{status === "accountCreated" ? (
						<HighlightedInformation>
							We have created your account. Please click on the link in the
							email we have sent to you before logging in.
						</HighlightedInformation>
					) : (
						<HighlightedInformation>
							同意用户协议之后才允许注册
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
					注&nbsp;&nbsp;&nbsp;&nbsp;册
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
