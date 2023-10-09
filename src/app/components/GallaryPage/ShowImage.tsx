import axios from "axios";
import { FC, useEffect, useState } from "react";
interface data {
  id: string;
  email: string;
  image_url: string;
}

interface ShowImage {
  id: string;
}
export const ShowImage: FC<ShowImage> = ({ id }) => {
  const [allImage, setAllImage] = useState([]);

  const getAllImage = async () => {
    console.log(id);
    const user_data = await axios
      .get(`/api/image/user/all?id=${id}`)
      .then((res) => setAllImage(res.data.data));

    console.log(user_data);
  };

  useEffect(() => {
    getAllImage();
    return () => undefined;
  }, [id]);

  return (
    <main className="container">
      {allImage.map((data: data, key: number) => (
        <img src={data.image_url} alt="img" key={key} />
      ))}
    </main>
  );
};
