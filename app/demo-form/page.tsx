import User from "@/models/user.model"
import db from "@/utils/connectDB";

const demo = () => {
    const handleSubmit = async (formData: FormData) => {
        "use server"
        try {
            const name = formData.get('name');
            const email = formData.get('email');
            const password= formData.get('pass');
            // db.connectDB();
            await User.create({name, email, password});
            console.log('Form submitted Successfuly');
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <>
            <h3>Demo form component</h3>
            <form action={handleSubmit}>
                <div className="first" style={{ marginTop: "10px" }}>
                    <label htmlFor="name-1">Name</label>
                    <input type="text" name="name" id="name-1" />
                </div>
                <div className="mt-2" style={{ marginTop: "10px" }}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div className="mt-2 password-field" style={{ marginTop: "10px" }}>
                    <label htmlFor="pass">Password</label>
                    <input type="password" name="pass" id="pass" />
                </div>
                <div className="btn" style={{ marginTop: "10px" }}>
                    <button type="submit">Submit Form</button>
                </div>
            </form>
        </>
    )
}

export default demo;