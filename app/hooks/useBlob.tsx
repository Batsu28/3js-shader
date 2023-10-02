import { useState } from "react";
import BlobSetting from "../utils/blobSettings";

const useBlob = () => {
  const [number, setNumber] = useState(0);
  const length = BlobSetting.length;
  const setting = BlobSetting[number];

  const increment = () => {
    if (number < length - 1) {
      setNumber((num) => num + 1);
    } else {
      setNumber(0);
    }
  };
  const decrement = () => {
    if (number > 0) {
      setNumber((num) => num - 1);
    } else {
      setNumber(length - 1);
    }
  };

  return { increment, decrement, setting };
};

export default useBlob;
