import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function SaveDialog(props) {
    const { handleClose, open, handleClickSave } = props;
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    id="alert-dialog-title"
                    style={{ backgroundColor: '#cccebd' }}
                >
                    {'Without an upload - NO IMAGES!'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        If you didn't upload pictures your phone will be
                        presented with default image and in the detail page, it
                        won't have any pictures.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        style={{ backgroundColor: '#ffcd38' }}
                    >
                        Go back
                    </Button>
                    <Button
                        onClick={handleClickSave}
                        style={{ backgroundColor: '#9bdf46' }}
                        autoFocus
                    >
                        Understood
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SaveDialog;
