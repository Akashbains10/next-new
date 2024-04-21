'use client'

import { useFormState } from "react-dom"
import { createTask } from "../action"

const initialState = {
    message: ''
}

export default function AddForm() {
    const [state, formAction] = useFormState(createTask, initialState)
    return (
        <>
            <h3>Add Input</h3>
            <form action={formAction}>
                <label className="mx-3" htmlFor="task">Name</label>
                <input className="mx-3" type="text" name="task" id="task" />
                <div style={{ marginTop: "10px" }}>
                    <button type="submit">Submit</button>
                </div>
                <p aria-live="polite" role="status">{state?.message}</p>
            </form>
        </>
    )
}