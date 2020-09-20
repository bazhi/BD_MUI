import React, {Fragment, useCallback, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Button, withStyles} from "@material-ui/core";
import palette from "../../../palette"
import {SketchPicker as ColorPicker} from "react-color";
import Typography from "@material-ui/core/Typography";
import Popper from "@material-ui/core/Popper";
import Paper from '@material-ui/core/Paper';
import Popover from "@material-ui/core/Popover";
import Slider from "@material-ui/core/Slider";

const styles = (theme) => ({});

function ToArray(Obj, Arr, parentKey) {
    let rightKey = parentKey;
    if (rightKey !== "") {
        rightKey += ".";
    }
    for (let key in Obj) {
        let newKey = rightKey + key;
        let item = Obj[key];
        if (typeof (item) === "object") {
            ToArray(item, Arr, newKey);
        } else {
            Arr.push({
                key: newKey,
                color: item
            });
        }
    }
}

function PaletteEdit(props) {
    const [paletteArray, setPaletteArray] = useState([]);
    const [bDisplayColorPicker, setDisplayColorPicker] = useState(false);
    const [colorIndex, setColorIndex] = useState(null);
    const [currentColor, setCurrentColor] = useState("#FFFFFF");
    const [anchorEl, setAnchorEl] = React.useState(null);

    const OnChangeColor = useCallback((index, value) => {
        if(index){
            let newPalette = paletteArray;
            newPalette[index].color = value;
            setPaletteArray(paletteArray);
        }
    }, [paletteArray]);

    const handleClick = useCallback((event, index) => {
        setAnchorEl(event.currentTarget);
        setColorIndex(index);
        setCurrentColor(paletteArray[index].color);
        setDisplayColorPicker(true);
    }, [paletteArray]);

    const handleClose = useCallback(() => {
        setDisplayColorPicker(false);
    }, [setDisplayColorPicker]);

    const handleChange = useCallback((color)=>{
        setCurrentColor(color);
    },[setCurrentColor])

    const handleChangeComplete = useCallback((color) => {
        OnChangeColor(colorIndex, color);
    }, [OnChangeColor, colorIndex]);

    useEffect(() => {
        let Arr = [];
        ToArray(palette, Arr, "");
        setPaletteArray(Arr);
    }, [setPaletteArray])

    return (
        <div>
            {
                paletteArray.map((item, index) => {
                    return (
                        <Button key={index}
                                onClick={(event) => {
                                    handleClick(event, index);
                                }}>
                            <Typography>
                                {item.key}
                            </Typography>
                        </Button>
                    );
                })
            }
            <Popover onClose={handleClose} open={bDisplayColorPicker} anchorEl={anchorEl}>
                <ColorPicker color={currentColor} onChange={handleChange} onChangeComplete={handleChangeComplete}/>
            </Popover>
        </div>
    )
}

PaletteEdit.propTypes = {
    classes: PropTypes.object,
    theme: PropTypes.object,
    data: PropTypes.object,
};

export default withStyles(styles, {withTheme: true})(PaletteEdit);