'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import { v4 as uuidv4 } from 'uuid';

const MAX_LIKES = 10;

const LikeButton = ({ slug }) => {
  const [animateScale, setAnimateScale] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(0.8);
  const [isVisible, setIsVisible] = useState(false);
  const [countLikes, setCountLikes] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [subtleAnimate, setSubtleAnimate] = useState(false);
  // const countRef = useRef(countLikes);

  const [play] = useSound('/sounds/drumkick.wav', {
    playbackRate,
    interrupt: true,
  });

  const [play2] = useSound('/sounds/balloon_pop.wav', {});

  // get a uniquce device_identifier to track the gadget instead of the IP
  const getDeviceIdentifier = () => {
    let deviceIdentifier = localStorage.getItem('deviceIdentifier');
    if (!deviceIdentifier) {
      deviceIdentifier = uuidv4();
      localStorage.setItem('deviceIdentifier', deviceIdentifier);
    }
    return deviceIdentifier;
  };

  useEffect(() => {
    // countRef.current = countLikes;
    if (countLikes === MAX_LIKES) {
      setAnimateScale(true);
      play2();
      setTimeout(() => {
        setAnimateScale(false);
        setSubtleAnimate(true);
      }, 500);
    }
  }, [countLikes]);

  useEffect(() => {
    if (!slug) return;
    const fetchLikes = async () => {
      const deviceIdentifier = getDeviceIdentifier();
      const response = await fetch(
        `/api/likes/${slug}?deviceIdentifier=${deviceIdentifier}`
      );
      const data = await response.json();
      setCountLikes(data.totalLikes);
      setTotalLikes(data.totalLikesAllUsers);
    };

    fetchLikes();
  }, [slug]);

  const handleClick = async () => {
    if (countLikes < MAX_LIKES) {
      setCountLikes((prev) => prev + 1);
      setTotalLikes((prev) => prev + 1);
      // countRef.current += 1;

      setPlaybackRate(playbackRate + 0.1);
      play();

      const deviceIdentifier = getDeviceIdentifier();

      const response = await fetch(`/api/likes/${slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deviceIdentifier, maxLikes: MAX_LIKES }),
      });

      // update totallikes if the request is successful
      if (response.ok) {
        const fetchLikes = async () => {
          const response = await fetch(
            `/api/likes/${slug}?deviceIdentifier=${deviceIdentifier}`
          );
          const data = await response.json();
          setTotalLikes(data.totalLikesAllUsers);
        };

        fetchLikes();
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 2000 && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    isVisible && (
      <>
        <motion.div
          onClick={handleClick}
          style={{
            cursor: 'pointer',
            position: 'relative',
            width: '70px',
            height: '70px',
            display: 'inlineBlock',
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            ...(animateScale ? { scale: 1.3 } : {}),
          }}
          transition={{
            opacity: { duration: 0.8 },
            type: 'spring',
            stiffness: 150,
            damping: 20,
            mass: 3,
          }}
          whileHover={{ rotateY: 20 }}
        >
          <motion.svg
            initial={{ scale: 1 }}
            animate={subtleAnimate ? { scale: 1.1, rotateY: 20 } : {}}
            transition={
              subtleAnimate
                ? {
                    duration: 1,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    type: 'spring',
                    stiffness: 150,
                    damping: 20,
                    mass: 3,
                  }
                : {}
            }
            width="65"
            height="65"
            viewBox="-5.0 -10.0 110.0 135.0"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              cursor: 'pointer',
            }}
            version="1.1"
          >
            <defs>
              <clipPath id="heartClip">
                <rect
                  x="0"
                  y={((MAX_LIKES - countLikes) / MAX_LIKES) * 100}
                  width="100%"
                  height="100%"
                />
              </clipPath>
            </defs>
            <g>
              <motion.path
                fill="none"
                stroke="var(--text-color-primary-800)"
                strokeWidth="1"
                d="m77.062 38.875c-0.003906-0.007812-0.007812-0.007812-0.011719-0.007812-0.53125-0.44141-1.1016-0.76953-1.7305-0.99609-0.62891-0.21875-1.3047-0.32812-2.043-0.32812-1.0078 0-2.125 0.20703-3.3555 0.62109-0.5625 0.19141-1.668 0.65234-2.7422 1.6016-1.7188 1.5195-3.3438 4.2852-1.3047 8.8281 0.46875 1.043 1.1016 1.9609 1.8711 2.7344 3.4648 3.4805 9.4922 3.7031 13.34 1.9492-0.027344-7.2461-1.4141-12.219-4.0234-14.402z"
              />
              <motion.path
                fill="none"
                stroke="var(--text-color-primary-800)"
                strokeWidth="1"
                d="m81.188 29.848h-0.003906c-3.2734-0.011718-5.5195 0-6.6719 0.035156-2.0938 0.0625-4.4531 0.27734-5.9102 2.0039-1.0742 1.2734-1.5117 3.2578-1.3164 5.9023 0.67969-0.44922 1.418-0.8125 2.1523-1.0586 3.3867-1.1445 6.2031-0.875 8.3594 0.79688h7.5625v-7.6523c-0.88281-0.007812-2.457-0.019531-4.1719-0.027344z"
              />
              <motion.path
                fill="none"
                stroke="var(--text-color-primary-800)"
                strokeWidth="1"
                d="m68.223 53.676c0.24219 2.9648-0.16016 6.7969-2.5234 10.785 1.7773 2.2891 3.7344 6.1523 3.7344 12.094 0 0.41797-0.33984 0.75781-0.75781 0.75781s-0.75781-0.33594-0.75781-0.75781c0-5.1562-1.5664-8.5977-3.0977-10.734-0.44531 0.64453-0.94141 1.2734-1.4805 1.8945-0.94141 1.0859-1.8359 2.1484-2.6602 3.1602-0.007813 0.011719-0.015626 0.023438-0.027344 0.03125-7.0195 8.6406-9.1328 14.02-7.8047 19.84 0.089844 0.41016-0.16406 0.8125-0.57031 0.90234-0.058594 0.015624-0.11328 0.019531-0.17188 0.019531-0.34375 0-0.65234-0.23438-0.73438-0.58594-1.4023-6.1406 0.60938-11.699 7.4102-20.262-1.5039-0.45312-3.0391-0.84766-4.5781-1.1641-0.003906 0-0.011719-0.003906-0.019531-0.003906-0.59375-0.125-1.1562-0.23047-1.7148-0.32422-1.9219 0.95312-7.2109 3.9727-8.4414 8.7383-0.085938 0.34375-0.39453 0.57031-0.73047 0.57031-0.0625 0-0.125-0.007813-0.1875-0.027344-0.40625-0.10156-0.65234-0.51562-0.54297-0.91797 1.082-4.207 4.7227-7.1016 7.418-8.7266-2.7773-0.33203-5.4375-0.40234-7.9492-0.19531-0.41797 0.035157-0.77734-0.27734-0.8125-0.69141s0.27734-0.77734 0.69141-0.8125c3.293-0.27344 6.8359-0.089844 10.539 0.53125 0.007813 0 0.019531 0 0.03125 0.003906 0.09375 0.015625 0.1875 0.03125 0.28516 0.050781-1.3398-2.4609-1.9492-5.5703-1.8125-9.2852 0.015625-0.41406 0.37109-0.74609 0.78516-0.72656 0.41406 0.015625 0.74219 0.36719 0.72656 0.78125-0.14844 3.9766 0.65234 7.2891 2.3242 9.6172 1.6914 0.36328 3.375 0.80078 5.0117 1.3203 0.75-0.91406 1.5508-1.8633 2.3867-2.8281 0.73047-0.84375 1.375-1.7148 1.9219-2.582 0.003907-0.007813 0.007813-0.011719 0.011719-0.015626 2.3203-3.707 3.125-7.7109 2.3711-11.91-0.82812-0.86328-1.5039-1.8711-2.0156-3.0117-2.3984-5.3398-0.30469-8.6641 1.3828-10.301-0.4375-3.5547 0.085938-6.2422 1.5664-7.9961 2.0156-2.3906 5.2773-2.4883 7.0273-2.543 1.0742-0.03125 3.0742-0.042969 5.9609-0.035156v-6.7539c-3.2539-0.27734-6.2734-0.4375-8.9805-0.47266h-0.007812c-10.391-0.14453-16.941 1.4492-20.031 4.8672-0.75 0.83203-0.64844 2.0352-0.52344 3.5625 0.27734 3.2812 0.65234 7.7734-8.6875 10.488-2.3477 0.67969-4.9414 1.9375-7.7148 3.7344-0.015625 0.011719-0.03125 0.023437-0.046875 0.03125-7.7188 5.0156-15.031 13.055-18.074 16.598 1.8555 6.2266 5.2148 12.531 9.9883 18.766 5.0039 6.5391 9.957 12.227 14.719 16.906 2.6523 2.6055 6.168 4.0039 9.8906 3.9414 3.7383-0.066406 7.2188-1.6016 9.793-4.3281 8.1172-8.5703 18.078-20.832 19.441-30.613 0.51172-3.6523 0.80469-7.0547 0.87891-10.137-1.5898 0.61719-3.418 0.95312-5.2852 0.95312-2.6211-0.003906-5.3398-0.68359-7.5547-2.2031z"
              />
              <motion.path
                fill="none"
                stroke="var(--text-color-primary-800)"
                strokeWidth="1"
                d="m26.402 24.859c3.1484-0.94141 6.3789-1.0508 8.7852-0.92969 1.4648-4.4766 3.6797-7.9688 6.5938-10.391l-1.0117-5.5859-2.6406 1.0469c-0.35938 0.14453-0.76953-0.011719-0.95312-0.35938l-4.4141-8.5898-4.7266 2.3281 4.4141 8.832c0.13672 0.26562 0.097656 0.58594-0.089844 0.81641-4.25 5.1719-5.5703 9.9297-5.957 12.832z"
              />
              <motion.path
                fill="none"
                stroke="var(--text-color-primary-800)"
                strokeWidth="1"
                d="m42.105 6.8359 1.2461 6.8711c0.050782 0.27734-0.058593 0.55469-0.27734 0.73047-2.9609 2.332-5.1914 5.8594-6.6172 10.48-0.003906 0.007812-0.003906 0.019531-0.007812 0.027343-1.9648 6.3711-1.9492 13.266-1.7461 16.895 2.5117-1.5312 4.8867-2.6289 7.0742-3.2617 8.1523-2.3672 7.875-5.6914 7.6055-8.9102-0.14062-1.6641-0.28516-3.3828 0.90234-4.6992 3.2969-3.6406 9.582-5.3594 19.734-5.375-3.4805-4.8008-8.6875-8.1602-9.6836-8.5977h-0.003907c-0.0625-0.003906-0.11719-0.019532-0.17578-0.042969-0.039062-0.015625-0.078125-0.035156-0.11719-0.054687-0.003906 0-0.003906-0.003907-0.007812-0.003907-0.003906-0.003906-0.015625-0.007812-0.023438-0.011719-0.023437-0.015624-0.042968-0.027343-0.0625-0.046874-0.007812-0.003907-0.015624-0.007813-0.023437-0.015626-0.015625-0.011718-0.027344-0.023437-0.039063-0.039062-0.003906 0-0.011718-0.007812-0.015624-0.011719-0.019532-0.019531-0.042969-0.042969-0.058594-0.0625-0.019532-0.019531-0.035156-0.039062-0.046875-0.058593-0.015625-0.027344-0.035157-0.054688-0.046875-0.078126-0.015625-0.035156-0.03125-0.066406-0.042969-0.10547-0.011719-0.03125-0.019531-0.0625-0.027344-0.097656-0.007812-0.039063-0.011719-0.074219-0.011719-0.11719v-0.027344c0-0.039062 0.003907-0.070312 0.011719-0.10938 0.003907-0.03125 0.007813-0.058593 0.019531-0.089843 0.003907-0.007813 0.003907-0.015626 0.007813-0.027344 0-0.003906 0-0.003906 0.003906-0.007813 0.17969-0.66406 1.8203-6.3281 2.4297-8.4297l-4.6758-1.5586-3.5391 9.957c-0.085937 0.24609-0.29688 0.42969-0.54688 0.48438l-4.7578 1.0586c-0.20313 0.046875-0.41406 0.003906-0.58594-0.11328-0.17578-0.11719-0.29297-0.29688-0.32422-0.50391l-1.7266-10.582-4.8438 1.0078 0.98828 5.457c0.003906 0.027344 0.007812 0.050781 0.011719 0.070313z"
              />
              <motion.path
                fill="none"
                stroke="var(--text-color-primary-800)"
                strokeWidth="1"
                d="m33.246 42.77c-0.23438-3.2617-0.42969-10.477 1.4805-17.344-2.5039-0.097656-5.8203 0.085938-8.9102 1.2227-0.007812 0-0.011718 0.003906-0.019531 0.007812-3.0977 1.1367-5.418 3.043-6.9023 5.6602-2.5391 4.4922-6.2109 13.77-3.0117 26.312 3.3516-3.8242 10.141-11.078 17.363-15.859z"
              />
            </g>
            <g clipPath="url(#heartClip)">
              <motion.path
                fill="var(--alert-bg-danger)"
                stroke="var(--text-color-primary-800)"
                strokeWidth="1"
                initial={{ fillOpacity: 0 }}
                animate={{ fillOpacity: 1 }}
                transition={{ duration: 0.5 }}
                d="m77.062 38.875c-0.003906-0.007812-0.007812-0.007812-0.011719-0.007812-0.53125-0.44141-1.1016-0.76953-1.7305-0.99609-0.62891-0.21875-1.3047-0.32812-2.043-0.32812-1.0078 0-2.125 0.20703-3.3555 0.62109-0.5625 0.19141-1.668 0.65234-2.7422 1.6016-1.7188 1.5195-3.3438 4.2852-1.3047 8.8281 0.46875 1.043 1.1016 1.9609 1.8711 2.7344 3.4648 3.4805 9.4922 3.7031 13.34 1.9492-0.027344-7.2461-1.4141-12.219-4.0234-14.402z"
              />
              <motion.path
                fill="var(--alert-bg-danger)"
                stroke="var(--text-color-primary-800)"
                strokeWidth="1"
                initial={{ fillOpacity: 0 }}
                animate={{ fillOpacity: 1 }}
                transition={{ duration: 0.5 }}
                d="m81.188 29.848h-0.003906c-3.2734-0.011718-5.5195 0-6.6719 0.035156-2.0938 0.0625-4.4531 0.27734-5.9102 2.0039-1.0742 1.2734-1.5117 3.2578-1.3164 5.9023 0.67969-0.44922 1.418-0.8125 2.1523-1.0586 3.3867-1.1445 6.2031-0.875 8.3594 0.79688h7.5625v-7.6523c-0.88281-0.007812-2.457-0.019531-4.1719-0.027344z"
              />
              <motion.path
                fill="var(--alert-bg-danger)"
                stroke="var(--text-color-primary-800)"
                strokeWidth="1"
                initial={{ fillOpacity: 0 }}
                animate={{ fillOpacity: 1 }}
                transition={{ duration: 0.5 }}
                d="m68.223 53.676c0.24219 2.9648-0.16016 6.7969-2.5234 10.785 1.7773 2.2891 3.7344 6.1523 3.7344 12.094 0 0.41797-0.33984 0.75781-0.75781 0.75781s-0.75781-0.33594-0.75781-0.75781c0-5.1562-1.5664-8.5977-3.0977-10.734-0.44531 0.64453-0.94141 1.2734-1.4805 1.8945-0.94141 1.0859-1.8359 2.1484-2.6602 3.1602-0.007813 0.011719-0.015626 0.023438-0.027344 0.03125-7.0195 8.6406-9.1328 14.02-7.8047 19.84 0.089844 0.41016-0.16406 0.8125-0.57031 0.90234-0.058594 0.015624-0.11328 0.019531-0.17188 0.019531-0.34375 0-0.65234-0.23438-0.73438-0.58594-1.4023-6.1406 0.60938-11.699 7.4102-20.262-1.5039-0.45312-3.0391-0.84766-4.5781-1.1641-0.003906 0-0.011719-0.003906-0.019531-0.003906-0.59375-0.125-1.1562-0.23047-1.7148-0.32422-1.9219 0.95312-7.2109 3.9727-8.4414 8.7383-0.085938 0.34375-0.39453 0.57031-0.73047 0.57031-0.0625 0-0.125-0.007813-0.1875-0.027344-0.40625-0.10156-0.65234-0.51562-0.54297-0.91797 1.082-4.207 4.7227-7.1016 7.418-8.7266-2.7773-0.33203-5.4375-0.40234-7.9492-0.19531-0.41797 0.035157-0.77734-0.27734-0.8125-0.69141s0.27734-0.77734 0.69141-0.8125c3.293-0.27344 6.8359-0.089844 10.539 0.53125 0.007813 0 0.019531 0 0.03125 0.003906 0.09375 0.015625 0.1875 0.03125 0.28516 0.050781-1.3398-2.4609-1.9492-5.5703-1.8125-9.2852 0.015625-0.41406 0.37109-0.74609 0.78516-0.72656 0.41406 0.015625 0.74219 0.36719 0.72656 0.78125-0.14844 3.9766 0.65234 7.2891 2.3242 9.6172 1.6914 0.36328 3.375 0.80078 5.0117 1.3203 0.75-0.91406 1.5508-1.8633 2.3867-2.8281 0.73047-0.84375 1.375-1.7148 1.9219-2.582 0.003907-0.007813 0.007813-0.011719 0.011719-0.015626 2.3203-3.707 3.125-7.7109 2.3711-11.91-0.82812-0.86328-1.5039-1.8711-2.0156-3.0117-2.3984-5.3398-0.30469-8.6641 1.3828-10.301-0.4375-3.5547 0.085938-6.2422 1.5664-7.9961 2.0156-2.3906 5.2773-2.4883 7.0273-2.543 1.0742-0.03125 3.0742-0.042969 5.9609-0.035156v-6.7539c-3.2539-0.27734-6.2734-0.4375-8.9805-0.47266h-0.007812c-10.391-0.14453-16.941 1.4492-20.031 4.8672-0.75 0.83203-0.64844 2.0352-0.52344 3.5625 0.27734 3.2812 0.65234 7.7734-8.6875 10.488-2.3477 0.67969-4.9414 1.9375-7.7148 3.7344-0.015625 0.011719-0.03125 0.023437-0.046875 0.03125-7.7188 5.0156-15.031 13.055-18.074 16.598 1.8555 6.2266 5.2148 12.531 9.9883 18.766 5.0039 6.5391 9.957 12.227 14.719 16.906 2.6523 2.6055 6.168 4.0039 9.8906 3.9414 3.7383-0.066406 7.2188-1.6016 9.793-4.3281 8.1172-8.5703 18.078-20.832 19.441-30.613 0.51172-3.6523 0.80469-7.0547 0.87891-10.137-1.5898 0.61719-3.418 0.95312-5.2852 0.95312-2.6211-0.003906-5.3398-0.68359-7.5547-2.2031z"
              />
              <motion.path
                fill="var(--alert-bg-danger)"
                stroke="var(--text-color-primary-800)"
                strokeWidth="1"
                initial={{ fillOpacity: 0 }}
                animate={{ fillOpacity: 1 }}
                transition={{ duration: 0.5 }}
                d="m26.402 24.859c3.1484-0.94141 6.3789-1.0508 8.7852-0.92969 1.4648-4.4766 3.6797-7.9688 6.5938-10.391l-1.0117-5.5859-2.6406 1.0469c-0.35938 0.14453-0.76953-0.011719-0.95312-0.35938l-4.4141-8.5898-4.7266 2.3281 4.4141 8.832c0.13672 0.26562 0.097656 0.58594-0.089844 0.81641-4.25 5.1719-5.5703 9.9297-5.957 12.832z"
              />
              <motion.path
                fill="var(--alert-bg-danger)"
                stroke="var(--text-color-primary-800)"
                strokeWidth="1"
                initial={{ fillOpacity: 0 }}
                animate={{ fillOpacity: 1 }}
                transition={{ duration: 0.5 }}
                d="m42.105 6.8359 1.2461 6.8711c0.050782 0.27734-0.058593 0.55469-0.27734 0.73047-2.9609 2.332-5.1914 5.8594-6.6172 10.48-0.003906 0.007812-0.003906 0.019531-0.007812 0.027343-1.9648 6.3711-1.9492 13.266-1.7461 16.895 2.5117-1.5312 4.8867-2.6289 7.0742-3.2617 8.1523-2.3672 7.875-5.6914 7.6055-8.9102-0.14062-1.6641-0.28516-3.3828 0.90234-4.6992 3.2969-3.6406 9.582-5.3594 19.734-5.375-3.4805-4.8008-8.6875-8.1602-9.6836-8.5977h-0.003907c-0.0625-0.003906-0.11719-0.019532-0.17578-0.042969-0.039062-0.015625-0.078125-0.035156-0.11719-0.054687-0.003906 0-0.003906-0.003907-0.007812-0.003907-0.003906-0.003906-0.015625-0.007812-0.023438-0.011719-0.023437-0.015624-0.042968-0.027343-0.0625-0.046874-0.007812-0.003907-0.015624-0.007813-0.023437-0.015626-0.015625-0.011718-0.027344-0.023437-0.039063-0.039062-0.003906 0-0.011718-0.007812-0.015624-0.011719-0.019532-0.019531-0.042969-0.042969-0.058594-0.0625-0.019532-0.019531-0.035156-0.039062-0.046875-0.058593-0.015625-0.027344-0.035157-0.054688-0.046875-0.078126-0.015625-0.035156-0.03125-0.066406-0.042969-0.10547-0.011719-0.03125-0.019531-0.0625-0.027344-0.097656-0.007812-0.039063-0.011719-0.074219-0.011719-0.11719v-0.027344c0-0.039062 0.003907-0.070312 0.011719-0.10938 0.003907-0.03125 0.007813-0.058593 0.019531-0.089843 0.003907-0.007813 0.003907-0.015626 0.007813-0.027344 0-0.003906 0-0.003906 0.003906-0.007813 0.17969-0.66406 1.8203-6.3281 2.4297-8.4297l-4.6758-1.5586-3.5391 9.957c-0.085937 0.24609-0.29688 0.42969-0.54688 0.48438l-4.7578 1.0586c-0.20313 0.046875-0.41406 0.003906-0.58594-0.11328-0.17578-0.11719-0.29297-0.29688-0.32422-0.50391l-1.7266-10.582-4.8438 1.0078 0.98828 5.457c0.003906 0.027344 0.007812 0.050781 0.011719 0.070313z"
              />
              <motion.path
                fill="var(--alert-bg-danger)"
                stroke="var(--text-color-primary-800)"
                strokeWidth="1"
                initial={{ fillOpacity: 0 }}
                animate={{ fillOpacity: 1 }}
                transition={{ duration: 0.5 }}
                d="m33.246 42.77c-0.23438-3.2617-0.42969-10.477 1.4805-17.344-2.5039-0.097656-5.8203 0.085938-8.9102 1.2227-0.007812 0-0.011718 0.003906-0.019531 0.007812-3.0977 1.1367-5.418 3.043-6.9023 5.6602-2.5391 4.4922-6.2109 13.77-3.0117 26.312 3.3516-3.8242 10.141-11.078 17.363-15.859z"
              />
            </g>
          </motion.svg>
        </motion.div>
        {/* <div className="text-[var(--text-color-primary-800)]">{countLikes}</div> */}
        <div className="text-[var(--text-color-primary-800)]">{totalLikes}</div>
      </>
    )
  );
};

export default LikeButton;
