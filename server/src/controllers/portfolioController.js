import { portfolioData, projectsData } from '../data/portfolioData.js';
import { saveContactMessage } from '../utils/contactStore.js';

export const getPortfolio = (req, res) => {
  res.json({ success: true, data: portfolioData });
};

export const getProjects = (req, res) => {
  res.json({ success: true, data: projectsData });
};

export const submitContact = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email and message are required.'
    });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.'
    });
  }

  const saved = await saveContactMessage({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    message: message.trim()
  });

  res.status(201).json({
    success: true,
    message: 'Message received successfully.',
    data: saved
  });
};
