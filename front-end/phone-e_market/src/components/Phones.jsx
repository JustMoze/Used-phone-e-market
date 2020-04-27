import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SearchForm from '../common/searchForm';
import MediaCard from './phoneCard';
import Line from '../common/line';
import { getAllPhones } from '../services/phoneServices';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        control: {
            padding: theme.spacing(1)
        }
    })
);

function Phones(props) {
    const [phones, setPhones] = useState([]);
    const { smallScreen } = props;
    const classes = useStyles();
    useEffect(() => {
        async function getPhones() {
            const { data: allphones } = await getAllPhones();
            console.log(allphones);
            setPhones(allphones);
        }
        getPhones();
    }, []);
    return (
        <div>
            <div className="container">
                <ToastContainer />
                <SearchForm type="text" placeholder="Search" />
            </div>
            <Line color="#ffcd38" />
            <Grid container className={classes.root}>
                {phones.map((phone, index) => (
                    <Grid
                        key={index}
                        container
                        item
                        lg={4}
                        md={6}
                        xs={12}
                        justify="center"
                    >
                        <Grid key={index} item>
                            <MediaCard
                                phone={phone}
                                smallScreen={smallScreen}
                                className={classes.control}
                                key={phone._id}
                                image={phone.images[0].path}
                            />
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Phones;
