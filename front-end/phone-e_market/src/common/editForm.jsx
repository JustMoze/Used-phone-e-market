import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormTextField from './formTextField';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    margin: {
        margin: theme.spacing(1)
    },
    withoutLabel: {
        marginTop: theme.spacing(3)
    },
    textField: {
        width: '25ch'
    }
}));

export default function EditForm() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item lg={6} md={12} xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={4} md={6}>
                            <FormTextField
                                label="Phone's model"
                                unit=""
                                id="model"
                            />
                        </Grid>
                        <Grid item xs={12} lg={4} md={6}>
                            <FormTextField
                                label="Phone's brand"
                                unit=""
                                id="brand"
                            />
                        </Grid>
                        <Grid item xs={12} lg={4} md={6}>
                            <FormTextField
                                label="Sreen size"
                                unit="Inch"
                                id="screen"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={6} md={6}>
                            <FormTextField
                                label="RAM's size"
                                unit="RAM"
                                id="RAM"
                            />
                        </Grid>
                        <Grid item xs={12} lg={6} md={6}>
                            <FormTextField
                                label="Storage size"
                                unit="GB"
                                id="storage"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={6} md={6}>
                            <FormTextField label="Color" unit="" id="color" />
                        </Grid>
                        <Grid item xs={12} lg={6} md={6}>
                            <FormTextField label="Price" unit="€" id="price" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={6} md={12} xs={12} style={{ padding: '20px' }}>
                    <TextField
                        style={{ height: '100%' }}
                        label="Detail information: "
                        rows="5"
                        multiline
                        fullWidth={true}
                        variant="filled"
                    />
                </Grid>
            </Grid>
        </div>
    );
}
