import { hero } from "../data/data";
/**
 * Renders a section containing a list of hero items.
 * Each hero item is rendered as a div element with an image, title, and description.
 * The data for the hero items is obtained from an imported array named `hero`.
 *
 * @returns {JSX.Element} The section element containing the rendered hero items.
 *
 * @example
 * import Hero from './Hero';
 *
 * const App = () => {
 *   return (
 *     <div>
 *       <Hero />
 *     </div>
 *   );
 * }
 */
const Hero = () => {
  return (
    <section>
      {hero.map(({ id, img, title, desc }) => (
        <div
          key={id}
          className="relative flex flex-col items-center justify-center "
        >
          <img src={img} alt={title} className="h-auto w-full object-cover" />
          <div
            className="absolute top-6 flex flex-col h-screen
          w-full items-center justify-between "
          >
            <h1 className="text-5xl font-bold text-white">{title}</h1>
            <p className="text-2xl font-bold text-white">{desc}</p>
          </div>
          <div className=""></div>
        </div>
      ))}
    </section>
  );
};

export default Hero;
