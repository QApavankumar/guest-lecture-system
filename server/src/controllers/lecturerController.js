const prisma = require('../config/db');

// GET /api/lecturers
const getLecturers = async (req, res) => {
  try {
    const { trade } = req.query;

    const where = {};
    if (trade) {
      where.OR = [
        { trade: { contains: trade, mode: 'insensitive' } },
        { tradeKeywords: { contains: trade, mode: 'insensitive' } }
      ];
    }

    const lecturers = await prisma.guestLecturer.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    // Format tradeKeywords from comma-separated string to array for frontend compatibility
    const formatted = lecturers.map(l => ({
      ...l,
      tradeKeywords: l.tradeKeywords ? l.tradeKeywords.split(',').map(s => s.trim()) : []
    }));

    return res.json(formatted);
  } catch (error) {
    console.error('Error fetching lecturers:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch guest lecturers', error: error.message });
  }
};

// POST /api/lecturers
const addLecturer = async (req, res) => {
  try {
    const data = req.body;

    if (!data.name || !data.organization || !data.designation || !data.phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, organization, designation, and phone number are required' 
      });
    }

    const keywords = Array.isArray(data.tradeKeywords)
      ? data.tradeKeywords.join(',')
      : (data.tradeKeywords || data.trade || '');

    const newLecturer = await prisma.guestLecturer.create({
      data: {
        id: `spk-${Date.now()}`,
        name: data.name.trim(),
        organization: data.organization.trim(),
        designation: data.designation.trim(),
        phone: data.phone.trim(),
        email: data.email ? data.email.trim() : null,
        qualification: data.qualification ? data.qualification.trim() : null,
        location: data.location ? data.location.trim() : null,
        trade: data.trade || 'General',
        tradeKeywords: keywords,
        isVerified: true,
        addedBy: data.addedBy || 'Admin'
      }
    });

    return res.status(201).json({
      ...newLecturer,
      tradeKeywords: newLecturer.tradeKeywords ? newLecturer.tradeKeywords.split(',').map(s => s.trim()) : []
    });
  } catch (error) {
    console.error('Error adding lecturer:', error);
    return res.status(500).json({ success: false, message: 'Failed to add guest lecturer', error: error.message });
  }
};

module.exports = {
  getLecturers,
  addLecturer
};

