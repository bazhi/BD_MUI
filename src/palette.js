const black = "#343a40";
const darkBlack = "rgb(36, 40, 44)";
const bgColor = "#ee9f4f";

const palette = {
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
}

export default palette;