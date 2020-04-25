import React from 'react';
import SearchForm from '../common/searchForm';
import Upload from '../common/upload';

function Phones(props) {
    return (
        <div className="container">
            <SearchForm type="text" placeholder="Search" />
            <Upload />
        </div>
    );
}

export default Phones;
