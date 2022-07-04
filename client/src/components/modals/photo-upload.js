import { useState } from "react";
import ReactDOM from "react-dom";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { userUpdatedActions } from "../../store/userUpdated";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faImage } from "@fortawesome/free-solid-svg-icons";

const PhotoUpload = ({ setShowModal, username }) => {
    const [photoUploaded, setPhotoUploaded] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFileInput = (e) => {
        // console.log(e.target.value);

        if (e.target.value) {
            const formdata = new FormData();

            formdata.append("file", e.target.files[0]);
            formdata.append(
                "upload_preset",

                process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
            );
            formdata.append(
                "cloud_name",
                process.env.REACT_APP_CLOUDINARY_NAME
            );

            setPhotoUploaded(formdata);
        }
    };

    const handleUpload = async () => {
        if (photoUploaded) {
            fetch(process.env.REACT_APP_CLOUDINARY_URL, {
                method: "POST",
                body: photoUploaded,
            })
                .then((responce) => responce.json())
                .then(async (data) => {
                    const responce = await fetch(
                        `${process.env.REACT_APP_IP}user/update-photo`,
                        {
                            method: "POST",
                            mode: "cors",
                            credentials: "same-origin",
                            headers: {
                                "Content-Type": "application/json",
                                autorization: localStorage.getItem("token"),
                            },
                            body: JSON.stringify({ imageUrl: data.url }),
                        }
                    );
                    const result = await responce.json();
                    console.log(result);

                    if (result.saved) {
                        setShowModal(false);
                        navigate(`/profile/${username}`);

                        dispatch(userUpdatedActions.setUserUpdatedTrue());
                    }
                });
        }
    };

    return ReactDOM.createPortal(
        <div className="photo-upload-modal">
            <div className="photo-upload-modal__container">
                <div className="photo-upload-modal__header">
                    Upload your photo
                </div>
                <div className="photo-upload-modal__description">
                    Select relevant photo to change your avatar photo
                </div>

                {!photoUploaded ? (
                    <form className="photo-upload-modal__form">
                        <label className="photo-upload-modal__form_input">
                            <input
                                className="photo-upload-modal__form_input_file"
                                type="file"
                                id="file"
                                name="file"
                                onChange={handleFileInput}
                            />
                        </label>

                        <FontAwesomeIcon
                            className="photo-upload-modal__form_icon"
                            icon={faCloudArrowUp}
                        />

                        <div className="photo-upload-modal__form_description">
                            Select a file or drag and drop here
                        </div>

                        <div className="photo-upload-modal__form_restriction">
                            JPG or PNG file size no more than 10MB
                        </div>

                        <button className="photo-upload-modal__form_button">
                            Select file
                        </button>
                    </form>
                ) : (
                    <div className="photo-upload-modal__uploaded">
                        <div className="photo-upload-modal__uploaded_header">
                            File added
                        </div>

                        <div className="photo-upload-modal__uploaded_file">
                            <div className="photo-upload-modal__uploaded_file_container">
                                <FontAwesomeIcon
                                    className="photo-upload-modal__uploaded_file_icon"
                                    icon={faImage}
                                />

                                <div className="photo-upload-modal__uploaded_file_name">
                                    {photoUploaded.get("file").name}
                                </div>
                            </div>

                            <div className="hoto-upload-modal__uploaded_file_size">
                                {Math.floor(
                                    photoUploaded.get("file").size / 1024
                                )}
                                kb
                            </div>
                        </div>
                    </div>
                )}

                <div className="photo-upload-modal__buttons">
                    <button
                        className="photo-upload-modal__button photo-modal__close_button"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </button>
                    <button
                        className={`photo-upload-modal__button photo-modal__upload_button ${
                            photoUploaded && "photo-modal__upload_button_active"
                        }`}
                        onClick={handleUpload}
                    >
                        Upload
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    );
};

export default PhotoUpload;
