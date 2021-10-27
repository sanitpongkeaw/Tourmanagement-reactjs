import React, { useEffect, useState } from "react";
import { API_URL } from "API_URL";
import swal from 'sweetalert2';

const fetcher = (url, options) => fetch(url, options).then(response => response.json()).then(response => response)

const MapLink = ({id_account}) => {
    const [files, setFiles] = useState([])
    const promiseFile = fetcher(`${API_URL}/api/backend/getFilesConsider`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            id_account: id_account
        })
    })

    useEffect(() => {
        (async () => {
            const data = await promiseFile
            setFiles(data.files);
        })();
    }, [])

    return (
        <div>
            {files.map((file, i) => {
                return <div key={i.toString()}><a href="#" onClick={(e) => {
                    e.preventDefault();
                    
                    fetch(`${API_URL}/api/backend/readFile`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({
                            file_name: file.file_name
                        })
                    })
                        .then(response => response.blob())
                        .then(file_download => {
                            const file_load = new Blob([file_download], {
                                type: file.mimetype
                            });

                            const fileURL = URL.createObjectURL(file_load);

                            window.open(fileURL);
                        })
                        .catch(err => {
                            swal.fire("","Please refresh page","warning")
                            console.log(err)
                        })
                }}>{file.file_name}</a></div>
            })}
        </div>
    )
}

export default MapLink;