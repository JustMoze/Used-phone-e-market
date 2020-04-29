import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import EuroIcon from '@material-ui/icons/Euro';
import Typography from '@material-ui/core/Typography';
import logger from '../services/logService';
import EditICON from './../common/editIcon';
import CartICON from './../common/cartIcon';
import InfoICON from './../common/infoIcon.jsx';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '70%',
        minWidth: 345,
        margin: 'auto',
        marginTop: '4%',
        marginBottom: '4%',
        border: 'solid',
        borderColor: 'dark',
        borderRadius: '25px'
    },
    media: {
        height: 200,
        borderBottom: 'solid'
    },
    CardActions: {
        backgroundColor: '#49B58F'
    }
}));

export default function MediaCard(props) {
    const classes = useStyles();
    const { image, phone, smallScreen } = props;
    const { brand, model, state, price } = phone;
    // functions -----------------------------------------------------------------------------
    function handleCartIconClick() {
        console.log('Cart icon was clicked');
    }
    function handleInfoIconClick() {
        props.history.push(`/phones/${phone._id}`);
    }
    function handleEditIconClick() {
        props.history.push(`/phones/edit/${phone._id}`);
    }

    function formatText(text) {
        var formatString = '';
        if (text.length > 190) {
            formatString = text.substring(0, 187) + '...';
            return formatString;
        }
        return text;
    }
    function formatTitle(model, brand) {
        try {
            var title = model + ' ' + brand;
            if (title.length > 24) {
                title = title.substring(0, 21) + '...';
            }
            return title;
        } catch (ex) {
            logger.log(ex);
        }
    }
    // functions -----------------------------------------------------------------------------
    return (
        <Card
            className={classes.root}
            style={smallScreen ? { minWidth: 200 } : { minWidth: 345 }}
        >
            <CardActionArea>
                <CardMedia className={classes.media} image={image} />
                <CardContent className="card-content">
                    <Typography gutterBottom variant="h5" component="h2">
                        {formatTitle(model, brand)}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {formatText(state)}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className="action_bar">
                <div style={{ display: 'contents' }}>
                    <h4>{price} </h4>{' '}
                    <EuroIcon style={{ paddingBottom: '1%' }} />
                </div>
                <div className="container-fluid card-icons">
                    <CartICON onClick={handleCartIconClick} />
                    <InfoICON onClick={handleInfoIconClick} />
                    <EditICON onClick={handleEditIconClick} />
                </div>
            </CardActions>
        </Card>
    );
}
