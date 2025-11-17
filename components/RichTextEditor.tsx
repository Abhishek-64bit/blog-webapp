import React from 'react';
import ReactMarkdown from 'react-markdown';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  disabled?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write your content here...',
  rows = 10,
  className,
  disabled = false,
}) => {
  return (
    <div className={`border border-gray-300 dark:border-gray-600 rounded-md ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Editor Area */}
        <div className="p-2">
          <label htmlFor="rte-editor" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Editor (Markdown Supported)
          </label>
          <textarea
            id="rte-editor"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 min-h-[200px]"
            rows={rows}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          ></textarea>
        </div>

        {/* Preview Area */}
        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md md:overflow-y-auto max-h-[400px]">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Preview
          </label>
          <div className="prose dark:prose-invert max-w-none p-2 border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            <ReactMarkdown>{value || 'Start typing to see preview...'}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
