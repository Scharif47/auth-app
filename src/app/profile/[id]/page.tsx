export default function UserProfile({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 text-slate-100">
      {/* Title of the Page */}
      <h1 className="text-white text-4xl">Profile Page</h1>
      <hr />
      <p className="text-2xl mt-6">
        Profile
        <span className="p-2 rounded bg-red-600 text-black">{params.id}</span>
      </p>
    </div>
  );
}
