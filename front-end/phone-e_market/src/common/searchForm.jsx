import React from 'react';

function SearchForm(props) {
    const { type, placeholder } = props;
    return (
        <div className="form-inline d-flex justify-content-center md-form form-sm mt-2">
            <input
                className="form-control form-control-sm ml-3 w-75"
                type={type}
                placeholder={placeholder}
            ></input>
        </div>
    );
}

export default SearchForm;
