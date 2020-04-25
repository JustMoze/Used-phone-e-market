import React, { useState } from 'react';

function Upload(props) {
    // const [imageUpload, setImageUpload] = useState([]);
    const [imagePaths, setImagePaths] = useState([]);
    function onClickHandler() {
        console.log('Button was clicked');
    }
    function onChangeHandler(e) {
        console.log(e.target.files);
        const { files: images } = e.target;
        console.log('Images', images);
        // setImageUpload(images);
        const paths = [];

        for (const file of images) {
            const imgPath = URL.createObjectURL(file);
            paths.push(imgPath);
        }
        setImagePaths(paths);
    }
    return (
        <div className="row">
            <div className="col-md-6">
                <div className="form-group files">
                    <label>Upload Your files</label>
                    <input
                        type="file"
                        className="form-control"
                        multiple
                        onChange={onChangeHandler}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-success btn-block"
                    onClick={onClickHandler}
                >
                    Upload
                </button>
            </div>
            <div className="col-md-6 col-lg-6 col-sm-6">
                <div className="row">
                    {imagePaths.map((path, index) => (
                        <div key={index} className="parent">
                            <img key={index} alt={index} src={path} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Upload;
