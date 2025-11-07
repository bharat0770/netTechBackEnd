const Link = require('./model');

// ✅ CREATE a new link
exports.createLink = async (req, res) => {
  try {
    const { examName, examCenter, examUrl } = req.body;
    console.log("i got these as data", examUrl, examCenter, examName); 
    if (!examName || !examCenter || !examUrl) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newLink = await Link.create({ examName, examCenter, examUrl });
    res.status(201).json({ message: 'Link created successfully', link: newLink });
  } catch (error) {
    console.error('Error creating link:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ READ all links
exports.getAllLinks = async (req, res) => {
  try {
    const links = await Link.find().sort({ createdAt: -1 });
    res.status(200).json(links);
  } catch (error) {
    console.error('Error fetching links:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ READ a single link by ID
exports.getLinkById = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }
    res.status(200).json(link);
  } catch (error) {
    console.error('Error fetching link:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ UPDATE a link
exports.updateLink = async (req, res) => {
  try {
    const { examName, examCenter, examUrl } = req.body;

    const updatedLink = await Link.findByIdAndUpdate(
      req.params.id,
      { examName, examCenter, examUrl },
      { new: true, runValidators: true }
    );

    if (!updatedLink) {
      return res.status(404).json({ message: 'Link not found' });
    }

    res.status(200).json({ message: 'Link updated successfully', link: updatedLink });
  } catch (error) {
    console.error('Error updating link:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ DELETE a link
exports.deleteLink = async (req, res) => {
  try {
    const deletedLink = await Link.findByIdAndDelete(req.params.id);
    if (!deletedLink) {
      return res.status(404).json({ message: 'Link not found' });
    }
    res.status(200).json({ message: 'Link deleted successfully' });
  } catch (error) {
    console.error('Error deleting link:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};