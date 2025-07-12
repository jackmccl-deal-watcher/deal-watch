import ComponentBuildForm from "./ComponentBuildForm"

const MemoryBuildForm = (component_form_prop) => {
    return(
        <div>
            <ComponentBuildForm {...component_form_prop}/>
        </div>
    )
}

export default MemoryBuildForm