import React from 'react';

const NotebookSelector = ({ notebooks, onSelect, onClose }) => {
    // console.log('in selector ', notebooks);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backdropFilter: 'blur(4px)', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
            <div className="bg-[#1b2832] rounded-lg shadow-xl max-w-md w-full mx-4 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-[#bbc6ce] hover:text-[#fede02] transition-colors text-2xl leading-none"
                    aria-label="Close"
                >
                    ×
                </button>
                <div className="p-6">
                    <h2 className="text-xl font-bold text-[#fede02] mb-4 pr-8">Select a Notebook</h2>


                    <div className="max-h-96 overflow-y-auto">
                        {notebooks.map((notebook) => (
                            <div
                                key={notebook._id}
                                onClick={() => onSelect(notebook)}
                                className="p-3 mb-2 bg-[#11191f] hover:bg-[#1b2832] border border-[#bbc6ce]/25 rounded cursor-pointer transition-colors group"
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex-1">
                                        <h3 className="text-[#bbc6ce] group-hover:text-[#fede02] font-medium">
                                            {notebook.title}
                                        </h3>
                                        <p className="text-[#bbc6ce]/60 text-xs mt-1">
                                            Updated {new Date(notebook.updatedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    {notebook.isDefault && (
                                        <span className="ml-2 px-2 py-1 bg-[#fede02]/20 text-[#fede02] text-xs rounded">
                                            Default
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotebookSelector;
