import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
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
        <Grid container spacing={3}>
            <Grid item lg={6} md={6} xs={12} style={{ padding: '20px' }}>
                <div className="form-group files">
                    <h4>Upload Your files</h4>
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
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
                <Grid container spacing={3}>
                    {imagePaths.map((path, index) => (
                        <Grid
                            item
                            lg={4}
                            md={6}
                            xs={12}
                            key={index}
                            className="parent"
                        >
                            <img key={index} alt={index} src={path} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Upload;
