// routes/applicationRoutes.js
import express from "express";
import { upload } from "../middleware/multer.js";
import {
  getAcceptedApplications,
  getAllScholarshipApplications,
  getPendingApplications,
  getRejectedApplications,
  getTrackingStatus,
  uploadDocuments,
} from "../controllers/student.js";
import {
  approveByFinanceHead,
  approveByHodAndFeedback,
  approveByPrincipal,
  getAdminNotifications,
  getHodFeedback,
  getPrincipalFeedback,
  getUserNotifications,
  postNotification,
} from "../controllers/admin.js";

const router = express.Router();

//! create application
router.post(
  "/student/upload-documents",
  upload.fields([
    { name: "aadharCard", maxCount: 1 },
    { name: "marksheet", maxCount: 1 },
    { name: "incomeCertificate", maxCount: 1 },
  ]),
  uploadDocuments
);

//!Student
router.get("/admin/get-applications", getAllScholarshipApplications);
router.get("/student/tracking-status/:studentId", getTrackingStatus);

//!Approve Application
router.patch(
  "/scholarship-application/:applicationId/approve/principal",
  approveByPrincipal
);
router.patch(
  "/scholarship-application/:applicationId/approve/finance-head",
  approveByFinanceHead
);
router.patch(
  "/scholarship-application/:applicationId/approve/hod",
  approveByHodAndFeedback
);

//!Notifications

router.post("/notifications", postNotification);
router.get("/notifications/admin", getAdminNotifications);
router.get("/notifications/user", getUserNotifications);
router.get("/notifications/principal/:applicationId", getPrincipalFeedback);
router.get("/notifications/hod/:applicationId", getHodFeedback);

//!all application with status
router.get("/scholarships/pending", getPendingApplications);
router.get("/scholarships/accepted", getAcceptedApplications);
router.get("/scholarships/rejected", getRejectedApplications);

export default router;
