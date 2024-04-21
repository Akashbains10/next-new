'use client'
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';


export default function RegisterComponent() {
    return (
        <div>
            <form action="">
                <div style={{ paddingLeft: '50px', paddingRight: '50px' }}>
                    <FormControl fullWidth>
                        <InputLabel variant="filled" htmlFor="name">
                            Name
                        </InputLabel>
                        <OutlinedInput id="name" type="text" onChange={(e) => console.log(e.target.value)} />
                    </FormControl>
                </div>

                <div style={{ paddingLeft: '50px', paddingRight: '50px', marginTop: '12px' }}>
                    <FormControl fullWidth>
                        <InputLabel variant="filled" htmlFor="email">
                            Email
                        </InputLabel>
                        <OutlinedInput id="email" type="email" onChange={(e) => console.log(e.target.value)} />
                    </FormControl>
                </div>

                <div style={{ paddingLeft: '50px', paddingRight: '50px', marginTop: '12px' }}>
                    <FormControl fullWidth>
                        <InputLabel variant="filled" htmlFor="pass">
                            Password
                        </InputLabel>
                        <OutlinedInput id="pass" type="password" onChange={(e) => console.log(e.target.value)} />
                    </FormControl>
                </div>

                <div style={{ paddingLeft: '50px', paddingRight: '50px', marginTop: '12px' }}>
                    <FormControl fullWidth>
                        <InputLabel variant="filled" htmlFor="confirm_pass">
                            Confirm Password
                        </InputLabel>
                        <OutlinedInput id="confirm_pass" type="password" onChange={(e) => console.log(e.target.value)} />
                    </FormControl>
                </div>

                <div style={{ paddingLeft: '50px', paddingRight: '50px', marginTop: '15px' }}>
                    <LoadingButton
                        loading={false}
                        variant="contained"
                        type="submit"
                    >
                        Submit
                    </LoadingButton >
                </div>

            </form>
        </div>
    )
}