import {useState} from 'react'



const ManualSteerGrabber =() =>{
    const [position, setPosition] = useState(0)
    const applyPosition = async ()=>{
        console.log('applying position')
        const applyStatus = await fetch(process.env.REACT_APP_NODE_SERVER_ADDR+'/manualSteer/',{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
              },
            mode: "cors",
            body: JSON.stringify({position}),
        })

    } 
    return (
    <div>
    <div>
        <label>Current position:
            <p>{position}</p>
        </label>
        <label>
        Set position for the grabber
        <input onChange={e=>setPosition(e.target.value)} type="Number"/>
    </label>
    <button onClick={()=>{applyPosition()}}>Apply Position</button>
    </div>
</div>)
}

export const ManualSteering = () =>{
   return <ManualSteerGrabber/>
}