export default function ErrorPage() {
  return (
    <div className="gap-10 w-screen h-screen bg-gradient-to-br from-emerald-900 via-green-900 to-emerald-700 flex justify-center items-center flex-col">
      <p
        className={`text-center text-3xl md:text-5xl font-bold text-emerald-200 drop-shadow-lg`}
      >
        Sorry, something went wrong
      </p>
    </div>
  );
}
