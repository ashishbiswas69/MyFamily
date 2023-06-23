import React, { useEffect, useRef, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './App.css';

const App = () => {
  const headingRef = useRef(null);
  const imgRef = useRef(null);
  const images = [6, 1, 2, 16, 4, 5, 7, 8, 9, 10, 11, 12, 3, 14, 15, 13];
  const [clickedImg, setClickedImg] = useState(null);
  const [letter, setLetter] = useState('');
  const text = ' दुनिया के लिए आप एक व्यक्ति है... लेकिन परिवार के लिए आप पूरी दुनिया है...!';

  useEffect(() => {
    setLetter('');
    let currentIndex = 0;
    const interval = setInterval(() => {
      setLetter(prev => prev + text[currentIndex]);
      currentIndex++;
      if (currentIndex === text.length - 1){
        currentIndex=0;
        setLetter('');
      } 
    }, 80);

    return () => {
      clearInterval(interval);
    };
  }, [text]);

  const handleClose = () => {
    imgRef.current.style.animationName = 'imgDisappear'
    setTimeout(() => {
      setClickedImg(null);
    }, 400);
  }

  return (
    <div>
      <img src="/MyFamily/assets/bg1-min.jpg" className="w-full -z-10 h-full fixed" alt="" />
      <div className="flex flex-col items-center md:gap-2 p-10">
        <h1 className="md:text-xl sm:text-md lg:text-4xl h-fit md:h-10 lg:h-16 md:p-2 font-rajdhani font-bold bg-gradient-to-br from-blue-600 to-pink-500 bg-clip-text text-transparent">{letter}</h1>
        <div className="grid grid-cols-4 transition-all md:gap-3 lg:gap-5 my-4 md:w-[80%] md:h-[80%] gap-1">
          {images.map((image, index) => {
            const isColSpan2 = image === 5 || image === 7 || image === 10 || image === 13 || image === 14 || image === 3;
            const classNames = `anim1 object-cover cursor-pointer flex flex-shrink-0 flex-grow rounded md:rounded-md ${image === 6 && 'row-span-2'} ${isColSpan2 ? 'col-span-2' : ''}`;

            return (
              <div key={index} className={classNames}>
                <LazyLoadImage
                  src={`/MyFamily/assets/${image}-min.jpg`}
                  onClick={() => setClickedImg(image)}
                  className={`w-full h-full object-cover transition-colour md:border-2 border lg:border-4 border-white hover:border-blue-500 duration-300 rounded md:rounded-md`}
                  alt=""
                  effect="blur"
                /></div>
            );
          })}
        </div>
      </div>
      {clickedImg && <div onClick={handleClose} className='fixed top-0 justify-center h-full items-center flex flex-grow w-full bg-opacity-80 z-20 bg-slate-700'>
        <img ref={imgRef} src={`/MyFamily/assets/${clickedImg}-min.jpg`} className='imageAppear w-[80%] h-[80%] my-10 object-contain' alt="" />
      </div>}
    </div>
  );
};

export default App;