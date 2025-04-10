export default function DescriptionSelectedMovie({selectedMovie}) {
  return (
    <div className="w-full bg-fuchsia-950/40 p-4 rounded-lg shadow-md">
      <p className="text-fuchsia-50 text-lg">{selectedMovie.description}</p>
    </div>
  );
    
}