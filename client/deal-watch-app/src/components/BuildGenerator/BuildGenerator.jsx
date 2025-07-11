import { useState, useEffect } from "react"
import './BuildGenerator.css'
import CPUBuildForm from "./BuildComponentForms/CPUBuildForm"
import VideoCardBuildForm from "./BuildComponentForms/VideoCardBuildForm"
import MotherboardBuildForm from "./BuildComponentForms/MotherboardBuildForm"
import MemoryBuildForm from "./BuildComponentForms/MemoryBuildForm"
import HardDriveBuildForm from "./BuildComponentForms/HardDriveBuildForm"
import PowerSupplyBuildForm from "./BuildComponentForms/PowerSupplyBuildForm"
import CaseBuildForm from "./BuildComponentForms/CaseBuildForm"

const BuildGenerator = () => {
    const [allocations, setAllocations] = useState({})
    const handleAllocations = (pointsDict) => {
        Object.keys(pointsDict).forEach((key) => {
            setAllocations(prevAllocations => {
                let newDict = {...prevAllocations}
                newDict[key] = pointsDict[key]
                return newDict
            })
        })
    }
    return(
        <div className='build-gen'>
            <div className='build-gen-forms'>
                <div className='build-gen-forms-cpu'>
                    <CPUBuildForm handleAllocations={handleAllocations}/>
                    <VideoCardBuildForm handleAllocations={handleAllocations}/>
                    <MotherboardBuildForm handleAllocations={handleAllocations}/>
                    {/* Need socket and form factor */}
                    <MemoryBuildForm handleAllocations={handleAllocations}/>
                    <HardDriveBuildForm handleAllocations={handleAllocations}/>
                    <PowerSupplyBuildForm handleAllocations={handleAllocations}/>
                    {/* Need form factor */}
                    <CaseBuildForm handleAllocations={handleAllocations}/>
                    {/* Need form factor and colors */}
                </div>
            </div>
        </div>
    )
}

export default BuildGenerator