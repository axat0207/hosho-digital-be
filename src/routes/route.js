// routes/applicationRoutes.js
import express from 'express';
import { upload } from '../middleware/multer.js';
import { getAllScholarshipApplications, getTrackingStatus, uploadDocuments } from '../controllers/student.js';
import { approveByFinanceHead, approveByHodAndFeedback, approveByPrincipal } from '../controllers/admin.js';

const router = express.Router();

// Route to handle document uploads
router.post('/student/upload-documents', upload.fields([
  { name: 'aadharCard', maxCount: 1 },
  { name: 'marksheet', maxCount: 1 },
  { name: 'incomeCertificate', maxCount: 1 }
]), uploadDocuments);

router.get('/admin/get-applications',getAllScholarshipApplications)
router.get('/student/tracking-status/:studentId', getTrackingStatus);

router.patch("/scholarship-application/:applicationId/approve/principal", approveByPrincipal);
router.patch("/scholarship-application/:applicationId/approve/finance-head", approveByFinanceHead);
router.patch("/scholarship-application/:applicationId/approve/hod", approveByHodAndFeedback);



export default router;
