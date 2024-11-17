import { IoSearch } from "react-icons/io5";
const Search = () => {
    return (
       <div className="h-[10vh]">
         <div className="px-6 py-4">
            <form action="">
              <div className="flex space-x-4">
                <label className="input input-bordered flex items-center gap-2 w-[80%]">
                    <input type="text" className="border-[1px] border-gray-700 bg-slate-900 rounded-lg flex items-center w-full" placeholder="Search" />
                </label>
                <button>
                    <IoSearch className="text-5xl p-2 hover:bg-gray-600 rounded-full duration-300"/>
                </button>
                </div>
            </form>
        </div>
       </div>
    )
}

export default Search