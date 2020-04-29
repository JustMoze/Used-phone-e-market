import React, { Fragment } from 'react';
import EditForm from './../common/editForm';
import Upload from '../common/upload';
import Line from '../common/line';

function EditPage(props) {
    const { id } = props.match.params;
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
