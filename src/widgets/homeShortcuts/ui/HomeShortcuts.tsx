import Image from "next/image";
import Link from "next/link";
import { SHORTCUTS } from "../config/shortcuts";

export const HomeShortcuts = () => {
  return (
    <div className="flex w-full flex-row items-center justify-between gap-5 max-[744px]:flex-col">
      {SHORTCUTS.map((shortcut) => (
        <Link
          key={shortcut.href}
          className={[
            shortcut.gradient,
            "flex h-72 flex-1 flex-col justify-between rounded-2xl bg-linear-to-br p-12 duration-300 hover:scale-105 max-[1024px]:h-48 max-[1024px]:p-6 max-[744px]:w-full",
          ].join(" ")}
          href={shortcut.href}
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-black max-[1024px]:text-lg">
              {shortcut.title}
            </h2>
            <p className="text-gray1 text-sm">{shortcut.description}</p>
          </div>
          <div className="flex items-center justify-end">
            <div className="relative h-31.5 w-31.5 max-[1024px]:h-20 max-[1024px]:w-20">
              <Image
                className="object-contain"
                src={shortcut.imageSrc}
                alt={shortcut.imageAlt}
                fill={true}
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
