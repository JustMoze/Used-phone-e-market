import React, { Fragment, useState, useEffect } from 'react';
import EditForm from './../common/editForm';
import Upload from '../common/upload';
import Line from '../common/line';
import httpService from '../services/httpService';

function EditPage(props) {
    const { id } = props.match.params;
    const [phone, setPhone] = useState({});

    // useEffect(() => {
    //     async function getEditablePhone(){
    //         const {data} =
    //     }
    // })
    return (
        <Fragment>
            <h1>Phone id: {id}</h1>
            <EditForm />
            <div style={{ padding: '8px' }}>
                <Line color="#ffcd38" />
            </div>

            <Upload />
        </Fragment>
    );
}

export default EditPage;
