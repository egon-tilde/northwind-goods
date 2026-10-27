export default function PromoBanner() {
  return (
    <div className="mt-6 flex items-center gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
      <img src="https://cdn.dummyjson.com/product-images/groceries/green-bell-pepper/thumbnail.webp" alt="image.png" className="h-14 w-14" />
      <div>
        <p className="font-semibold">Fresh groceries, now with same-day delivery</p>
        <p className="text-sm" style={{ color: '#d6d3d1' }}>
          Order before 2pm in selected cities.
        </p>
      </div>
      <div aria-hidden="true" className="ml-auto">
        <button className="rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold">Details</button>
      </div>
    </div>
  );
}
