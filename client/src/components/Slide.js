import { Link } from "react-router-dom";

const Slide = ({ image }) => {
  return (
    <div className="slide relative" style={{ backgroundImage: `url(${image.src})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="slide-texts container mx-auto flex flex-col items-start justify-center h-full gap-5 text-white relative z-10">
        <h1 className="text-7xl uppercase font-bold space-font w-4/5 drop-shadow-2xl">
          {image.headline}
        </h1>
        <p className="w-3/5 text-lg drop-shadow-lg">{image.body}</p>
        <Link
          to={`/products/${image.category}`}
          className="slide-btn uppercase border-2 border-white h-14 w-72 hover:text-white duration-300 font-medium mt-5 rounded-lg overflow-hidden"
        >
          <span className="z-[2] absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-full text-center">
            {image.cta}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Slide;