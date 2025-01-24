import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = React.ComponentProps<'button'>;

const Button = ({ className, ...restProps }: Props) => {
  return (
    <button
      {...restProps}
      className={twMerge(
        'text-sm font-semibold py-2 leading-none px-3 rounded-[20px] cursor-pointer text-gray-400 hover:text-gray-900 transition-all ease duration-200 z-[2] w-full flex items-center justify-center text-center',
        className
      )}
    />
  );
};

export default Button;
