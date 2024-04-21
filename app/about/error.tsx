"use client"

export default function ErrorBouandry({
    error
}: {
    error: Error
}) {
    return <h5>"Error reason is" {error.message}</h5>
}


// This page is to handle the error given in server side content error