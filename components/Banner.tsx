import Image from "next/image";
import { Movie } from "../typings";
import { useEffect, useLayoutEffect, useState } from "react";
import baseUrl from "@/utils/requests";
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { modalState, movieState } from "@/atoms/modalAtom";
import { useRecoilState } from "recoil";

interface Props {
  netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
  const [movie, setMovie] = useState<Movie | null>();
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [showModal, setShowModal] = useRecoilState(modalState);

  //   useEffect(() => {
  //     setMovie(
  //       netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
  //     );
  //   }, [netflixOriginals]);

  useLayoutEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0  -z-10 h-[95vh] w-screen">
        <Image
          src={`https://image.tmdb.org/t/p/original/${
            movie?.backdrop_path || movie?.poster_path
          }`}
          fill
          alt="featured-movie"
          style={{ objectFit: "cover" }}
        />
      </div>

      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>

      <p className="max-w-xs text-xs drop-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:font-2xl">
        {movie?.overview}
      </p>

      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          {" "}
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" /> Play
        </button>
        <button
          className="bannerButton bg-[gray]/70"
          onClick={() => {
            setCurrentMovie(movie);
            setShowModal(true);
          }}
        >
          More Info <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
