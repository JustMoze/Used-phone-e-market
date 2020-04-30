import React, { Fragment, useState, useEffect } from 'react';
import Joi from 'joi-browser';
import EditForm from './../common/editForm';
import Upload from '../common/upload';
import Line from '../common/line';
import { getPhone } from '../services/phoneServices';
import CircularIndeterminate from '../common/CircularIndeterminate';

function EditPage(props) {
    const { id } = props.match.params;
    const [phone, setPhone] = useState({});
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    var schema = {
        _id: Joi.string(),
        model: Joi.string().min(2).required(),
        brand: Joi.string().required(),
        screenSize: Joi.number().positive().required(),
        RAMsize: Joi.number().positive().required(),
        state: Joi.string().required(),
        storageSize: Joi.number().positive().required(),
        color: Joi.string().required(),
        price: Joi.number().positive().required(),
        images: Joi.array().items(
            Joi.object({
                path: Joi.string()
            })
        ),
        creatorID: Joi.string().required()
    };

    useEffect(() => {
        async function getPhones() {
            const { data } = await getPhone(id);
            setPhone(data);
            setLoading(false);
        }
        getPhones();
    }, [id]);

    if (loading) {
        return <CircularIndeterminate />;
    } else {
        // function validate() {
        //     const options = { abortEarly: false };
        //     const { error } = Joi.validate(phone, schema, options);
        //     if (!error) return null;

        //     const errors = {};
        //     for (let item of error.details) errors[item.path[0]] = item.message;
        //     return errors;
        // }

        function validateProperty({ name, value }) {
            const obj = { [name]: value };
            const definedSchema = { [name]: schema[name] };
            const { error } = Joi.validate(obj, definedSchema);
            return error ? error.details[0].message : null;
        }

        function handleInputChange(e) {
            const { target: input } = e;
            const currentErrors = { ...errors };
            const errorMessage = validateProperty(input);
            if (errorMessage) currentErrors[input.name] = errorMessage;
            else delete currentErrors[input.name];

            const data = { ...phone };
            data[input.name] = input.value;
            setErrors(currentErrors);
            setPhone(data);
        }
        console.log('editable phone', phone);
        return (
            <Fragment>
                <h1>Phone id: {id}</h1>
                <EditForm
                    phone={phone}
                    onChange={handleInputChange}
                    errors={errors}
                />
                <div style={{ padding: '8px' }}>
                    <Line color="#ffcd38" />
                </div>

                <Upload />
            </Fragment>
        );
    }
}

export default EditPage;
