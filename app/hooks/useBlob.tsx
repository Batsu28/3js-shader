import { useState } from "react";
import BlobSetting from "../utils/blobSettings";

const useBlob = () => {
  const [setting, setSetting] = useState(BlobSetting[1]);
  return { setting, setSetting };
};

export default useBlob;
