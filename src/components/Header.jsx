import { GiPopcorn } from "react-icons/gi";
export default function Header({ setSearch  }) {
  return (
    <header className="flex flex-wrap justify-around  items-center p-4 bg-fuchsia-950 text-white">
      <div className="logo flex gap-2 items-center lg:w-1/4">
        <GiPopcorn className="size-7" />{" "}
        <span className="font-bold text-xl"> Use Popcorn </span>
      </div>
      <form className="search lg:w-1/3" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search for movies"
          className="border rounded-sm px-5 py-2 card bg-fuchsia-100 text-black focus:outline-none border-none w-full"
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <div className="results font-bold  text-lg lg:w-1/4">
        <p>
          found <span> 10 </span> results
        </p>
      </div>
    </header>
  );
}
