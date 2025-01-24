import React from 'react';
import Button from './components/button/Button';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const App = () => {
  const [currentTab, setCurrentTab] = React.useState('list');
  const buttonsRef = React.useRef<HTMLDivElement>(null!);
  const indicatorRef = React.useRef<HTMLDivElement>(null!);

  useGSAP(() => {
    const updateIndicator = () => {
      const activeButton = buttonsRef.current.querySelector(
        `button[data-tab="${currentTab}"]`
      );

      if (activeButton) {
        const { width, height, left, top } =
          activeButton.getBoundingClientRect();
        const containerRect = buttonsRef.current.getBoundingClientRect();

        gsap.to(indicatorRef.current, {
          width,
          height,
          x: left - containerRect.left,
          y: top - containerRect.top,
          duration: 0.3,
          ease: 'power3.out',
        });
      }
    };

    updateIndicator();
  }, [currentTab]);

  useGSAP(() => {
    const buttons = buttonsRef.current.querySelectorAll('button');

    const handleHover = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLElement;
      const { width, height, left, top } = target.getBoundingClientRect();

      const containerRect = buttonsRef.current.getBoundingClientRect();

      gsap.to(indicatorRef.current, {
        width,
        height,
        x: left - containerRect.left,
        y: top - containerRect.top,
        duration: 0.2,
        ease: 'power3.out',
      });
    };

    const resetIndicator = () => {
      const activeButton = buttonsRef.current.querySelector(
        `button[data-tab="${currentTab}"]`
      );

      if (activeButton) {
        const { width, height, left, top } =
          activeButton.getBoundingClientRect();
        const containerRect = buttonsRef.current.getBoundingClientRect();

        gsap.to(indicatorRef.current, {
          width,
          height,
          x: left - containerRect.left,
          y: top - containerRect.top,
          duration: 0.2,
          ease: 'power3.out',
        });
      }
    };

    buttons.forEach((button) => {
      button.addEventListener('mouseenter', handleHover);
      button.addEventListener('mouseleave', resetIndicator);
    });

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener('mouseenter', handleHover);
        button.removeEventListener('mouseleave', resetIndicator);
      });
    };
  }, [currentTab]);

  return (
    <main className='min-h-dvh flex items-center justify-center'>
      <div
        ref={buttonsRef}
        className='rounded-[20px] bg-white p-1 relative flex'
      >
        <div className='absolute top-0 left-0 z-[0]'>
          <div
            ref={indicatorRef}
            className='bg-gray-100 w-full h-full rounded-full'
          />
        </div>
        <Button
          data-tab='list'
          onClick={() => setCurrentTab('list')}
        >
          List
        </Button>
        <Button
          data-tab='table'
          onClick={() => setCurrentTab('table')}
        >
          Table
        </Button>
        <Button
          data-tab='grid'
          onClick={() => setCurrentTab('grid')}
        >
          Grid
        </Button>
      </div>
    </main>
  );
};

export default App;
