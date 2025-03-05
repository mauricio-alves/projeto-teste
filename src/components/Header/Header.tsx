export function Header() {
  return (
    <div className="flex justify-around items-center bg-black text-white py-5">
      <a className="logo" href="/">
        <img src="/vite.svg" alt="vite logo" className="max-w-[150px]" />
      </a>
      <h1 className="text-xl flex items-baseline self-center justify-center text-center">
        Projeto Teste - React TS
      </h1>
    </div>
  );
}
