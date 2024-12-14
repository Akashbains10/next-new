'use client'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Brands() {
    const router = useRouter();
    return (
        <>
            <h2 className="font-semibold">Brands</h2>
            <div className="mt-5 grid grid-cols-1 justify-items-end w-100">
                <div className="grid grid-cols-2 gap-2">
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="search-brands">Search</InputLabel>
                        <OutlinedInput
                            id="search-brands"
                            type="text"
                            label="Search"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => console.log(e.target.value)}
                            startAdornment={
                                <InputAdornment position="start">
                                    <i className="fas fa-search"></i>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Button
                        variant="contained"
                        onClick={() => router.push('/admin/add-brands')}
                    >
                        Add Brand
                    </Button>
                </div>

            </div>
        </>
    )
}