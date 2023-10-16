import { hero } from "../data/data";
const Hero = () => {
  return (
    <section>
      {hero.map(({ id, img, title, desc }) => (
        <div
          key={id}
          className="relative flex flex-col items-center justify-center "
        >
          <img src="/image5.jpg" alt={title} className="h-auto w-full object-cover" />
          <div className="absolute top-6 flex flex-col h-screen
          w-full items-center justify-between ">
            <h1 className="text-5xl font-bold text-white">{title}</h1>
            <p className="text-2xl font-bold text-white">{desc}</p>
          </div>
          <div className="">
          </div>
        </div>
      ))}
    </section>
  );
};

export default Hero;
