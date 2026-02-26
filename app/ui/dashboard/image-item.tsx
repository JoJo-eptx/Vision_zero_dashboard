import Image from 'next/image';
import React from 'react';

export default function ImageSection(props: {png: string}) {
    return (
        <div className="flex items-center justify-center p-6 md:w-full md:px-28 md:py-12">
            <Image
                src={ props.png }
                width={600}
                height={700}
                className='hidden md:block'
                alt=""
            />
        </div>
    );
}