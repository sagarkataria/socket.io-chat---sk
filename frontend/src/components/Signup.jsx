import { useForm } from "react-hook-form"
import axios from 'axios';

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const password = watch("password","");
  // const confirmPassword = watch("confirmPassword","");
  const validatePasswordMatch = (value)=>{
    return value === password || "Password and confirm password don't match";
  }

  const onSubmit = (data) => {
   const userInfo = {
      name: data.name,
      email: data.email,
      password:data.password,
      confirmPassword:data.confirmPassword
    };
    console.log(userInfo);
    axios.post("http://localhost:5002/user/signup",userInfo)
    .then((response) => {
      console.log(response.data);
      if(response.data){
        alert("User created successfully");
      }
      localStorage.setItem("messageUser",JSON.stringify(response.data))
    })
    .catch((error)=>{
      console.log(error)
      if(error.response){
        alert("Error",error.response.data.error)
      }
    });
  }
  return (
    <>
      <div className="flex h-screen items-center justify-center ">
        <div className="p-6">
          <h1 className="text-blue-500 font-bold text-2xl">Messenger</h1>
          <form action="" className="space-y-4 w-96" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-2xl items-center">Create a new <span className="text-blue-500 font-semibold">Account</span></h1>
            <h2>Its's free and always will be</h2>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path
                  d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" className="grow" placeholder="Email" {...register("email", { required: true })}/>
            </label>
            {errors.email && <span className="text-red-600 font-semibold text-sm">This field is required</span>}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input type="text" className="grow" placeholder="Username" {...register("name", { required: true })}/>
            </label>
            {errors.name && <span className="text-red-600 font-semibold text-sm">This field is required</span>}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd" />
              </svg>
              <input type="password" className="grow" placeholder="password" {...register("password", { required: true })}/>
            </label>
            {errors.password && <span className="text-red-600 font-semibold text-sm" >This field is required</span>}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd" />
              </svg>
              <input type="password" className="grow" placeholder="confirm password" {...register("confirmPassword", { required: true,validate:validatePasswordMatch })}/>
            </label>
            {errors.confirmPassword && <span className="text-red-600 font-semibold text-sm">{errors.confirmPassword.message}</span>}
          <div className="flex justify-center py-4">
            <input type="submit" value="Signup" className="text-white bg-blue-500 w-full rounded-lg p-2 cursor-pointer text-xl hover:bg-blue-700"/>
          </div>
          <div className="flex ">
            <p className="text-gray">Have any Account? <span className="text-blue-500 cursor-pointer ml-3 underline">Login</span></p>
          </div>
          </form>
        </div>  
      </div>
    </>
  )
}

export default Signup