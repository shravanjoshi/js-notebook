const mongoose = require('mongoose');

const notebookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: 'Untitled Notebook'
    },
    cells: [{
        code: { type: String, default: '' },
        output: [{ type: String }],
        runCount: { type: Number, default: 0 },
        runTime: { type: Number, default: 0 },
        mode: {
            type: String,
            enum: ['javascript', 'htmlmixed'],
            default: 'javascript'
        },
        show: { type: Boolean, default: false }
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isDefault: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Ensure only one default notebook per user
notebookSchema.index({ userId: 1, isDefault: 1 });

const Notebook = mongoose.model('Notebook', notebookSchema);
module.exports = Notebook;
