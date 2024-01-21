import React from "react";
import "./fileCard.css";
import { useDeleteFileMutation } from "../../redux/api/fileApiSlice";
import { FaFileAlt } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

import getDateAndTime from "../../utils/getDateAndTime";

const FileCard = ({ file, refetch }) => {

  const originalName = file.filename.slice(12);
  const date = getDateAndTime(file.createdAt.toString()).slice(0, 22)

  const [deleteApi] = useDeleteFileMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteApi({ fileId: file._id });
      refetch();
      toast.success("File has been deleted!");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDownload = () => {
    const downloadUrl = `http://localhost:5173/download/${file.code}`;
    window.open(downloadUrl)
  }


  return (
    <div className="file-card">
      <div className="file-section">
        <div className="file-icon">
          <FaFileAlt />
        </div>
        <div className="file-detail">
          <h3>{originalName}</h3>
          <h5>{date}</h5>
        </div>
      </div>
      <div className="file-options">
        <MdOutlineFileDownload className="download-icon" onClick={handleDownload}/>
        <FaTrashAlt className="trash-icon" onClick={handleDelete}/>
      </div>
    </div>
  );
};

export default FileCard;
