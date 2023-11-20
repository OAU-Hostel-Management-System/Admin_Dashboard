import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import upload from "../assets/uploadicon.png";

const Dropzone = ({ className }) => {
  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      ".xls, .xlsx": [],
    },

    onDrop,
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files?.length) return;

    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));
    formData.append("upload_preset", "friendsbook");
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="flex flex-col justify-center items-center p-20 rounded-lg bg-white">
        <section className="mt-8">
          {/* Accepted files */}

          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
            {files.map((file) => (
              <li
                key={file.name}
                className="relative h-32 rounded-md shadow-lg"
              >
                <p className="mt-2 text-neutral-500 text-[12px] font-medium">
                  {file.name}
                </p>
              </li>
            ))}
          </ul>
        </section>
        <div
          {...getRootProps({
            className: className,
          })}
          className={`flex justify-center items-center p-20 border-2 border-dashed rounded-lg bg-slate-100 ${
            files.length > 0 ? "hidden" : ""
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-4">
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <div className="flex flex-col justify-center gap-3 items-center">
                <p>Drag & drop files here, or click to upload</p>
                <img src={upload} alt="upload-icon" className="w-10 h-10" />
              </div>
            )}
          </div>
        </div>
        <div className="mt-2 flex gap-6">
          <button className="ml-auto mt-1 text-[12px] uppercase tracking-wider font-bold text-white p-3 border bg-blue-900 rounded-md px-3 hover:bg-purple-400 hover:text-white transition-colors">
            Upload
          </button>
          <button className="ml-auto mt-1 text-[12px] uppercase tracking-wider font-bold text-white p-3 border bg-blue-900 rounded-md px-3 hover:bg-purple-400 hover:text-white transition-colors">
            Download
          </button>
        </div>

        <ul className="mt-6 flex flex-col">
          {rejected.map(({ file, errors }) => (
            <li
              key={file.name}
              className="flex gap-2 justify-between items-center"
            >
              <div>
                <ul className="text-[12px] text-red-400">
                  {errors.map((error) => (
                    <li key={error.code}>{error.message}</li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className="mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors"
                onClick={() => removeRejected(file.name)}
              >
                X
              </button>
            </li>
          ))}
        </ul>

        {/* Preview */}
      </section>
    </form>
  );
};

export default Dropzone;