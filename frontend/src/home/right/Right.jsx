import Chatuser from "./Chatuser"
import Messages from "./Messages"
import Type from "./Type"

export const Right = () => {
  return (
    <div className="w-[70%]  bg-slate-950 text-white">
        <Chatuser/>
        <Messages/>
        <Type/>
    </div>
  )
}
