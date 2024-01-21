import React, { useState } from "react";
import "./downloadPage.css";
import { useParams } from "react-router-dom";
import { useDownloadFileQuery } from "../../redux/api/fileApiSlice";
import { ToastContainer, toast } from "react-toastify";
import { GrSecure } from "react-icons/gr";

const DownloadPage = () => {
  const [inputCode, setInputCode] = useState("");

  const params = useParams();
  const { code } = params;

  const handleDownload = async (e) => {
    e.preventDefault();

    if (code !== inputCode) {
      toast.error("Invalid Code!");
      return null;
    }

    try {
      fetch(`http://localhost:8080/api/files/download/${inputCode}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Download failed with status: ${response.status}`);
          }

          // Extract the filename from the Content-Disposition header
          const contentDisposition = response.headers.get(
            "Content-Disposition"
          );
          const filenameMatch =
            contentDisposition && contentDisposition.match(/filename="(.+)"/);
          const filename = filenameMatch ? filenameMatch[1] : "downloaded-file";

          // Process the response body as a blob
          return response.blob().then((blob) => ({ blob, filename }));
        })
        .then(({ blob, filename }) => {
          // Create a blob URL for the downloaded file
          const url = window.URL.createObjectURL(new Blob([blob]));

          // Create a temporary link element
          const link = document.createElement("a");

          // Set the href attribute of the link to the blob URL
          link.href = url;

          // Set the 'download' attribute to the extracted filename
          link.setAttribute("download", filename);

          // Append the link to the document body
          document.body.appendChild(link);

          // Simulate a click on the link to trigger the download
          link.click();

          // Remove the link from the document body
          link.parentNode.removeChild(link);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error downloading file.");
        });
    } catch (error) {
      console.error(error);
      toast.error("Error initiating download.");
    }
  };

  return (
    <div className="download-section">
      <ToastContainer />
      <form onSubmit={handleDownload} className="download-form">
        <GrSecure className="icon" />
        <h3>Enter File Code</h3>
        <input
          type="text"
          placeholder="Enter 6-digit code"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
        <button type="submit" className="download-button">
          Download
        </button>
      </form>
    </div>
  );
};

export default DownloadPage;
