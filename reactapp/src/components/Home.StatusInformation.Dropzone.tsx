import * as React from "react";
import {useDropzone} from 'react-dropzone'
import {useCallback} from "react";
import {CommunicationService} from "../services/CommunicationService";

export const MyDropzone : React.FC = () => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log("All Files!", acceptedFiles);
        CommunicationService.getInstance().commitFilesInsideZIPFile(acceptedFiles).then((response: any) => {
            console.log(response);
        });
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
