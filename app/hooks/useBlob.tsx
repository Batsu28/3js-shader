import { useMemo, useState } from "react";
import { BlobSetting, Titles } from "../utils/blobSettings";
import { useSpring } from "@react-spring/web";

const useBlob = () => {
  const [number, setNumber] = useState(0);

  const length = Titles.length;
  const setting = useMemo(() => BlobSetting[Titles[number]], [number]);

  const [{ background }, api] = useSpring(() => ({
    background: setting.bg,
    config: { tension: 120, friction: 14 },
  }));

  const clickHandler = (e: any) => {
    console.log(e.deltaMode);
    e.deltaMode = 10000;
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
