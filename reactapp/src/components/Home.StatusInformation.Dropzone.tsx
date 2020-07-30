import * as React from "react";
import {useDropzone} from 'react-dropzone'
import {useCallback} from "react";

export const MyDropzone : React.FC = () => {
    const onDrop = useCallback(acceptedFiles => {
        console.log("All Files?", acceptedFiles);
        // Do something with the files
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
}