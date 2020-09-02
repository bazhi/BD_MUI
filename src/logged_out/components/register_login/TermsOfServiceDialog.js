import React, { Component } from "react";
import PropTypes from "prop-types";
import intl from 'react-intl-universal';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, withStyles } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ColoredButton from "../../../shared/components/ColoredButton";
import lodash from "lodash";
import SUPPORT_LOCALES from "../../../shared/components/SupportLocales";
import axios from "axios";

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
	state = {Service: null}
	
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
		const url = `/locales/${currentLocale}-service.json`;
		let self = this;
		axios.get(url).then(function (res) {
			self.setState({Service: res.data})
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
        if(this.state.Service){
          Info = this.state.Service;
        }
		return (
            this.state.Service &&
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

/*
 function TermsOfServiceDialog(props) {
 const { classes, onClose, theme } = props;
 function ShowItem(Item, Index, Deep)
 {
 return (
 <div key={Index + "_" + Deep}>
 {
 Item.Head && <Typography variant={VariantList[Deep]} color="primary" paragraph>
 {Item.Head}
 </Typography>
 }
 {
 Item.Text && <Typography className={classes.termsConditionsItem} paragraph>
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 {Item.Text}
 </Typography>
 }
 {
 Item.List && Item.List.map((Item, Index) =>{
 return  ShowItem(Item, Index, Deep + 1)
 })
 }
 </div>
 );
 }
 const Info = intl.get("TermsServiceContent");
 return (
 <Dialog open scroll="paper" onClose={onClose} hideBackdrop>
 <DialogTitle>
 {Info && Info.Head}
 </DialogTitle>
 <DialogContent>
 {
 Info.List && Info.List.map((Item, Index) =>{
 return  ShowItem(Item, Index, 0)
 })
 }
 </DialogContent>
 <DialogActions className={classes.dialogActions}>
 <ColoredButton
 onClick={onClose}
 variant="contained"
 color={theme.palette.common.black}
 >
 <ArrowBackIcon className={classes.backIcon} />
 Back
 </ColoredButton>
 </DialogActions>
 </Dialog>
 );
 }*/

TermsOfServiceDialog.propTypes = {
	classes: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
	theme: PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(TermsOfServiceDialog);
