import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1)
    },
    textField: {
        width: '25ch'
    }
}));

function FormTextField(props) {
    const classes = useStyles();
    const { label, unit, id } = props;
    return (
        <TextField
            label={label}
            id={id}
            className={clsx(classes.margin, classes.textField)}
            style={{ width: '100%' }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">{unit}</InputAdornment>
                )
            }}
            variant="filled"
        />
    );
}

export default FormTextField;
