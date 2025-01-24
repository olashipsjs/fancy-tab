import React from 'react';
import Button from './components/button/Button';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { twMerge } from 'tailwind-merge';

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
        ease: 'power3.inOut',
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
          ease: 'power3.inOut',
        });
      }
    };

    buttons.forEach((button) => {
      button.addEventListener('click', handleHover);
      button.addEventListener('mouseleave', resetIndicator);
    });

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener('click', handleHover);
        button.removeEventListener('mouseleave', resetIndicator);
      });
    };
  }, [currentTab]);

  return (
    <main className='min-h-dvh flex items-center justify-center bg-gray-50'>
      <div
        ref={buttonsRef}
        className='rounded-[20px] p-1 relative flex bg-gray-100'
      >
        <div className='absolute top-0 left-0 z-[0]'>
          <div
            ref={indicatorRef}
            className='w-full h-full rounded-full bg-white ring-1 ring-gray-200'
          />
        </div>

        {['list', 'table', 'grid'].map((tab) => {
          return (
            <Button
              key={tab}
              data-tab={tab}
              className={twMerge(
                'capitalize',
                currentTab === tab && 'text-gray-900'
              )}
              onClick={() => setCurrentTab(tab)}
            >
              {tab}
            </Button>
          );
        })}
      </div>
    </main>
  );
};

export default App;
