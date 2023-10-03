import { useMemo, useState } from "react";
import BlobSetting from "../utils/blobSettings";
import { useGesture } from "@use-gesture/react";
import { useSpring } from "@react-spring/web";

const useBlob = () => {
  const [number, setNumber] = useState(0);
  // let number = 0;
  const length = BlobSetting.length;
  const setting = useMemo(() => BlobSetting[number], [number]);

  const [{ background }, api] = useSpring(() => ({
    background: setting.bg,
  }));

  const clickHandler = () => {
    if (number < length - 1) {
      setNumber(number + 1);
    } else {
      setNumber(0);
    }
    api.start({ background: setting.bg });
  };

  return { background, clickHandler, ...setting };
};

export default useBlob;
