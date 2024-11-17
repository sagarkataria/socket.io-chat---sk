
import { CiLogout } from "react-icons/ci";
const Logout = () => {
    return (
        <>
            <div className="w-[3%] bg-slate-400 text-white flex flex-col justify-end">
                <form action="">
                    <div className="flex space-x-4">
                        <button>
                            <CiLogout className="text-5xl p-2 hover:bg-gray-600 rounded-full duration-300" />
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Logout