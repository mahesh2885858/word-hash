import React from "react"
import { nanoid } from "nanoid";
const convertImagesToArrayBuffer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageData: {
        imageurl: string | ArrayBuffer | null | undefined;
        id: string;
    }[] = [];
    Array.from(e.target.files!).map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.addEventListener("load", (e) => {
            const imgobject = {
                imageurl: e.target?.result,
                id: nanoid(),
            };

            imageData.push(imgobject);
        });
        return "done"
    });
    return imageData

}
export default convertImagesToArrayBuffer