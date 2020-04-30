import React, { Fragment, useState, useEffect } from 'react';
import Joi from 'joi-browser';
import EditForm from './../common/editForm';
import Upload from '../common/upload';
import Line from '../common/line';
import { getPhone, updatePhone } from '../services/phoneServices';
import CircularIndeterminate from '../common/CircularIndeterminate';
import SaveButton from '../common/saveButton';
import SaveDialog from './../common/dialog';

function EditPage(props) {
    const { id } = props.match.params;
    const [phone, setPhone] = useState({});
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [imagePaths, setImagePaths] = useState([]);
    const [open, setOpen] = useState(false);
    var FormData = require('form-data');
    var formData = new FormData();

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
            data.images = [];
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
        function onChangeHandler(e) {
            const { files: images } = e.target;
            const paths = [];
            const uploadImages = [];
            for (const file of images) {
                uploadImages.push(file);
                const imgPath = URL.createObjectURL(file);
                paths.push(imgPath);
            }
            const updatedPhone = { ...phone };
            updatedPhone.images = uploadImages;
            setPhone(updatedPhone);
            setImagePaths(paths);
        }
        function handleSave() {
            handleClickOpen();
        }
        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

        function handleUpdateClose() {
            formData.append('_id', phone._id);
            formData.append('model', phone.model);
            formData.append('brand', phone.brand);
            formData.append('screenSize', phone.screenSize);
            formData.append('RAMsize', phone.RAMsize);
            formData.append('state', phone.state);
            formData.append('storageSize', phone.storageSize);
            formData.append('color', phone.color);
            formData.append('price', phone.price);
            phone.images.forEach((image) => {
                formData.append('images', image);
            });
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            };
            async function handlePhoneUpdate() {
                const result = await updatePhone(phone, formData, config);
            }
            handlePhoneUpdate();
            props.history.goBack();
            setOpen(false);
        }

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

                <Upload onChange={onChangeHandler} imagePaths={imagePaths} />
                <SaveDialog
                    handleClose={handleClose}
                    open={open}
                    handleClickSave={handleUpdateClose}
                />
                <SaveButton onClick={handleSave} />
            </Fragment>
        );
    }
}

export default EditPage;