export default function SearchBar() {
  return (
    <div className="flex items-center">
      <input
        className="w-full rounded-l-md px-3 py-2 text-black"
        placeholder="Busque recursos, segmentos..."
      />
      <button className="rounded-r-md px-4 py-2 bg-primary text-white">Buscar</button>
    </div>
  )
}
