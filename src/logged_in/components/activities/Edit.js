import React, { Fragment, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button } from "@material-ui/core";
import ActionPaper from "shared/components/ActionPaper";
import ButtonCircularProgress from "shared/components/ButtonCircularProgress";
import AddOptions from "logged_in/components/activities/AddOptions";

function Edit(props) {
    const {
        showMessage,
        onClose,
    } = props;

    const [files, setFiles] = useState([]);
    const [uploadAt, setUploadAt] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [cropperFile, setCropperFile] = useState(null);

    const acceptDrop = useCallback(
        (file) => {
            setFiles([file]);
        },
        [setFiles]
    );

    const onDrop = useCallback(
        (acceptedFiles, rejectedFiles) => {
            if (acceptedFiles.length + rejectedFiles.length > 1) {
                showMessage({
                    isErrorMessage: true,
                    text: "You cannot upload more than one file at once",
                });
            } else if (acceptedFiles.length === 0) {
                showMessage({
                    isErrorMessage: true,
                    text: "The file you wanted to upload isn't an image",
                });
            } else if (acceptedFiles.length === 1) {
                const file = acceptedFiles[0];
                file.preview = URL.createObjectURL(file);
                file.key = new Date().getTime();
                setCropperFile(file);
            }
        },
        [showMessage, setCropperFile]
    );

    const onCropperClose = useCallback(() => {
        setCropperFile(null);
    }, [setCropperFile]);

    const deleteItem = useCallback(() => {
        setCropperFile(null);
        setFiles([]);
    }, [setCropperFile, setFiles]);

    const onCrop = useCallback(
        (dataUrl) => {
            const file = {...cropperFile};
            file.preview = dataUrl;
            acceptDrop(file);
            setCropperFile(null);
        },
        [acceptDrop, cropperFile, setCropperFile]
    );

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
        <Fragment>
            <ActionPaper
                helpPadding
                maxWidth="md"
                content={
                    <AddOptions
                        files={files}
                        onDrop={onDrop}
                        deleteItem={deleteItem}
                        uploadAt={uploadAt}
                        onChangeUploadAt={setUploadAt}
                        onCrop={onCrop}
                        cropperFile={cropperFile}
                        onCropperClose={onCropperClose}
                    />
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
                            disabled={files.length === 0 || loading}
                        >
                            Upload {loading && <ButtonCircularProgress />}
                        </Button>
                    </Fragment>
                }
            />
        </Fragment>
    );
}

Edit.propTypes = {
    showMessage: PropTypes.func,
    onClose: PropTypes.func,
    data: PropTypes.object,
};

export default Edit;
