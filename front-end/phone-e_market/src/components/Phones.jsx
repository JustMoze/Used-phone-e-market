import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import SearchForm from '../common/searchForm';
import { getAllPhones } from '../services/phoneServices';
import MediaCard from './phoneCard';
import 'react-toastify/dist/ReactToastify.css';

function Phones(props) {
    const [phones, setPhones] = useState([]);
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
            <div className="container-fluid">
                <div className="row">
                    {phones.map((phone, index) => (
                        <div
                            key={index}
                            className="col-sm-12 col-md-6 col-lg-4"
                        >
                            <MediaCard
                                key={phone._id}
                                image={phone.images[0].path}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Phones;
