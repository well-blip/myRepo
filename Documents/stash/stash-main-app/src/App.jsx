"use client";

import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import "./App.css";
import { motion } from "framer-motion";
import gif1 from "./assets/tumblr_db8472cfbb89a155148003b053d5f3de_158142e8_400.gif";
import gif2 from "./assets/1adc406e5de4a2e47cacb242582e9bc3.gif";
import gif3 from "./assets/abb2ad15f59de1d4d2a3fd4c145a1507.gif";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentGifIndex, setCurrentGifIndex] = useState(0);
  // Array of background GIFs
  const backgroundGifs = [gif2, gif3];
  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = backgroundGifs.length;

    const preloadImages = () => {
      backgroundGifs.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
        };
        img.onerror = () => {
          // Handle error, maybe increment counter anyway
          loadedCount++;
          console.error(`Failed to load image: ${src}`);
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
        };
      });
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const interval = setInterval(() => {
      setCurrentGifIndex(
        (prevIndex) => (prevIndex + 1) % backgroundGifs.length
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [imagesLoaded, backgroundGifs.length]);

  useEffect(() => {
    if (imagesLoaded) {
      setIsLoaded(true);
    }
  }, [imagesLoaded]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white">
      {/* Show loading indicator if images aren't loaded */}
      {!imagesLoaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
          <div className="text-white">Loading...</div>
          {/* Or use a spinner component here */}
        </div>
      )}
      {/* Background GIFs */}
      <div className="absolute inset-0 z-0">
        {backgroundGifs.map((gif, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentGifIndex === index ? 0.4 : 0,
            }}
            transition={{ duration: 1 }}
          >
            <img
              src={gif || "/placeholder.svg"}
              alt="Background Animation"
              className="h-full w-full object-cover"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-opacity-60 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-screen w-full flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <motion.h1
            className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Search Across Ideas. Use Natural Language
          </motion.h1>
          <motion.p
            className="mx-auto mb-8 max-w-2xl text-base text-gray-300 sm:text-lg md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Discover innovative concepts and explore creative possibilities with
            our powerful idea search engine. Find inspiration or contribute your
            own unique ideas to our growing community.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-10 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "white",
                  color: "white",
                  borderRadius: "9999px",
                  padding: "10px 24px",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                    borderColor: "white",
                  },
                }}
              >
                Browse All Ideas
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "white",
                  color: "white",
                  borderRadius: "9999px",
                  padding: "10px 24px",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                    borderColor: "white",
                  },
                }}
              >
                Generate An Idea Using AI
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
