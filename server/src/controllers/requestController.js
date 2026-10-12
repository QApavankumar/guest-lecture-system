const prisma = require('../config/db');

// GET /api/requests
const getRequests = async (req, res) => {
  try {
    const { status, district, trade } = req.query;

    const where = {};
    if (status) where.status = status;
    if (district) where.district = district;
    if (trade) where.trade = { contains: trade, mode: 'insensitive' };

    const requests = await prisma.requisition.findMany({
      where,
      orderBy: { submittedAt: 'desc' }
    });

    return res.json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch requisitions', error: error.message });
  }
};

// POST /api/requests
const createRequest = async (req, res) => {
  try {
    const data = req.body;

    if (!data.district || !data.schoolName || !data.trade || !data.vtName || !data.lectureDate) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required requisition fields (district, schoolName, trade, vtName, lectureDate)' 
      });
    }

    // Generate unique formatted ID: GLR-2026-XXX
    const count = await prisma.requisition.count();
    const newId = `GLR-2026-${String(count + 1).padStart(3, '0')}`;

    const newRecord = await prisma.requisition.create({
      data: {
        id: data.id || newId,
        district: data.district,
        mandal: data.mandal || '',
        village: data.village || '',
        schoolName: data.schoolName,
        udiseCode: data.udiseCode || '',
        trade: data.trade,
        tradeCode: data.tradeCode || '',
        vtName: data.vtName,
        vtMobile: data.vtMobile || '',
        lectureDate: data.lectureDate,
        topic: data.topic || '',
        status: 'Pending',
        assignedSpeaker: '',
        notes: data.notes || ''
      }
    });

    return res.status(201).json(newRecord);
  } catch (error) {
    console.error('Error creating request:', error);
    return res.status(500).json({ success: false, message: 'Failed to create requisition', error: error.message });
  }
};

// PATCH /api/requests/:id/status
const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedSpeaker } = req.body;

    const existing = await prisma.requisition.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Requisition not found' });
    }

    const updateData = { status };
    if (assignedSpeaker !== undefined) {
      updateData.assignedSpeaker = assignedSpeaker;
    }

    const updated = await prisma.requisition.update({
      where: { id },
      data: updateData
    });

    return res.json(updated);
  } catch (error) {
    console.error('Error updating status:', error);
    return res.status(500).json({ success: false, message: 'Failed to update requisition status', error: error.message });
  }
};

// PATCH /api/requests/:id/assign
// Includes double-booking prevention check
const assignLecturer = async (req, res) => {
  try {
    const { id } = req.params;
    const { assignedSpeaker, status: newStatus } = req.body;

    if (!assignedSpeaker) {
      return res.status(400).json({ success: false, message: 'Speaker name is required for assignment' });
    }

    const currentReq = await prisma.requisition.findUnique({ where: { id } });
    if (!currentReq) {
      return res.status(404).json({ success: false, message: 'Requisition not found' });
    }

    // 🔒 BUSINESS LOGIC: Double-Booking Conflict Detection
    // Check if this lecturer is already assigned on the same lecture date to another approved/completed requisition
    const conflict = await prisma.requisition.findFirst({
      where: {
        id: { not: id },
        assignedSpeaker: assignedSpeaker.trim(),
        lectureDate: currentReq.lectureDate,
        status: { in: ['Approved', 'Completed'] }
      }
    });

    if (conflict) {
      return res.status(409).json({
        success: false,
        message: `Scheduling Conflict: ${assignedSpeaker} is already assigned to "${conflict.schoolName}" in ${conflict.district} on ${currentReq.lectureDate}. Please select another speaker or date.`
      });
    }

    const updateData = { assignedSpeaker: assignedSpeaker.trim() };
    if (newStatus) {
      updateData.status = newStatus;
    }

    const updated = await prisma.requisition.update({
      where: { id },
      data: updateData
    });

    return res.json(updated);
  } catch (error) {
    console.error('Error assigning lecturer:', error);
    return res.status(500).json({ success: false, message: 'Failed to assign lecturer', error: error.message });
  }
};

module.exports = {
  getRequests,
  createRequest,
  updateRequestStatus,
  assignLecturer
};

