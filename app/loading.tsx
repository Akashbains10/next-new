import { Spinner } from "@nextui-org/react";

export default function Loading() {
    return (
        <div className="mt-12 flex justify-center items-center">
            <Spinner color="primary" labelColor="primary" size="lg" />
        </div>
    )
}