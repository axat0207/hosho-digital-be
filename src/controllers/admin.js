// controllers/applicationController.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const approveByPrincipal = async (req, res) => {
  try {
    const { applicationId } = req.params;

    // Update the scholarship application to set approvedByPrincipal to true
    const application = await prisma.scholarshipApplication.update({
      where: { id: applicationId },
      data: { approvedByPrincipal: true },
    });

    res
      .status(200)
      .json({ message: "Application approved by Principal", application });
  } catch (error) {
    console.error("Error in approveByPrincipal:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const approveByFinanceHead = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { amount } = req.body;

    // Update the scholarship application to set approvedByFinanceHead to true
    const application = await prisma.scholarshipApplication.update({
      where: { id: applicationId },
      data: { approvedByFinanceHead: true, amountSanction: amount || null },
    });

    res
      .status(200)
      .json({ message: "Application approved by Finance Head", application });
  } catch (error) {
    console.error("Error in approveByFinanceHead:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const approveByHodAndFeedback = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { feedback } = req.body;

    // Update the scholarship application to set approvedByHod to true and add feedback
    const application = await prisma.scholarshipApplication.update({
      where: { id: applicationId },
      data: {
        approvedByHod: true,
        feedback: feedback || null, // Set feedback or null if not provided
      },
    });

    res
      .status(200)
      .json({
        message: "Application approved by HOD and feedback updated",
        application,
      });
  } catch (error) {
    console.error("Error in approveByHodAndFeedback:", error);
    return res.status(500).json({ error: error.message });
  }
};
