import * as React from "react";
import {useDropzone} from 'react-dropzone'
import {useCallback, useState} from "react";
import {CommunicationService} from "../services/CommunicationService";

export const MyDropzone : React.FC = () => {

    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log("do smth with the files...", acceptedFiles);
        setTmpAcceptedFiles(acceptedFiles);
    }, []);

    const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    const [tmpAcceptedFiles, setTmpAcceptedFiles] = useState<File[]>(acceptedFiles);

    let sendAllFilesToTheBackend = () => {
        console.log(tmpAcceptedFiles);
        CommunicationService.getInstance().commitFilesInsideZIPFile(tmpAcceptedFiles).then((response: any) => {
            document.getElementById("zipfilesucessalert").classList.add("show");
        }).catch().finally(() => {
            setTimeout(() => {
                document.getElementById("zipfilesucessalert").classList.remove("show");
            }, 3000);
        });
    }

    const files = acceptedFiles.map((file: File) => (
        <li key={file.name}>
            {file.name} - {file.size} bytes
        </li>
    ));

    let resetAllFiles = () => {
        setTmpAcceptedFiles([]);
    }

    return (
        <>
            <div id={"zipfilesucessalert"} className="alert alert-success alert-dismissible ecco-alert fade" role="alert">
                The files are sucessfully committed into the Repository!
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                    <div  className="row mb-3">
                        <div style={{height: "100px", border: "1px solid #d8d8d8", backgroundColor: "#ececec"}} className="col-12 d-flex align-items-center align-content-center justify-content-center">
                            {
                                isDragActive ?
                                    <p className={"m-0"}>Drop the files here ...</p> :
                                    <p className={"m-0"}>Drag 'n' drop some files here, or click to select files</p>
                            }
                        </div>
                    </div>
            </div>
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>
            <div className="row">
                <div className="col-12 d-flex justify-content-between align-items-center">
                    <button className={"btn btn-danger"} onClick={resetAllFiles}>Reset</button>
                    <button className={"btn btn-primary"} onClick={sendAllFilesToTheBackend}>Commit</button>
                </div>
            </div>
        </>
    )
}
