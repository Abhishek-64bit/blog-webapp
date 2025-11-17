import React, { useState } from 'react';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import { generateImageContent } from '../../services/geminiService'; // Import the service

interface MediaAsset {
  id: string;
  url: string;
  name: string;
  uploadDate: string;
}

const AdminMediaPage: React.FC = () => {
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);
    const file = e.target.files[0];

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const reader = new FileReader();
    reader.onloadend = () => {
      const newAsset: MediaAsset = {
        id: Date.now().toString(),
        url: reader.result as string,
        name: file.name,
        uploadDate: new Date().toISOString(),
      };
      setMediaAssets((prev) => [newAsset, ...prev]);
      setUploading(false);
      e.target.value = ''; // Clear file input
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) {
      alert('Please enter a prompt to generate an image.');
      return;
    }
    setGenerating(true);
    const generatedImageUrl = await generateImageContent(imagePrompt); // Call Gemini Image API
    if (generatedImageUrl) {
      const newAsset: MediaAsset = {
        id: Date.now().toString(),
        url: generatedImageUrl,
        name: `Generated Image: ${imagePrompt.substring(0, 30)}...`,
        uploadDate: new Date().toISOString(),
      };
      setMediaAssets((prev) => [newAsset, ...prev]);
      setImagePrompt('');
    } else {
      alert('Failed to generate image. Please try again.');
    }
    setGenerating(false);
  };

  const handleDeleteAsset = (id: string) => {
    if (window.confirm('Are you sure you want to delete this media asset?')) {
      setMediaAssets((prev) => prev.filter((asset) => asset.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">Media Library</h1>

      {/* Upload Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Upload New Media</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading || generating}
          className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-700 dark:file:text-indigo-400 dark:hover:file:bg-gray-600"
        />
        {uploading && <LoadingSpinner />}
      </div>

      {/* Generate Image Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Generate Image with AI</h2>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            value={imagePrompt}
            onChange={(e) => setImagePrompt(e.target.value)}
            placeholder="Describe the image you want to generate (e.g., 'A cat wearing a wizard hat')"
            className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            disabled={generating || uploading}
          />
          <Button
            onClick={handleGenerateImage}
            disabled={generating || uploading || !imagePrompt.trim()}
            isLoading={generating}
          >
            {generating ? 'Generating...' : 'Generate Image'}
          </Button>
        </div>
      </div>

      {/* Media Gallery */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Media</h2>
        {mediaAssets.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300 text-lg text-center">No media assets uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mediaAssets.map((asset) => (
              <div key={asset.id} className="relative group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                <img
                  src={asset.url}
                  alt={asset.name}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
                  <p className="text-white text-sm text-center font-medium mb-2 line-clamp-2">{asset.name}</p>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteAsset(asset.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMediaPage;
