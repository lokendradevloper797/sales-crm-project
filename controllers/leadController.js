// controllers/leadController.js
const Lead = require('../models/Lead');
const asyncHandler = require('express-async-handler');

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private
const getLeads = asyncHandler(async (req, res) => {
  const leads = await Lead.find({ assignedTo: req.user._id });
  res.json(leads);
});

// @desc    Create a new lead
// @route   POST /api/leads
// @access  Private
const createLead = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, company, status, notes } = req.body;

  const leadExists = await Lead.findOne({ email });

  if (leadExists) {
    res.status(400);
    throw new Error('Lead already exists');
  }

  const lead = await Lead.create({
    firstName,
    lastName,
    email,
    phone,
    company,
    status,
    notes,
    assignedTo: req.user._id,
  });

  res.status(201).json(lead);
});

// @desc    Get lead by ID
// @route   GET /api/leads/:id
// @access  Private
const getLeadById = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (lead) {
    // Optional: Check if the lead is assigned to the requesting user
    if (lead.assignedTo.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to view this lead');
    }
    res.json(lead);
  } else {
    res.status(404);
    throw new Error('Lead not found');
  }
});

// @desc    Update lead
// @route   PUT /api/leads/:id
// @access  Private
const updateLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (lead) {
    // Optional: Check if the lead is assigned to the requesting user
    if (lead.assignedTo.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this lead');
    }

    const { firstName, lastName, email, phone, company, status, notes } = req.body;

    lead.firstName = firstName || lead.firstName;
    lead.lastName = lastName || lead.lastName;
    lead.email = email || lead.email;
    lead.phone = phone || lead.phone;
    lead.company = company || lead.company;
    lead.status = status || lead.status;
    lead.notes = notes || lead.notes;

    const updatedLead = await lead.save();
    res.json(updatedLead);
  } else {
    res.status(404);
    throw new Error('Lead not found');
  }
});

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private
const deleteLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (lead) {
    // Optional: Check if the lead is assigned to the requesting user
    if (lead.assignedTo.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to delete this lead');
    }

    await lead.remove();
    res.json({ message: 'Lead removed' });
  } else {
    res.status(404);
    throw new Error('Lead not found');
  }
});

module.exports = { getLeads, createLead, getLeadById, updateLead, deleteLead };
