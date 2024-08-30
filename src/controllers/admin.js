// controllers/applicationController.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const approveByPrincipal = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { approve, principalFeedback } = req.body;

    // Update based on the approve boolean
    const application = await prisma.scholarshipApplication.update({
      where: { id: applicationId },
      data: {
        approvedByPrincipal: approve, // Set true or false based on the approve boolean
        principalFeedback: principalFeedback || null, // Add principal feedback
        status: approve ? "pending" : 'rejected', // Set status to 'rejected' if not approved
      },
    });

    const message = approve
      ? "Application approved by Principal"
      : "Application rejected by Principal";
    
    res.status(200).json({ message, application });
  } catch (error) {
    console.error("Error in approveByPrincipal:", error);
    return res.status(500).json({ error: error.message });
  }
};


export const approveByFinanceHead = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { approve, amount } = req.body;

    // Update based on the approve boolean
    const application = await prisma.scholarshipApplication.update({
      where: { id: applicationId },
      data: {
        approvedByFinanceHead: approve, // Set true or false based on the approve boolean
        amountSanction: approve ? amount || null : null, // Set amount if approved
        status: approve ? "accepted" : 'rejected', // Set status to 'rejected' if not approved
      },
    });

    const message = approve
      ? "Application approved by Finance Head"
      : "Application rejected by Finance Head";
    
    res.status(200).json({ message, application });
  } catch (error) {
    console.error("Error in approveByFinanceHead:", error);
    return res.status(500).json({ error: error.message });
  }
};


export const approveByHodAndFeedback = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { approve, feedback } = req.body;

    // Update based on the approve boolean
    const application = await prisma.scholarshipApplication.update({
      where: { id: applicationId },
      data: {
        approvedByHod: approve, // Set true or false based on the approve boolean
        hodFeedback: feedback || null, // Set feedback or null if not provided
        status: approve ? "pending" : 'rejected', // Set status to 'rejected' if not approved
      },
    });

    const message = approve
      ? "Application approved by HOD and feedback updated"
      : "Application rejected by HOD";
    
    res.status(200).json({ message, application });
  } catch (error) {
    console.error("Error in approveByHodAndFeedback:", error);
    return res.status(500).json({ error: error.message });
  }
};


export const postNotification = async (req, res) => {
  try {
    const { userId, title, message, isAdmin } = req.body;

    // Validate required fields
    if (!userId || !message) {
      return res.status(400).json({ error: "userId and message are required" });
    }

    // Create a new notification
    const notification = await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        isAdmin: isAdmin || false,
      },
    });

    res.status(201).json(notification);
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAdminNotifications = async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        isAdmin: true,
      },
    });

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching admin notifications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller for getting user notifications
export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        isAdmin: false,
      },
    });

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching user notifications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
