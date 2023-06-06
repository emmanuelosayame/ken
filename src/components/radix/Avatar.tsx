"use client";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import * as RadixAvatar from "@radix-ui/react-avatar";

interface AvatarProps {
  src?: string;
  alt?: string;
  className?: string;
  fallback?: string;
}

const Avatar = ({ src, alt, className, fallback }: AvatarProps) => {
  const fallbackInitials = fallback
    ?.split(" ")
    .map((name) => name.charAt(0).toUpperCase())
    .join(" ");
  return (
    <RadixAvatar.Root
      className={`inline-flex items-center select-none overflow-hidden shadow-sm ${className}`}>
      <RadixAvatar.Image
        className='AvatarImage w-full h-full object-cover'
        src={src}
        alt={alt}
      />
      <RadixAvatar.Fallback
        className='w-full h-full bg-neutral-400 p-1
       flex text-white/80 items-center justify-center'
        delayMs={src ? 500 : undefined}>
        {!fallback ? (
          <UserCircleIcon width={"100%"} />
        ) : (
          <h3 className='text-base font-medium'>{fallbackInitials}</h3>
        )}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
};

export default Avatar;
