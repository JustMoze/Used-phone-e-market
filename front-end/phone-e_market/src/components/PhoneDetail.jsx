import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { getPhone } from '../services/phoneServices';
import ImageSlider from '../common/imageSlider';
import CircularIndeterminate from '../common/CircularIndeterminate';
import PhoneTable from '../common/table';
import PhoneStateComponent from '../common/expansionPanel';

class PhoneDetail extends Component {
    constructor(props) {
        super();

        this.state = {
            loading: 'initial',
            phone: {},
            addToCart: false,
            goBack: false
        };
    }
    getData = () => {
        const { id } = this.props.match.params;
        const data = getPhone(id);
        return data;
    };
    componentDidMount() {
        this.setState({ loading: 'true' });
        this.getData().then((data) => {
            this.setState({
                phone: data.data,
                loading: 'false'
            });
        });
    }
    handleAddToCart = () => {
        this.setState({ addToCart: !this.state.addToCart });
    };
    handleBack = () => {
        this.props.history.goBack();
    };
    handleMouseOver = () => {
        this.setState({ goBack: true });
    };
    handleMouseOut = () => {
        this.setState({ goBack: false });
    };
    render() {
        const { addToCart, goBack } = this.state;
        const { loading, phone } = this.state;
        var cartIconStyle;
        var tooltipTitle;
        var backIconStyle;
        if (this.state.loading === 'initial') {
            return (
                <div
                    className="container-fluid"
                    style={{ textAlign: 'center' }}
                >
                    <CircularIndeterminate />
                </div>
            );
        }
        if (loading === 'true') {
            return (
                <div
                    className="container-fluid"
                    style={{ textAlign: 'center' }}
                >
                    <CircularIndeterminate />
                </div>
            );
        }
        if (addToCart) {
            cartIconStyle = {
                fontSize: 50,
                cursor: 'pointer',
                color: '#06623b'
            };
            tooltipTitle = 'Remove from cart';
        } else {
            cartIconStyle = {
                fontSize: 50,
                cursor: 'pointer'
            };
            tooltipTitle = 'Add to cart';
        }

        if (goBack) {
            backIconStyle = {
                fontSize: 50,
                cursor: 'pointer'
            };
        } else {
            backIconStyle = {
                fontSize: 27,
                cursor: 'pointer'
            };
        }

        return (
            <div style={{ flexGrow: 1 }}>
                <div style={{ paddingBottom: '2%' }}>
                    <ArrowBackIcon
                        onMouseOver={this.handleMouseOver}
                        onMouseOut={this.handleMouseOut}
                        onClick={this.handleBack}
                        style={backIconStyle}
                    />
                </div>
                <Grid container spacing={1} className="detailMainDiv">
                    <Grid item lg={6} md={12} xs={12}>
                        <PhoneTable phone={phone} />
                    </Grid>
                    <Grid item lg={6} md={12} xs={12}>
                        <ImageSlider images={phone.images} />
                    </Grid>
                    <Grid container spacing={9} style={{ paddingTop: '2%' }}>
                        <Grid item lg={8} md={10} xs={10}>
                            <PhoneStateComponent
                                label="Detail information: "
                                data={phone.state}
                            />
                        </Grid>
                        <Grid item lg={4} md={2} xs={2}>
                            <Tooltip title={tooltipTitle}>
                                <ShoppingBasketIcon
                                    onClick={this.handleAddToCart}
                                    style={cartIconStyle}
                                />
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default PhoneDetail;
