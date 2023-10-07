"use client";
import { FC, useState, ChangeEvent, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import axios from "axios";

export const UploadImage: FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [downloadURl, setDownloadURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);

  const handleSelectedFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files[0].size < 10000000) {
      setImageFile(files[0]);
    } else {
      toast.error("File size to large");
    }
  };

  const upload = async (url: string) => {
    const data = {
      img: url,
    };

    await axios.post("/api/image/upload", data);
  };

  const handleUploadFile = () => {
    if (imageFile) {
      const name = imageFile.name;
      const storageRef = ref(storage, `image/${name}`);

      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setProgressUpload(progress); // to show progress upload

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          toast(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            //url is download url of file
            upload(url);
            setDownloadURL(url);
            toast.success("upload");
          });
        }
      );
    } else {
      toast.error("File not found");
    }
  };

  useEffect(() => {
    handleUploadFile();
    return () => undefined;
  }, [imageFile]);
  return (
    <div className="flex flex-col space-y-4">
      <input
        type="file"
        placeholder="Select file to upload"
        className="file-input w-full "
        accept="imahe/png"
        onChange={(file) => handleSelectedFile(file)}
      />

      <div>
        {progressUpload != 0 && progressUpload != 100 && (
          <progress className="progress w-full"></progress>
        )}
      </div>
      <div>
        {downloadURl && <img src={downloadURl} alt="data" className="w-full" />}
      </div>
    </div>
  );
};
