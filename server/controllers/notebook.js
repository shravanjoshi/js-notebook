const Notebook = require('../models/Notebook');

// Get all notebooks for the authenticated user
exports.getNotebooks = async (req, res) => {
    try {
        
        const notebooks = await Notebook.find({ userId: req.user._id },{ _id : 1, title : 1, updatedAt : 1})
        .sort({ updatedAt: -1 })
        // console.log('in getNotebooks');
        res.json(notebooks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get a single notebook by ID
exports.getNotebook = async (req, res) => {
    try {
        const notebook = await Notebook.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!notebook) {
            return res.status(404).json({ message: 'Notebook not found' });
        }

        res.json(notebook);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get or create default notebook for user
exports.getDefaultNotebook = async (req, res) => {
    try {
        let notebook = await Notebook.findOne({
            userId: req.user._id,
            isDefault: true
        });

        if (!notebook) {
            // Create default notebook with starter cells
            notebook = await Notebook.create({
                title: 'My Notebook',
                userId: req.user._id,
                isDefault: true,
                cells: [
                    {
                        code: `<div style="background-color: #11191f; padding: 10px 15px; color: #f8fafc; font-family: Arial, sans-serif;">
      <h2 style="font-size: 1.8rem; color: #facc15; font-weight: bold; text-align: center; margin-bottom: 10px;">
    Welcome to ScriptStation
  </h2>
      <p style="font-size: 1rem; line-height: 1.5;">
        This notebook allows you to write and execute JavaScript code interactively. You can also add documentation alongside your code.
      </p>
      <ul style="margin-top: 10px; padding-left: 20px;">
        <li style="margin: 5px 0;">&#8226; &#160; Create new code or documentation cells.</li>
        <li style="margin: 5px 0;">&#8226; &#160; Run JavaScript code directly within the notebook.</li>
        <li style="margin: 5px 0;">&#8226; &#160; Save and download your work as HTML or JavaScript files.</li>
        <li style="margin: 5px 0;">&#8226; &#160; Style your HTML cells with custom CSS.</li>
      </ul>
      <p style="font-size: 1rem; line-height: 1.5; margin-top: 20px;">
        Double click on the cell to edit the content.
      </p>
    </div>`,
                        mode: 'htmlmixed',
                        show: true
                    },
                    {
                        code: `show("Hello !");
let sum = 0;
for (let i = 1; i <= 10; i++) {
  sum += i;
}
show("Sum of first 10 numbers: " + sum);`,
                        mode: 'javascript'
                    },
                    {
                        code: `function square(n) {
  return n * n;
} 
//Run it once!, to call the function in other cells.`,
                        mode: 'javascript'
                    },
                    {
                        code: `console.log('Hello !');
show("Square of 5: " + square(5));`,
                        mode: 'javascript'
                    }
                ]
            });
        }

        res.json(notebook);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Create a new notebook
exports.createNotebook = async (req, res) => {
    try {
        const { title, cells } = req.body;

        const notebook = await Notebook.create({
            title: title || 'Untitled Notebook',
            cells: cells || [],
            userId: req.user._id
        });

        res.status(201).json(notebook);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update a notebook
exports.updateNotebook = async (req, res) => {
    try {
        const { title, cells } = req.body;

        const notebook = await Notebook.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!notebook) {
            return res.status(404).json({ message: 'Notebook not found' });
        }

        if (title !== undefined) notebook.title = title;
        if (cells !== undefined) notebook.cells = cells;

        await notebook.save();

        res.json(notebook);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a notebook
exports.deleteNotebook = async (req, res) => {
    try {
        const notebook = await Notebook.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!notebook) {
            return res.status(404).json({ message: 'Notebook not found' });
        }

        // Prevent deletion of default notebook
        if (notebook.isDefault) {
            return res.status(400).json({ message: 'Cannot delete default notebook' });
        }

        await notebook.deleteOne();

        res.json({ message: 'Notebook deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
