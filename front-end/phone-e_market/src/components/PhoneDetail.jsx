import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { getPhone } from '../services/phoneServices';
import ImageSlider from '../common/imageSlider';
import CircularIndeterminate from '../common/CircularIndeterminate';

class PhoneDetail extends Component {
    constructor(props) {
        super();

        this.state = {
            loading: 'initial',
            phone: {}
        };
    }
    getData = () => {
        const { id } = this.props.match.params;
        const data = getPhone(id);
        return data;
    };
    componentDidMount() {
        console.log('cdm');
        this.setState({ loading: 'true' });
        this.getData().then((data) => {
            this.setState({
                phone: data.data,
                loading: 'false'
            });
        });
    }
    render() {
        const { loading, phone } = this.state;
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
        return (
            <div style={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <h1>What sup</h1>
                    </Grid>
                    <Grid item lg={6} md={12} xs={12}>
                        <ImageSlider images={phone.images} />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default PhoneDetail;
