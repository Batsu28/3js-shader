import { useEffect, useMemo, useState } from "react";
import { BlobSetting, Titles } from "../utils/blobSettings";
import { useSpring } from "@react-spring/web";

const useBlob = () => {
  const [number, setNumber] = useState(0);
  const length = Titles.length;
  // const setting = useMemo(() => BlobSetting[Titles[number]], [number]);
  const [setting, setSetting] = useState(BlobSetting[Titles[number]]);

  const { background } = useSpring({
    background: setting.bg,
  });

  useEffect(() => {
    setSetting(BlobSetting[Titles[number]]);
  }, [number]);

  const clickHandler = () => {
    if (number < length - 1) {
      setNumber(number + 1);
    } else {
      console.log("number 0", number);

      setNumber(0);
    }
    console.log("number update:", number);
  };

  return { clickHandler, background, ...setting };
};

export default useBlob;
