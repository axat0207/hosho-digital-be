// controllers/applicationController.js
import uploadOnCloudinary from "../utils/cloudinary.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const uploadDocuments = async (req, res) => {
  try {
    const { studentId, name, rollNo, branch } = req.body;
    // const studentId = 1203;
    let aadharLocalPath;
    let marksheetLocalPath;
    let incomeCertificateLocalPath;

    // Check and assign local file paths for each document
    if (
      req.files &&
      Array.isArray(req.files.aadharCard) &&
      req.files.aadharCard.length > 0
    ) {
      aadharLocalPath = req.files.aadharCard[0].path;
    }
    if (
      req.files &&
      Array.isArray(req.files.marksheet) &&
      req.files.marksheet.length > 0
    ) {
      marksheetLocalPath = req.files.marksheet[0].path;
    }
    if (
      req.files &&
      Array.isArray(req.files.incomeCertificate) &&
      req.files.incomeCertificate.length > 0
    ) {
      incomeCertificateLocalPath = req.files.incomeCertificate[0].path;
    }
    console.log({ aadharLocalPath });
    console.log({ marksheetLocalPath });
    console.log({ incomeCertificateLocalPath });
    // Upload documents to Cloudinary if paths exist
    const aadharCard = aadharLocalPath
      ? await uploadOnCloudinary(aadharLocalPath)
      : null;
    const marksheet = marksheetLocalPath
      ? await uploadOnCloudinary(marksheetLocalPath)
      : null;
    const incomeCertificate = incomeCertificateLocalPath
      ? await uploadOnCloudinary(incomeCertificateLocalPath)
      : null;
    console.log({ aadharCard });
    console.log({ marksheet });
    console.log({ incomeCertificate });
    // Check if a scholarship application for the studentId already exists
    // const existingApplication = await prisma.scholarshipApplication.findUnique({
    //   where: { studentId },
    // });

    // let application;
    // if (existingApplication) {
    //   // Update the existing application
    //   application = await prisma.scholarshipApplication.update({
    //     where: { id: existingApplication.id },
    //     data: {
    //       name,
    //       rollNo,
    //       branch,
    //       aadharCard: aadharCard ? aadharCard.secure_url : null,
    //       marksheet: marksheet ? marksheet.secure_url : null,
    //       incomeCertificate: incomeCertificate
    //         ? incomeCertificate.secure_url
    //         : null,
    //     },
    //   });
    // } else {
      // Create a new application
      const application = await prisma.scholarshipApplication.create({
        data: {
          studentId,
          name,
          rollNo,
          branch,
          aadharCard: aadharCard ? aadharCard.secure_url : null,
          marksheet: marksheet ? marksheet.secure_url : null,
          incomeCertificate: incomeCertificate
            ? incomeCertificate.secure_url
            : null,
        },
      });
    

    res
      .status(200)
      .json({ message: "Documents uploaded successfully", application });
  } catch (error) {
    console.error("Error in uploadDocuments:", error);
    return res.status(500).json({ error: error.message });
  }
};


export const getAllScholarshipApplications = async (req, res) => {
    try {
      // Fetch all scholarship applications
      const applications = await prisma.scholarshipApplication.findMany({
        
      });
  
      // Return the applications in response
      res.status(200).json(applications);
    } catch (error) {
      console.error("Error in getAllScholarshipApplications:", error);
      return res.status(500).json({ error: error.message });
    }
  };


  export const getTrackingStatus = async (req, res) => {
    try {
      const { studentId } = req.params;
  
      // Fetch the scholarship application by studentId
      const application = await prisma.scholarshipApplication.findFirst({
        where: { studentId:  studentId  }, // Use clerkId if studentId is not unique
        select: {
          approvedByHod: true,
          approvedByPrincipal: true,
          approvedByFinanceHead: true,
          amountSanction: true,
        },
      });
  
      // If application not found, return an error
      if (!application) {
        return res.status(404).json({ error: "Application not found for the given student ID" });
      }
  
      // Return the tracking status in response
      res.status(200).json({ trackingStatus: application });
    } catch (error) {
      console.error("Error in getTrackingStatus:", error);
      return res.status(500).json({ error: error.message });
    }
  };