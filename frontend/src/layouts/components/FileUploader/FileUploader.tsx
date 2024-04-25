import axios from "axios";
import classNames from "classnames/bind";
import React, { useRef, useState } from "react";
import styles from "./FileUploader.module.scss";
import { v4 } from "uuid";
const cx = classNames.bind(styles);

type File = { id: string; name: string; size: string };

const FileUploader = function () {
    const [files, setFiles] = useState<File[]>([]);
    const [filesUploaded, setFilesUploaded] = useState<any[]>([]);
    const [showProgress, setShowProgress] = useState<boolean>(false);

    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleOpenFileDialog = function () {
        inputFileRef.current?.click();
    };

    const handleUploadFiles = function (e: React.ChangeEvent<HTMLInputElement>) {
        const newFiles = e.target.files;
        if (!newFiles) return;
        const filesObject: File[] = [];

        for (let i = 0; i < newFiles.length; i++) {
            filesObject.push({
                id: v4(),
                name: newFiles[i].name.length > 12 ? `${newFiles[i].name.substring(0, 13)}... .${newFiles[i].name.split(".")[1]}` : newFiles[i].name,
                size: newFiles[i].size < 1024 ? `${newFiles[i].size} KB` : `${(newFiles[i].size / (1024 * 1024)).toFixed(2)} MB`,
            });
            setFiles((prev) => [...prev, ...filesObject]);
        }
    };

    const handleCancelFile = function (id: string) {
        setFiles((prev) => [...prev.filter((file) => file.id !== id)]);
    };

    console.log(files);
    return (
        <div className={cx("wrapper")}>
            <label htmlFor="dropzone-input" className={cx("label")}>
                Attachments {files && files.length > 0 && `(${files?.length})`}
            </label>
            <ul className={cx("file-list")}>
                {files.map((file) => (
                    <div className={cx("file-item")} key={file.id}>
                        <div className={cx("file-inner")}>
                            <span className={cx("file-preview")}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={26}
                                    height={26}
                                    focusable="false"
                                    viewBox="0 0 20 26"
                                    aria-hidden="true"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M13.41 0H2a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6.58L13.41 0zM15 7a2 2 0 0 1-2-2V1l6 6h-4z"
                                    />
                                </svg>
                            </span>
                            <div className={cx("description")}>
                                <div className={cx("file-name")}>{file.name}</div>
                                {showProgress ? (
                                    <div className={cx("file-uploading")}>Uploading...</div>
                                ) : (
                                    <div className={cx("file-size")}>{file.size}</div>
                                )}
                            </div>
                            <div aria-label="Remove file" className={cx("cancel")} onClick={() => handleCancelFile(file.id)}>
                                <svg width={12} height={12} viewBox="0 0 12 12" focusable="false" role="presentation">
                                    <path stroke="currentColor" strokeLinecap="round" d="M3 9l6-6m0 6L3 3" />
                                </svg>
                            </div>
                        </div>
                        <div className={cx("progress-bar-wrapper")}>
                            <div
                                className={cx("progress-bar")}
                                style={{
                                    width: `${30}%`,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </ul>
            <button type="button" aria-label="Attachments" className={cx("upload-file")} onClick={handleOpenFileDialog}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    focusable="false"
                    viewBox="0 0 16 16"
                    className="styles__Icon-sc-11ubl44-3 fqoZnQ"
                >
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        d="M9.5 4v7.7c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5V3C6.5 1.6 7.6.5 9 .5s2.5 1.1 2.5 2.5v9c0 1.9-1.6 3.5-3.5 3.5S4.5 13.9 4.5 12V4"
                    />
                </svg>
                <div className={cx("button-title")}>Add up to 5 files</div>
            </button>
            <input type="file" id="dropzone-input" multiple hidden ref={inputFileRef} onChange={handleUploadFiles} />
        </div>
    );
};

export default FileUploader;
