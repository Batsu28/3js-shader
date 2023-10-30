import Test from "@/components/test";
import Vr from "@/components/vr";

const Overlay = ({ current }: any) => {
  return (
    <>
      <div className="flex justify-between z-10 absolute w-full top-0 left-0 p-10">
        <h3>Blobmixer</h3>
        <div className="flex items-center gap-2 text-transparent hover:text-white cursor-pointer">
          <h3 className="text-white headerBtn">Try in VR</h3>
          <Vr />
        </div>
        <h3 className="headerBtn cursor-pointer">About</h3>
      </div>

      <Test current={current} />
    </>
  );
};
export default Overlay;
