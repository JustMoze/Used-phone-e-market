import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SearchForm from '../common/searchForm';
import MediaCard from './phoneCard';
import Pagination from '../common/pagination';
import { getAllPhones } from '../services/phoneServices';
import { paginate } from '../utils/paginate';
import defaultImage from '../images/defaultPhone.jpg';
import FilterOptions from '../common/filterOptions';
import Title from '../common/title';
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
    const [pageSize] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterName, setFilterName] = useState('all');
    const { smallScreen, user, history } = props;
    const classes = useStyles();
    useEffect(() => {
        async function getPhones() {
            const { data: allphones } = await getAllPhones();
            setPhones(allphones);
        }
        getPhones();
    }, [history]);
    function handlePageChange(page) {
        setCurrentPage(page);
    }
    function handleFilterClick(name) {
        setFilterName(name);
    }
    function filterPhones() {
        const phonesToFilter = [...phones];
        if (filterName === 'game') {
            return phonesToFilter.filter(
                (phone) =>
                    phone.screenSize > 6 &&
                    phone.RAMsize >= 4 &&
                    phone.storageSize >= 128
            );
        } else if (filterName === 'cheap') {
            return phonesToFilter.sort(
                (phone1, phone2) => phone1.price - phone2.price
            );
        } else return null;
    }
    //----------------------------------------------------------
    const paginatedPhones = paginate(
        filterPhones() || phones,
        currentPage,
        pageSize
    );
    return (
        <div>
            <div className="container">
                <ToastContainer />
                <SearchForm type="text" placeholder="Search" />
            </div>
            <Title />
            <FilterOptions
                onClick={handleFilterClick}
                filterName={filterName}
            />
            <Grid container className={classes.root}>
                {paginatedPhones.map((phone, index) => (
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
                                user={user}
                                history={history}
                                phone={phone}
                                smallScreen={smallScreen}
                                className={classes.control}
                                key={phone._id}
                                image={
                                    phone.images.length > 0
                                        ? phone.images[0].path
                                        : defaultImage
                                }
                            />
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            <Pagination
                itemsCount={phones.length}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                currentPage={currentPage}
            />
        </div>
    );
}
Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};
export default Phones;
