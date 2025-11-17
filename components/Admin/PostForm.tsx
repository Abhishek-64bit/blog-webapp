import React, { useState, useEffect } from 'react';
import { BlogPost, Category, Tag } from '../../types';
import Button from '../Button';
import LoadingSpinner from '../LoadingSpinner';
import RichTextEditor from '../RichTextEditor';
import { generateTextContent, generateImageContent } from '../../services/geminiService';
import { MOCK_CATEGORIES, MOCK_TAGS } from '../../constants';

interface PostFormProps {
  initialData?: BlogPost;
  onSubmit: (post: BlogPost) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const PostForm: React.FC<PostFormProps> = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState<BlogPost>(
    initialData || {
      id: '',
      title: '',
      slug: '',
      author: 'Admin User', // Default author for new posts
      date: new Date().toISOString(),
      category: MOCK_CATEGORIES[0]?.name || '',
      tags: [],
      excerpt: '',
      content: '',
      imageUrl: 'https://picsum.photos/1200/600', // Default placeholder image
      featured: false,
      views: 0,
    }
  );
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [isGeneratingExcerpt, setIsGeneratingExcerpt] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageUploadFile, setImageUploadFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (name === 'tags') {
      const selectedTags = Array.from((e.target as HTMLSelectElement).options)
        .filter(option => option.selected)
        .map(option => option.value);
      setFormData((prev) => ({ ...prev, tags: selectedTags }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
    // Auto-generate slug from title
    if (name === 'title') {
        const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '');
        setFormData((prev) => ({ ...prev, slug: slug }));
    }
  };

  const handleRichTextChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageUploadFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateContent = async (type: 'content' | 'excerpt') => {
    if (!formData.title && !formData.category) {
      alert('Please enter a title and category to generate content.');
      return;
    }

    if (type === 'content') setIsGeneratingContent(true);
    if (type === 'excerpt') setIsGeneratingExcerpt(true);

    const prompt = `Write a blog post ${type === 'excerpt' ? 'excerpt (around 50-70 words)' : 'article (around 300 words)'} about "${formData.title}" in the category of "${formData.category}". Focus on engaging the reader and providing valuable information. If it's an excerpt, make it concise and enticing.`;
    const generatedText = await generateTextContent(prompt);

    if (type === 'content') {
      setFormData((prev) => ({ ...prev, content: generatedText }));
      setIsGeneratingContent(false);
    } else {
      setFormData((prev) => ({ ...prev, excerpt: generatedText }));
      setIsGeneratingExcerpt(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!formData.title && !formData.category) {
      alert('Please enter a title and category to generate an image.');
      return;
    }
    setIsGeneratingImage(true);
    const prompt = `A blog post cover image related to "${formData.title}" in the theme of "${formData.category}". Make it visually appealing and relevant.`;
    const generatedImageUrl = await generateImageContent(prompt);
    if (generatedImageUrl) {
      setFormData((prev) => ({ ...prev, imageUrl: generatedImageUrl }));
    } else {
      alert('Failed to generate image. Please try again or use a placeholder.');
    }
    setIsGeneratingImage(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {initialData ? 'Edit Post' : 'Create New Post'}
      </h2>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
          disabled={isLoading || isGeneratingContent || isGeneratingExcerpt || isGeneratingImage}
        />
      </div>

      {/* Slug */}
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Slug (URL friendly)
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
          disabled={isLoading || isGeneratingContent || isGeneratingExcerpt || isGeneratingImage}
        />
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
          disabled={isLoading || isGeneratingContent || isGeneratingExcerpt || isGeneratingImage}
        >
          {MOCK_CATEGORIES.map((cat) => (
            <option key={cat.slug} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Tags (Select multiple)
        </label>
        <select
          id="tags"
          name="tags"
          multiple
          value={formData.tags}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 h-32"
          disabled={isLoading || isGeneratingContent || isGeneratingExcerpt || isGeneratingImage}
        >
          {MOCK_TAGS.map((tag) => (
            <option key={tag.slug} value={tag.name}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>

      {/* Excerpt */}
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
          disabled={isLoading || isGeneratingContent || isGeneratingExcerpt || isGeneratingImage}
        ></textarea>
        <Button
          onClick={() => handleGenerateContent('excerpt')}
          type="button"
          variant="secondary"
          size="sm"
          className="mt-2"
          isLoading={isGeneratingExcerpt}
          disabled={isGeneratingExcerpt || isLoading || !formData.title || !formData.category}
        >
          {isGeneratingExcerpt ? 'Generating...' : 'Generate Excerpt with AI'}
        </Button>
      </div>

      {/* Content (Rich Text Editor) */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Content
          </label>
          <Button
            onClick={() => handleGenerateContent('content')}
            type="button"
            variant="secondary"
            size="sm"
            isLoading={isGeneratingContent}
            disabled={isGeneratingContent || isLoading || !formData.title || !formData.category}
          >
            {isGeneratingContent ? 'Generating...' : 'Generate Content with AI'}
          </Button>
        </div>
        <RichTextEditor
          value={formData.content}
          onChange={handleRichTextChange}
          rows={15}
          className="min-h-[300px]"
          disabled={isLoading || isGeneratingContent || isGeneratingExcerpt || isGeneratingImage}
        />
      </div>

      {/* Image Upload/Preview */}
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Cover Image URL
        </label>
        {formData.imageUrl && (
          <div className="mb-4">
            <img src={formData.imageUrl} alt="Post cover" className="max-w-xs h-auto rounded-md shadow-sm" />
          </div>
        )}
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter image URL or upload below"
          disabled={isLoading || isGeneratingContent || isGeneratingExcerpt || isGeneratingImage}
        />
        <div className="mt-2 flex flex-col md:flex-row items-center gap-2">
            <input
              type="file"
              id="imageFile"
              name="imageFile"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-700 dark:file:text-indigo-400 dark:hover:file:bg-gray-600"
              disabled={isLoading || isGeneratingContent || isGeneratingExcerpt || isGeneratingImage}
            />
            <Button
              onClick={handleGenerateImage}
              type="button"
              variant="secondary"
              size="sm"
              className="flex-shrink-0"
              isLoading={isGeneratingImage}
              disabled={isGeneratingImage || isLoading || !formData.title || !formData.category}
            >
              {isGeneratingImage ? 'Generating...' : 'Generate Image with AI'}
            </Button>
        </div>
      </div>

      {/* Featured Checkbox */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
          disabled={isLoading || isGeneratingContent || isGeneratingExcerpt || isGeneratingImage}
        />
        <label htmlFor="featured" className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Featured Post
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading || isGeneratingContent || isGeneratingExcerpt || isGeneratingImage}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          disabled={isLoading || isGeneratingContent || isGeneratingExcerpt || isGeneratingImage}
        >
          {isLoading ? 'Saving...' : initialData ? 'Update Post' : 'Create Post'}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
