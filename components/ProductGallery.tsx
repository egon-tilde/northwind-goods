'use client';
import { useState } from 'react';

export default function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div>
      <div className="overflow-hidden rounded-3xl bg-white" onClick={() => setZoomed((z) => !z)}>
        <img
          src={images[active]}
          alt={title}
          className={`aspect-square w-full object-contain transition-transform duration-300 ${zoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              className={`h-16 w-16 overflow-hidden rounded-lg border-2 ${i === active ? 'border-teal-700' : 'border-transparent'}`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
