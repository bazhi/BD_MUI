import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

// colors
const black = "#343a40";
const darkBlack = "rgb(36, 40, 44)";

const bgColor = "#ee9f4f";

// border
const borderWidth = 2;
const borderHeight = 2;
const borderColor = "rgba(0, 0, 0, 0.13)";

// breakpoints
const xl = 1920;
const lg = 1280;
const md = 960;
const sm = 600;
const xs = 0;

// spacing
const spacing = 8;

const theme = createMuiTheme({
	palette: {
		primary: {main: "#b3294e"},
		secondary: {main: "#917ce0"},
		link: {main: "#582efc"},
		common: {
			black,
			darkBlack
		},
		warning: {
			light: "rgba(253, 200, 69, .3)",
			main: "rgba(253, 200, 69, .5)",
			dark: "rgba(253, 200, 69, .7)"
		},
		tonalOffset: 0.2,
		background: {
			default:  bgColor,
			wave : "#ff5200",
			topBar : "#FFFFFF",
			bottomBar : "#FFFFFF",
		},
		style:{
			default:{
				backgroundColor:bgColor,
				color:"#FFFFFF"
			},
			light:{
				backgroundColor:"#FFFFFF",
				color:"#000000"
			},
			dark:{
				backgroundColor:"#000000",
				color:"#FFFFFF"
			},
			card: {
				backgroundColor:"#EEEEEE",
				color:"#434343"
			},
			container:{
				backgroundColor:"#FFFFFF66",
				color:"#0e0b0b"
			}
		}
	},
	breakpoints: {
		values: {
			xl,
			lg,
			md,
			sm,
			xs
		}
	},
	border: {
		borderColor: borderColor,
		borderWidth: borderWidth
	},
	overrides: {
		MuiExpansionPanel: {
			root: {
				position: "static"
			}
		},
		MuiTableCell: {
			root: {
				paddingLeft: spacing * 2,
				paddingRight: spacing * 2,
				borderBottom: `${borderWidth}px solid ${borderColor}`,
				[`@media (max-width:  ${sm}px)`]: {
					paddingLeft: spacing,
					paddingRight: spacing
				}
			}
		},
		MuiDivider: {
			root: {
				backgroundColor: borderColor,
				height: borderHeight
			}
		},
		MuiPrivateNotchedOutline: {
			root: {
				borderWidth: borderWidth
			}
		},
		MuiListItem: {
			divider: {
				borderBottom: `${borderWidth}px solid ${borderColor}`
			}
		},
		MuiDialog: {
			paper: {
				width: "100%",
				maxWidth: 430,
				marginLeft: spacing,
				marginRight: spacing
			}
		},
		MuiTooltip: {
			tooltip: {
				backgroundColor: darkBlack
			}
		},
		MuiExpansionPanelDetails: {
			root: {
				[`@media (max-width:  ${sm}px)`]: {
					paddingLeft: spacing,
					paddingRight: spacing
				}
			}
		}
	},
	typography: {
		useNextVariants: true
	},
	
});

export default responsiveFontSizes(theme);
