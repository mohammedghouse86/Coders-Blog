import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animationData_1 from './body building.json'; // Ensure this path is correct
import animationData_2 from './loading Animation - 1714278047310.json'; // Ensure this path is correct

const MyAnimation = () => {
  const animationContainer = useRef(null);
  const animationContainer1 = useRef(null);

  useEffect(() => {
    let animationInstance;
    let animationInstance1;

    if (animationContainer.current) {
      animationInstance = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData_1, // Use the imported animation data
      });
    }

    if (animationContainer1.current) {
      animationInstance1 = lottie.loadAnimation({
        container: animationContainer1.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData_2, // Use the imported animation data
      });
    }

    // Clean up animation on unmount
    return () => {
      if (animationInstance) {
        animationInstance.destroy();
      }
      if (animationInstance1) {
        animationInstance1.destroy();
      }
    };
  }, []);

  return (
    <div className='container'>
      <div ref={animationContainer} style={{ width: '50%', height: '150px', background: '#eee' }}>
        Animation 1
      </div>
      <div ref={animationContainer1} style={{ width: '50%', height: '150px', background: '#eee' }}>
        Animation 2
      </div>
    </div>
  );
};

export default MyAnimation;
