import React, {Fragment, useCallback, useState} from "react";
import PropTypes from "prop-types";
import {Box, Button} from "@material-ui/core";
import ActionPaper from "shared/components/ActionPaper";
import ButtonCircularProgress from "shared/components/ButtonCircularProgress";
import AddOptions from "logged_in/components/activities/AddOptions";
import PaletteEdit from "./PaletteEdit";

function Edit(props) {
    const {
        showMessage,
        onClose,
        data,
    } = props;
    
    const [loading, setLoading] = useState(false);

    const handleUpload = useCallback(() => {
        setLoading(true);
        setTimeout(() => {
            showMessage({
                text: "Your post has been uploaded",
            });
            onClose();
        }, 1500);
    }, [setLoading, onClose, showMessage]);

    return (
        <ActionPaper
            helpPadding
            maxWidth="md"
            content={
                <div>
                    {
                        data && <PaletteEdit/>
                    }
                    <AddOptions />
                </div>
            }
            actions={
                <Fragment>
                    <Box mr={1}>
                        <Button onClick={onClose} disabled={loading}>
                            Back
                        </Button>
                    </Box>
                    <Button
                        onClick={handleUpload}
                        variant="contained"
                        color="secondary"
                        disabled={loading}
                    >
                        Upload {loading && <ButtonCircularProgress />}
                    </Button>
                </Fragment>
            }
        />
    );
}

Edit.propTypes = {
    showMessage: PropTypes.func,
    onClose: PropTypes.func,
    data: PropTypes.object,
};

export default Edit;
