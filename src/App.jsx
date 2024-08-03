import { useState, useCallback, useEffect, useRef } from "react";

export default function App() {
  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

  const passRef= useRef(null);

  const copyPass= useCallback(()=>{
    passRef.current?.select();
      window.navigator.clipboard.writeText(password);
  }, [password])
  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCJDNSJKFNKSJNFKJNOIEEONAKJKSAKJjkcshkanwoioeoixmzxznkjnenasjoaopaq";
    if (num) str += "0123456789";
    if (char) str += "!@$*%*()*";
    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
  }, [length, num, char, setPassword]);
  useEffect(()=>{
    passGenerator();
  }, [length, num, char, passGenerator])
  return (
    <div className="w-full max-w-md mx-auto px-5 my-5 bg-gray-800 text-white">
      <h1 className="text-center text-white">Password Generator</h1>
      <div className="flex shadow-md overflow-hidden mb-4 bg-gray-700 rounded-lg">
        <input
          type="text"
          value={password}
          className="w-full outline-none py-2 px-3 bg-gray-600 text-white"
          readOnly
          placeholder="Password"
          aria-label="Generated Password"
          ref={passRef}
        />
        <button onClick={copyPass} className="outline-none bg-white text-black">copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range" min={8} max={23} value={length} className="cursor-pointer" onChange={(e)=>{
              setLength(e.target.value)
          }}/>
            <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={num} className="flex items-center gap-x-1" onChange={()=>{
              setNum((prev)=>!prev);
          }}/>
            <label>Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={char} className="flex items-center gap-x-1" onChange={()=>{
              setChar((prev)=>!prev);
          }}/>
            <label>Characters</label>
        </div>
      </div>
    </div>
  );
}
