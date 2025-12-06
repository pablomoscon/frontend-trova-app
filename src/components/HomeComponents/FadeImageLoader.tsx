import { useState } from "react";
import FadeImage from "../Shared/FadeImage";

const FadeImageLoader: React.FC<{
  placeholderSrc: string;
  src: string;
  alt: string;
}> = ({ placeholderSrc, src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className='w-full aspect-square relative'>
      <FadeImage
        src={placeholderSrc}
        alt={`Placeholder ${alt}`}
        visible={!loaded}
        className='rounded-full shadow-xl object-cover filter brightness-90'
      />

      <FadeImage
        src={src}
        alt={alt}
        visible={loaded}
        className='object-contain rounded-full opacity-90 contrast-80 saturate-90 brightness-95 shadow-xl spin-slow mx-auto'
      />

      <img
        src={src}
        alt=''
        className='hidden'
        onLoad={() => setLoaded(true)}
        loading='eager'
      />
    </div>
  );
};

export default FadeImageLoader;