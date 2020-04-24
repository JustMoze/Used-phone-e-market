import React from 'react';
import SearchForm from '../common/searchForm';

function Phones(props) {
    return (
        <div className="container">
            <SearchForm type="text" placeholder="Search" />
        </div>
    );
}

export default Phones;
