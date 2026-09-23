import Image from 'next/image';

export default function Logo({ className = "h-9 sm:h-10 w-auto", mobile = false }) {
  const src = mobile ? "/mobile-logo.png" : "/logo.png";
  return (
    <div className="flex items-center select-none" aria-label="MerxoDev Solutions">
      <Image
        src={src}
        alt="MerxoDev Solutions"
        width={mobile ? 40 : 130}
        height={mobile ? 40 : 30}
        className={`${className} object-contain`}
        style={{ width: 'auto', height: 'auto' }}
        priority
        unoptimized
      />
    </div>
  );
}
