import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

interface MetericProps {
  imgUrl: string;
  alt: string;
  value: number | string;
  title: string;
  href?: string;
  isAuthor?: boolean;
  textStyles?: string;
}


const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  href,
  isAuthor,
  textStyles
} : MetericProps) => {

  const MetricContent= ()=> {
    return (
      <>
        <Image
          src={imgUrl}
          width={16}
          height={16}
          alt={alt}
          className={`object-contain ${href ? "rounded-full" : ""}`}
        />
        <p className={`flex items-center gap-1 ${textStyles}`}>
          {value} 
          <span className={`small-regular line-clamp-1 ${isAuthor ? 'max-sm:hidden' : ''}`}>{title}</span>
        </p>
      </>
    )
  }

  if(href){
    return (
      <Link href={href} className='flex-center gap-1'>
        <MetricContent />
      </Link>
    )
  }

  return (
    <div className="flex-center flex-wrap gap-1">
      <MetricContent />
    </div>
  );
}

export default Metric