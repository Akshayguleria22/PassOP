import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
const Manager = () => {
  const ref = useRef();
  const [form, SetForm] = useState({
    url: "",
    username: "",
    password: ""
  });
  const [passwords, setPasswords] = useState([]);
  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let stored = await req.json();
    if (stored) {
      setPasswords((stored));
    }
  }
  useEffect(() => {
    getPasswords();
  });
  const savePassword = async () => {
    if (form.url && form.username && form.password) {
      const newPassword = { ...form, id: uuidv4() };
      const newPasswords = [...passwords, newPassword];
      setPasswords(newPasswords);
      try {
        const res = await fetch("http://localhost:3000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newPassword)
        });

        if (res.ok) {
          toast.success('Added Successfully!!');
          SetForm({
            url: "",
            username: "",
            password: ""
          });
        } else {
          toast.error("Server error. Could not save.");
        }
      } catch (error) {
        console.error("Error saving password:", error);
        toast.error("Network error. Could not save.");
      }
    } else {
      toast.error("Please fill all fields!");
    }
  };
  
  const handleChange = (e) => {
    SetForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }
  const showPassword = () => {
    if (ref.current.src.includes("/icons/Eyeopen.svg")) {
      ref.current.src = "/icons/EyeCross.svg";
      document.getElementById("pass").type = "password";
    } else {
      ref.current.src = "/icons/Eyeopen.svg";
      document.getElementById("pass").type = "text";
    }
  }
  const handleDelete = async (id) => {
    const newPasswords = passwords.filter((password) => password.id !== id);
    setPasswords(newPasswords);
    let res = await fetch("http://localhost:3000/", {
      method: "DELETE"
    });
  };
  const handleEdit = (index) => {
    const passwordToEdit = passwords[index];
    SetForm({
      url: passwordToEdit.url,
      username: passwordToEdit.username,
      password: passwordToEdit.password
    });
    handleDelete(passwordToEdit.id);
  };
  return (
    <div>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="absolute inset-0 justify-center items-center flex -z-10 bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
        <div className="flex flex-col mx-auto text-white p-6 sm:p-8 md:p-10 w-[95%] sm:w-4/5 lg:w-2/3 bg-blue-200 rounded-lg items-center justify-center">
          <div className="text-black font-sans text-lg tems-start font-bold">
            <span className="text-blue-500">&lt;</span>
            Pass
            <span className="text-blue-500">OP&gt;</span>
          </div>
          <p className=" text-black font-semibold font-sans text-lg">Your Own Password Manager</p>
          <div className="flex flex-col gap-4 p-4 sm:p-6 md:p-10 items-center text-white rounded-lg w-full justify-between">
            <input type="text" onChange={handleChange} value={form.url} placeholder="Website URL" name="url" id="" className="border-2 text-black p-4 py-1 bg-white rounded-full border-green-500 w-full" />
            <div className="flex h-10 w-full items-center justify-between gap-3">
              <input type="text" onChange={handleChange} value={form.username} placeholder="Your Username" name="username" id="" className="border-2 text-black p-4 py-1 bg-white rounded-full border-green-500 w-full" />
              <div className="relative flex items-center w-full">
                <input type="password" onChange={handleChange} value={form.password} name="password" placeholder="Your Password" id="pass" className="border-2 text-black p-4 py-1 bg-white rounded-full border-green-500 w-full" />
                <span className="absolute right-2 text-gray-500 text-8 cursor-pointer " onClick={showPassword}>
                  <img ref={ref} src="/icons/EyeCross.svg" alt="Eye" className="h-8" />
                </span>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center">
              <button onClick={savePassword} className="bg-green-400 text-black hover:bg-green-300 flex text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-2 rounded-full items-center gap-2">
                <lord-icon
                  src="https://cdn.lordicon.com/sbnjyzil.json"
                  trigger="hover"
                  style={{ height: '30px' }}>
                </lord-icon>
                Save
              </button>
            </div>
            <div className="w-full flex flex-col items-center justify-center">
              {passwords.length === 0 && <p className="text-black font-semibold text-2xl ">No passwords saved yet!!!</p>}
              {passwords.length > 0 && <div className="w-full overflow-x-auto"><h2 className="font-bold text-2xl py-4 text-black">Your Passwords</h2>
                <table className="min-w-[600px] w-full rounded-md overflow-hidden">
                  <thead className="bg-green-700 text-white">
                    <tr>
                      <th className="py-2">URL</th>
                      <th className="py-2">Username</th>
                      <th className="py-2">Password</th>
                      <th className="py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-green-100 py-3 text-center text-10 font-sans text-black">
                    {passwords.map((item, index) => (
                      <tr key={item.id}>
                        <td className="text-center px-2 py-3">
                          <div className="flex flex-row items-center justify-center gap-2">
                            <a href={item.url} target="_blank">{item.url}</a>
                            <button className="cursor-pointer rounded-full p-1" onClick={() => {
                              navigator.clipboard.writeText(item.url);
                              toast('URL Copied!!');
                            }}>
                              <img src="/icons/copy.png" alt="copy" className="h-4" />
                            </button>
                          </div>
                        </td>
                        <td className="text-center px-2 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <span>{item.username}</span>
                            <button onClick={() => {
                              navigator.clipboard.writeText(item.username);
                              toast('Username Copied!!');
                            }}>
                              <img src="/icons/copy.png" className="h-4" />
                            </button>
                          </div>
                        </td>

                        <td className="text-center px-2 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <span>{"*".repeat(item.password.length)}</span>
                            <button onClick={() => {
                              navigator.clipboard.writeText(item.password);
                              toast('Password Copied!!');
                            }}>
                              <img src="/icons/copy.png" className="h-4" />
                            </button>
                          </div>
                        </td>

                        <td>
                          <button className="cursor-pointer rounded-full p-2" onClick={() => {
                            handleDelete(item.id);
                            toast.error('Deleted!!');
                          }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/jzinekkv.json"
                              trigger="hover">
                            </lord-icon>
                          </button>
                          <button className="cursor-pointer rounded-full p-2" onClick={() => {
                            handleEdit(index);
                          }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/exymduqj.json"
                              trigger="hover">
                            </lord-icon>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Manager
