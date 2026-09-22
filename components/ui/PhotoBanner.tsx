import Image from "next/image";

export default function PhotoBanner({
  src,
  alt,
  className = "",
  imgClassName = "h-56 w-full object-cover sm:h-72 lg:h-80",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl shadow-lg shadow-slate-900/10 ring-1 ring-slate-100 ${className}`}
    >
      <Image src={src} alt={alt} width={1600} height={900} className={imgClassName} />
    </div>
  );
}
