import { Card, CardContent } from "@mui/material";
import RegisterComponent from "./_newregister";

export default function Register() {
    return (
        <>
            <div style={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                <Card elevation={5} sx={{ width: 600, marginTop: 20 }}>
                    <CardContent>
                        <h3 style={{ paddingLeft: '50px', paddingRight: '50px' }}>Register account</h3>
                        <RegisterComponent />
                    </CardContent>
                </Card>
            </div>
        </>
    )
}