import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "da17aac55", 
  api_key: process.env.CLOUDINARY_API_KEY || "115973371641276", 
  api_secret: process.env.CLOUDINARY_API_SECRET || "zcNRIzpdq2uFL3yCKSdN-JT86zQ"
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        console.log(localFilePath, "from cldnry")
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        console.log({cloudinaryerr : error})
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



export default uploadOnCloudinary;