import React, { useState, useEffect } from "react";
import "./uploader.css";
import { MdCloudUpload } from "react-icons/md";
import NoData from "../../assets/noddata.svg";
import {
  useUploadFileMutation,
  useGetFilesQuery,
} from "../../redux/api/fileApiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileCard from "../FileCard/FileCard";
import Loader from "../../components/Loader/Loader";

const Uploader = () => {
  const [file, setFile] = useState(null);
  const [uploadApi, { isLoading }] = useUploadFileMutation();
  const {
    data: myFiles,
    isLoading: isFilesLoading,
    refetch,
  } = useGetFilesQuery();
  const formData = new FormData();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleOnChangeInput = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select file to upload!");
      return null;
    }

    formData.append("file", file);

    try {
      const res = await uploadApi(formData).unwrap();
      console.log(res);
      toast.success("File uploaded successfully!");
      setFile(null);
      refetch();
    } catch (error) {
      toast.error(error);
    }
  };

  
  return (
    <div className="uploader-outer-box">
      <div className="uploader-section">
        <ToastContainer />
        <header>Upload your files here in one place!</header>
        <form onSubmit={handleOnSubmit}>
          <label htmlFor="file-input">
            <MdCloudUpload className="upload-icon" />
          </label>
          <input
            type="file"
            name="file"
            id="file-input"
            onChange={handleOnChangeInput}
          />
          <p>Browse file to upload</p>
          {file && <span>{file?.name}</span>}
          <button type="submit">{isLoading ? "Uploading..." : "Upload"}</button>
        </form>
      </div>
      <div className="myfile-section">
        <h4>My Files</h4>
        {isFilesLoading ? (
          <div className="upload-loader">
            <Loader />
          </div>
        ) : (
          <>
            {myFiles?.length === 0 ? (
              <div className="nodata-section">
                <img src={NoData} alt="no-data" />
                <p className="nofiles-text">No Data</p>
              </div>
            ) : (
              myFiles?.map((file) => {
                return (
                  <FileCard key={file._id} file={file} refetch={refetch} />
                );
              })
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Uploader;
