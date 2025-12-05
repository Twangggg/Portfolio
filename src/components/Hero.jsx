export default function Hero() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden from-aquamarine-600 to-aquamarine-950 bg-gradient-to-t flex flex-col justify-start items-center py-52">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-aquamarine-400/20 rounded-full blur-[150px]" />
      </div>

      <h2 className="text-white text-6xl font-mono drop-shadow-lg">
        Portfolio
      </h2>

      <div className="text-aquamarine-300 font-mono text-7xl py-3 drop-shadow-lg">
        Backend Developer
      </div>
      <ul className="flex flex-row gap-10 py-5 text-lg">
        {["About Me", "Skill", "Experience", "Project"].map((item) => (
          <li
            key={item}
            className="text-aquamarine-200 font-mono transform transition hover:scale-125 hover:text-aquamarine-50"
          >
            [{item}]
          </li>
        ))}
      </ul>

      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-b from-transparent to-aquamarine-950" />
    </div>
  );
}
