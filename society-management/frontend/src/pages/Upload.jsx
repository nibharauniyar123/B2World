import { useState } from "react";
import axios from "../utils/axios";

function Upload() {
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // HANDLE FILE CHANGE
  // =========================
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // =========================
  // HANDLE UPLOAD
  // =========================
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        "/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);

      setUploadedFile(res.data.fileUrl);

      alert("File uploaded successfully");
    } catch (error) {
      console.log("Upload Error:", error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      {/* TITLE */}
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "700",
          color: "#1e293b",
          marginBottom: "30px",
        }}
      >
        File Upload
      </h1>

      {/* CARD */}
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
          maxWidth: "600px",
        }}
      >
        {/* FILE INPUT */}
        <input
          type="file"
          onChange={handleFileChange}
          style={{
            marginBottom: "20px",
            fontSize: "15px",
          }}
        />

        {/* BUTTON */}
        <button
          onClick={handleUpload}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "12px 22px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "15px",
          }}
        >
          {loading ? "Uploading..." : "Upload File"}
        </button>

        {/* PREVIEW */}
        {uploadedFile && (
          <div style={{ marginTop: "30px" }}>
            <h3
              style={{
                marginBottom: "15px",
                color: "#0f172a",
              }}
            >
              Uploaded File
            </h3>

            <img
              src={`http://localhost:5000${uploadedFile}`}
              alt="Uploaded"
              style={{
                width: "100%",
                maxWidth: "300px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;