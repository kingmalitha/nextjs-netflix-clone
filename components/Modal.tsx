import MuiModal from "@mui/material/Modal";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "@/atoms/modalAtom";
import {
  XMarkIcon,
  PlusIcon,
  HandThumbUpIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { Movie, Element, Genre } from "@/typings";
import ReactPlayer from "react-player/lazy";
import { FaPlay } from "react-icons/fa";
import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import useAuth from "@/hooks/useAuth";
import { db } from "@/lib/firebase";
import { toast } from "react-hot-toast";

const toastStyle = {
  background: "white",
  color: "black",
  fontWeight: "bold",
  fontSize: "16px",
  padding: "15px",
  borderRadius: "9999px",
  maxWidth: "1000px",
};

const Modal = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(true);
  const [addedToList, setAddedToList] = useState(false);
  const [movies, setMovies] = useState<DocumentData[] | Movie[]>([]);

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [movie]);

  // Find all the movies in the user's list
  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, "customers", user.uid, "myList"),
        (snapshot) => {
          setMovies(snapshot.docs);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, movie?.id]);

  //Check Whether the movie is in the user's list
  useEffect(() => {
    setAddedToList(movies.findIndex((doc) => doc.id === movie?.id) !== -1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies]);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleList = async () => {
    try {
      if (addedToList) {
        await deleteDoc(
          doc(db, "customers", user!.uid, "myList", movie?.id.toString()!)
        );
        toast(`${movie?.title || movie?.original_name} removed from my List`, {
          position: "bottom-center",
          duration: 8000,
          style: toastStyle,
        });
      } else {
        await setDoc(
          doc(db, "customers", user!.uid, "myList", movie?.id.toString()!),
          {
            ...movie,
          }
        );

        toast(`${movie?.title || movie?.original_name} added to my List`, {
          position: "bottom-center",
          duration: 8000,
          style: toastStyle,
        });

        setAddedToList(true);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error occurred");
      }

      toast.error("Something went wrong", {
        position: "bottom-center",
        duration: 8000,
        style: toastStyle,
      });
    }
  };

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className='fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide'
    >
      <>
        <button
          onClick={handleClose}
          className='modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]'
        >
          <XMarkIcon className='h-6 w-6' />
        </button>

        <div className='relative pt-[56.25%]'>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width='100%'
            height='100%'
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          />
          <div className='absolute bottom-10 flex w-full items-center justify-between px-10'>
            <div className='flex space-x-2'>
              <button className='flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]'>
                {" "}
                <FaPlay className='h-6 w-6 text-black' />
                Play
              </button>
              <button className='modalButton' onClick={handleList}>
                {addedToList ? (
                  <CheckIcon className='h-7 w-7' />
                ) : (
                  <PlusIcon className='h-7 w-7' />
                )}
              </button>

              <button className='modalButton'>
                <HandThumbUpIcon className='h-7 w-7' />
              </button>
            </div>
            <button onClick={() => setMuted(!muted)} className='modalButton'>
              {muted ? (
                <SpeakerXMarkIcon className='h-7 w-7' />
              ) : (
                <SpeakerWaveIcon className='h-7 w-7' />
              )}
            </button>
          </div>
        </div>
        <div className='flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8'>
          <div className='space-y-6 text-md'>
            <div className='flex items-center space-x-2 text-sm'>
              <p className='font-semibold text-green-400'>
                {movie!.vote_average * 10}% Match
              </p>
              <p>{movie?.release_date || movie?.first_air_date}</p>
              <div className='flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs'>
                HD
              </div>
            </div>

            <div className='flex flex-col gap-x-10 gap-y-4 font-light md:flex-row '>
              <p className='w-5/6'>{movie?.overview}</p>
              <div className='flex flex-col space-y-3 text-sm'>
                <span className='text-[gray] '>
                  {genres.map((genre) => genre.name).join(", ")}
                </span>
              </div>

              <div>
                <span className='text-[gray]'>Original language: </span>
                {movie?.original_language}
              </div>

              <div>
                <span className='text-[gray]'>Total votes: </span>
                {movie?.vote_count}
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
