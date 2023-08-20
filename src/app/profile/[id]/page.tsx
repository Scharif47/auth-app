export default function UserProfile({params}: {params: {id: string}}) {

  console.log("params: ", params)

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 text-slate-100">
      {/* Title of the Page */}
      <h1 className="text-white text-2xl">Profile</h1>
      <hr />
      <p className="text-4xl">Profile page 
        <span className=" p-2 rounded bg-red-600 text-black">{params.id}</span>
      </p>
    </div>
  )
}