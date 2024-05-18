import path from "path";
import { mkdir, writeFile } from "fs/promises";

export const uploadFile = async (file: File) => {
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = Date.now() + file.name.replaceAll(" ", "_")
    const pathName = path.join(process.cwd(), 'public/uploads/' + fileName)
    const dir = path.dirname(pathName)
    try {
        await mkdir(dir, { recursive: true })
        await writeFile(pathName, buffer)
        return `/uploads/${fileName}`
    } catch (error) {
        console.log('Error in upload file', error)
    }
}   