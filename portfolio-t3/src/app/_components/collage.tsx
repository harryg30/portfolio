import profilePic from "../../../public/headshot.jpg";
import biking from "../../../public/biking.jpg";
import dirty_teeth from "../../../public/dirty_teeth.jpg";
import goggles from "../../../public/goggles.jpg";
import headshot2 from "../../../public/headshot2.jpg";
import Image from "next/image";

export default function Collage(): JSX.Element {
  return (
    <div className="grid-rows-2-2 gap-1">
      <div className="row-span-1 grid grid-cols-2 gap-1 py-1">
        <Image src={profilePic} alt="headshot" width="200" height="200" />
        <Image src={biking} alt="biking" width="200" height="200" />
      </div>
      <div className="row-span-1 grid grid-cols-2 gap-1 py-1">
        <Image src={headshot2} alt="headshot2" width="200" height="200" />
        <Image src={dirty_teeth} alt="dirty_teeth" width="200" height="200" />
      </div>
    </div>
  );
}
