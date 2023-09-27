import { hero } from "../data/data";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  return (
    <section>
      {hero.map(({ id, img, title, desc }) => (
        <div
          key={id}
          className="relative flex flex-col items-center justify-center "
        >
          <img src={img} alt={title} className="h-auto w-full object-cover" />
          <div className="absolute top-6 flex flex-col h-screen
          w-full items-center justify-between">
            <h1>{title}</h1>
            <p>{desc}</p>
          </div>
          <div className="">
          </div>
        </div>
      ))}
    </section>
  );
};

export default Hero;
