import React, { Component } from "react";
import PropTypes from "prop-types";
import intl from 'react-intl-universal';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, withStyles } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ColoredButton from "../../../shared/components/ColoredButton";
import lodash from "lodash";
import SUPPORT_LOCALES from "../../../shared/components/SupportLocales";

import AxiosCache from "../../../shared/components/AxiosCache"

const styles = theme => ({
	termsConditionsItem: {
		marginLeft: theme.spacing(1),
		marginTop: theme.spacing(1)
	},
	dialogActions: {
		justifyContent: "flex-end",
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		paddingRight: theme.spacing(2)
	},
	backIcon: {
		marginRight: theme.spacing(1)
	},
});

const VariantList = [
	"h4",
	"h5",
	"h6",
	"h6",
	"h6",
	"h6",
	"h6",
	"h6",
	"h6",
]

class TermsOfServiceDialog extends Component {
	state = {service: null}
	
	componentDidMount() {
		this.loadLocales();
	}
	loadLocales() {
		let currentLocale = intl.determineLocale({
			urlLocaleKey: 'lang',
			cookieLocaleKey: 'lang'
		});
		
		if (!lodash.find(SUPPORT_LOCALES, {value: currentLocale})) {
			currentLocale = 'zh-CN';
		}
		let self = this;
		AxiosCache({
			url: `/locales/${currentLocale}-service.json`,
			method : 'get'
		}).then(function (res) {
			self.setState({service: res.data})
		}).catch(function (error) {
			console.log(error);
		});
	}
	
	ShowItem(Item, Index, Deep) {
		return (
			<div key={Index + "_" + Deep}>
				{
					Item.Head && <Typography variant={VariantList[Deep]} color="primary" paragraph>
						{Item.Head}
					</Typography>
				}
				{
					Item.Text && <Typography className={this.props.classes.termsConditionsItem} paragraph>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						{Item.Text}
					</Typography>
				}
				{
					Item.List && Item.List.map((Item, Index) => {
						return this.ShowItem(Item, Index, Deep + 1)
					})
				}
			</div>
		);
	}
	
	render() {
        let Info;
        if(this.state.service){
          Info = this.state.service;
        }
		return (
            this.state.service &&
			<Dialog open scroll="paper" onClose={this.props.onClose} hideBackdrop>
				<DialogTitle>
					{Info && Info.Head}
				</DialogTitle>
				<DialogContent>
					{
						Info.List && Info.List.map((Item, Index) => {
							return this.ShowItem(Item, Index, 0)
						})
					}
				</DialogContent>
				<DialogActions className={this.props.classes.dialogActions}>
					<ColoredButton
						onClick={this.props.onClose}
						variant="contained"
						color={this.props.theme.palette.common.black}
					>
						<ArrowBackIcon className={this.props.classes.backIcon} />
						Back
					</ColoredButton>
				</DialogActions>
			</Dialog>
		);
	}
}

TermsOfServiceDialog.propTypes = {
	classes: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
	theme: PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(TermsOfServiceDialog);
