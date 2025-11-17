import { BlogPost, Comment, User, UserRole, Category, Tag } from './types';

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of AI in Web Development',
    slug: 'future-ai-web-dev',
    author: 'Alice Wonderland',
    date: '2023-10-26T10:00:00Z',
    category: 'Technology',
    tags: ['AI', 'Web Development', 'Future'],
    excerpt: 'Artificial Intelligence is rapidly changing the landscape of web development, offering tools that automate tasks, enhance user experiences, and even generate code. This post explores the exciting possibilities and potential challenges.',
    content: `
      <p>Artificial Intelligence (AI) is no longer a futuristic concept but a tangible force actively shaping various industries, including web development. From intelligent code completion to automated testing and deployment, AI-powered tools are revolutionizing how developers build and maintain websites.</p>
      
      <h3>Automated Code Generation and Optimization</h3>
      <p>One of the most significant impacts of AI in web development is the rise of tools that can generate code snippets or even entire components based on natural language descriptions or design mockups. This not only speeds up development but also reduces human error. Furthermore, AI algorithms can analyze existing codebases to identify inefficiencies and suggest optimizations, leading to more performant and scalable applications.</p>
      
      <h3>Enhanced User Experience with Personalization</h3>
      <p>AI is pivotal in creating highly personalized user experiences. Machine learning models can analyze user behavior, preferences, and demographics to dynamically adjust content, recommendations, and even the UI layout. This level of personalization leads to increased engagement and satisfaction, making websites feel more intuitive and tailored to individual needs.</p>
      
      <h3>Challenges and Ethical Considerations</h3>
      <p>While the benefits are numerous, the integration of AI also presents challenges. Ensuring data privacy, preventing algorithmic bias, and addressing job displacement concerns are critical. Developers and organizations must adopt ethical AI practices and establish clear guidelines for its use to harness its power responsibly.</p>
      
      <p>In conclusion, the future of AI in web development is bright, promising more efficient workflows, innovative user experiences, and sophisticated applications. Embracing these advancements while navigating their complexities will define the next era of web development.</p>
    `,
    imageUrl: 'https://picsum.photos/1200/600?random=1',
    featured: true,
    views: 1250,
  },
  {
    id: '2',
    title: 'Mastering React Hooks: A Comprehensive Guide',
    slug: 'mastering-react-hooks',
    author: 'Bob The Builder',
    date: '2023-10-20T14:30:00Z',
    category: 'Programming',
    tags: ['React', 'Hooks', 'JavaScript'],
    excerpt: 'React Hooks have transformed the way we write functional components, making state management and side effects much cleaner. This guide dives deep into common hooks and best practices.',
    content: `
      <p>React Hooks, introduced in React 16.8, have fundamentally changed how we approach state management and side effects in functional components. They allow you to use state and other React features without writing a class.</p>
      
      <h3>useState: Managing Component State</h3>
      <p>The <code>useState</code> hook is the most basic and essential hook for adding state to functional components. It returns a stateful value and a function to update it. This simplicity encourages developers to break down complex state into smaller, more manageable pieces.</p>
      
      <h3>useEffect: Handling Side Effects</h3>
      <p><code>useEffect</code> is a powerful hook for managing side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM. It runs after every render, but you can control when it re-runs by providing a dependency array. Understanding the dependency array is crucial for preventing unnecessary re-renders and potential infinite loops.</p>
      
      <h3>useContext: Simplified Context API</h3>
      <p>The <code>useContext</code> hook makes it easier to consume values from the React Context API in functional components. It eliminates the need for render props or higher-order components, leading to cleaner and more readable code for accessing global state.</p>
      
      <h3>Custom Hooks: Reusability at its Best</h3>
      <p>One of the most powerful features of React Hooks is the ability to create custom hooks. Custom hooks are JavaScript functions that call other hooks and encapsulate reusable stateful logic. This promotes code reuse and helps in abstracting complex component logic into separate, testable units.</p>
      
      <p>By mastering these hooks and adhering to best practices, developers can write more efficient, readable, and maintainable React applications.</p>
    `,
    imageUrl: 'https://picsum.photos/1200/600?random=2',
    featured: false,
    views: 980,
  },
  {
    id: '3',
    title: 'A Beginner\'s Guide to Tailwind CSS',
    slug: 'tailwind-css-guide',
    author: 'Charlie Chaplin',
    date: '2023-10-15T09:15:00Z',
    category: 'Web Design',
    tags: ['CSS', 'Tailwind', 'Frontend'],
    excerpt: 'Tailwind CSS is a utility-first CSS framework that allows you to build custom designs directly in your markup. This guide helps beginners get started.',
    content: `
      <p>Tailwind CSS is a utility-first CSS framework that streamlines the process of building custom designs. Instead of predefined components, Tailwind provides low-level utility classes that you can combine directly in your HTML to style elements.</p>
      
      <h3>The Utility-First Approach</h3>
      <p>The core philosophy behind Tailwind is its utility-first approach. This means you don't write custom CSS rules for every component. Instead, you apply pre-defined utility classes like <code>flex</code>, <code>pt-4</code>, <code>text-center</code>, and <code>text-blue-500</code> directly to your HTML elements. This approach keeps your CSS file size small and makes styling highly modular.</p>
      
      <h3>Rapid Prototyping and Consistency</h3>
      <p>Tailwind significantly speeds up the prototyping process. You can quickly iterate on designs without constantly switching between HTML and CSS files. Because you're using a consistent set of utility classes, it also helps maintain visual consistency across your application, even with a large team.</p>
      
      <h3>Customization and Extensibility</h3>
      <p>While Tailwind provides a rich set of default utilities, it's highly customizable. You can extend or override almost any aspect of its configuration, including colors, spacing, typography, and breakpoints. This flexibility allows you to tailor the framework to match your project's specific design system.</p>
      
      <h3>Integration with React and Other Frameworks</h3>
      <p>Tailwind integrates seamlessly with modern JavaScript frameworks like React, Vue, and Angular. Its utility classes can be directly applied to JSX or template syntax, making it a popular choice for developers looking for a fast and efficient way to style their applications.</p>
      
      <p>For beginners, the initial learning curve might seem steep due to the sheer number of utility classes, but once mastered, Tailwind CSS becomes an incredibly powerful tool for frontend development.</p>
    `,
    imageUrl: 'https://picsum.photos/1200/600?random=3',
    featured: true,
    views: 800,
  },
  {
    id: '4',
    title: 'Exploring the Wonders of Quantum Computing',
    slug: 'quantum-computing-wonders',
    author: 'Dr. Strange',
    date: '2023-09-30T11:00:00Z',
    category: 'Science',
    tags: ['Physics', 'Quantum', 'Technology'],
    excerpt: 'Quantum computing promises to solve problems intractable for classical computers. Delve into the fascinating world of qubits, superposition, and entanglement.',
    content: `
      <p>Quantum computing represents a paradigm shift in computation, leveraging the principles of quantum mechanics to process information in fundamentally new ways. Unlike classical computers that store information as bits (0s or 1s), quantum computers use qubits, which can exist in multiple states simultaneously.</p>
      
      <h3>Qubits, Superposition, and Entanglement</h3>
      <p>The power of quantum computing stems from phenomena like superposition and entanglement. Superposition allows a qubit to be a combination of 0 and 1 at the same time, significantly expanding the information density. Entanglement occurs when two or more qubits become linked, such that the state of one instantly influences the state of others, regardless of distance. These properties enable quantum computers to perform complex calculations much faster than classical machines.</p>
      
      <h3>Potential Applications</h3>
      <p>The potential applications of quantum computing are vast and revolutionary. It could transform drug discovery by simulating molecular interactions with unprecedented accuracy, accelerate the development of new materials, break modern encryption algorithms, and optimize complex logistical problems across various industries.</p>
      
      <h3>Challenges on the Road Ahead</h3>
      <p>Despite its promise, quantum computing faces significant challenges. Building and maintaining stable qubits requires extreme precision and control, often operating at ultra-low temperatures. Error correction is another major hurdle, as quantum systems are highly susceptible to noise. Researchers worldwide are actively working to overcome these obstacles and bring practical quantum computers to fruition.</p>
      
      <p>The journey into quantum computing is just beginning, but its implications for science, technology, and society are profound. It holds the key to unlocking solutions to some of humanity's most complex problems.</p>
    `,
    imageUrl: 'https://picsum.photos/1200/600?random=4',
    featured: false,
    views: 650,
  },
  {
    id: '5',
    title: 'Healthy Eating Habits for a Productive Lifestyle',
    slug: 'healthy-eating-habits',
    author: 'Chef Gordon',
    date: '2023-09-25T08:00:00Z',
    category: 'Health',
    tags: ['Nutrition', 'Wellness', 'Lifestyle'],
    excerpt: 'Fuel your body and mind with smart food choices. Discover practical tips for maintaining healthy eating habits and boosting your productivity.',
    content: `
      <p>Maintaining healthy eating habits is crucial not only for physical well-being but also for cognitive function and overall productivity. What you eat directly impacts your energy levels, mood, and ability to focus.</p>
      
      <h3>Balanced Meals for Sustained Energy</h3>
      <p>Focus on balanced meals that include a good mix of macronutrients: complex carbohydrates, lean proteins, and healthy fats. Complex carbs like whole grains provide sustained energy, while proteins support muscle repair and satiety. Healthy fats, found in avocados and nuts, are essential for brain health.</p>
      
      <h3>Hydration is Key</h3>
      <p>Often overlooked, adequate hydration is fundamental. Dehydration can lead to fatigue, reduced concentration, and headaches. Aim to drink plenty of water throughout the day, and consider herbal teas or infused water for variety.</p>
      
      <h3>Mindful Eating Practices</h3>
      <p>Practice mindful eating by paying attention to your body's hunger and fullness cues. Eat slowly, savor your food, and avoid distractions like screens. This not only enhances enjoyment but also helps prevent overeating and promotes better digestion.</p>
      
      <h3>Meal Planning and Preparation</h3>
      <p>Planning your meals in advance and preparing healthy snacks can significantly improve your adherence to healthy eating. This reduces the likelihood of making impulsive, unhealthy food choices when hunger strikes and saves time during busy weekdays.</p>
      
      <p>By adopting these habits, you can fuel your body and mind effectively, leading to a more productive and fulfilling lifestyle.</p>
    `,
    imageUrl: 'https://picsum.photos/1200/600?random=5',
    featured: true,
    views: 700,
  },
  {
    id: '6',
    title: 'The Art of Photography: Capturing Moments',
    slug: 'art-of-photography',
    author: 'Ansel Adams Jr.',
    date: '2023-09-20T16:45:00Z',
    category: 'Art & Culture',
    tags: ['Photography', 'Art', 'Creative'],
    excerpt: 'Photography is more than just taking pictures; it\'s about telling stories and preserving memories. Learn fundamental techniques and creative approaches.',
    content: `
      <p>Photography is a powerful medium for artistic expression, allowing individuals to capture fleeting moments and transform them into lasting memories. It's an art form that blends technical skill with creative vision, enabling photographers to tell stories, evoke emotions, and share unique perspectives.</p>
      
      <h3>Understanding Light and Composition</h3>
      <p>Two fundamental elements in photography are light and composition. Mastering natural and artificial light sources is crucial for creating impactful images. Composition, the arrangement of visual elements within the frame, guides the viewer's eye and adds depth and balance to a photograph. Techniques like the rule of thirds, leading lines, and framing are essential tools in a photographer's arsenal.</p>
      
      <h3>Technical Skills and Gear</h3>
      <p>While creativity is paramount, technical knowledge of your camera and its settings (aperture, shutter speed, ISO) is equally important. Understanding how these settings interact allows you to control exposure, depth of field, and motion blur. However, remember that the best camera is the one you have with you; stunning photographs can be captured with simple equipment if the vision is strong.</p>
      
      <h3>Developing Your Unique Style</h3>
      <p>Every great photographer has a unique style that distinguishes their work. This develops over time through continuous practice, experimentation, and reflection. Explore different genres, study the work of other artists, and don't be afraid to break conventional rules to find your voice.</p>
      
      <p>Ultimately, the art of photography lies in seeing the world differently and translating that vision into compelling images that resonate with others. It's a journey of continuous learning and creative exploration.</p>
    `,
    imageUrl: 'https://picsum.photos/1200/600?random=6',
    featured: false,
    views: 400,
  },
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 'c1',
    postId: '1',
    author: 'John Doe',
    date: '2023-10-26T11:30:00Z',
    content: 'Great insights on AI! Looking forward to seeing more development in this area.',
    approved: true,
  },
  {
    id: 'c2',
    postId: '1',
    author: 'Jane Smith',
    date: '2023-10-26T12:00:00Z',
    content: 'Do you think AI will eventually replace web developers entirely?',
    approved: true,
  },
  {
    id: 'c3',
    postId: '2',
    author: 'Peter Jones',
    date: '2023-10-21T09:00:00Z',
    content: 'This guide was incredibly helpful, especially the useEffect section!',
    approved: true,
  },
  {
    id: 'c4',
    postId: '3',
    author: 'Sarah Lee',
    date: '2023-10-16T10:00:00Z',
    content: 'Tailwind has changed my workflow for the better. Highly recommend!',
    approved: false, // For moderation example
  },
  {
    id: 'c5',
    postId: '3',
    author: 'Mark Johnson',
    date: '2023-10-16T11:00:00Z',
    content: 'I find Tailwind a bit too verbose in the HTML. Any tips for managing that?',
    approved: true,
  },
];

export const MOCK_USERS: User[] = [
  { id: 'u1', username: 'admin', email: 'admin@example.com', role: UserRole.ADMIN },
  { id: 'u2', username: 'editor', email: 'editor@example.com', role: UserRole.EDITOR },
  { id: 'u3', username: 'reader', email: 'reader@example.com', role: UserRole.READER },
];

export const MOCK_CATEGORIES: Category[] = [
  { name: 'Technology', slug: 'technology' },
  { name: 'Programming', slug: 'programming' },
  { name: 'Web Design', slug: 'web-design' },
  { name: 'Science', slug: 'science' },
  { name: 'Health', slug: 'health' },
  { name: 'Art & Culture', slug: 'art-culture' },
];

export const MOCK_TAGS: Tag[] = [
  { name: 'AI', slug: 'ai' },
  { name: 'Web Development', slug: 'web-development' },
  { name: 'Future', slug: 'future' },
  { name: 'React', slug: 'react' },
  { name: 'Hooks', slug: 'hooks' },
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'CSS', slug: 'css' },
  { name: 'Tailwind', slug: 'tailwind' },
  { name: 'Frontend', slug: 'frontend' },
  { name: 'Physics', slug: 'physics' },
  { name: 'Quantum', slug: 'quantum' },
  { name: 'Nutrition', slug: 'nutrition' },
  { name: 'Wellness', slug: 'wellness' },
  { name: 'Lifestyle', slug: 'lifestyle' },
  { name: 'Photography', slug: 'photography' },
  { name: 'Art', slug: 'art' },
  { name: 'Creative', slug: 'creative' },
];

export const FEATURED_POST_IDS = ['1', '3', '5'];

export const ADMIN_NAV_ITEMS = [
  { name: 'Dashboard', path: '/admin/dashboard' },
  { name: 'Posts', path: '/admin/posts' },
  { name: 'Comments', path: '/admin/comments' },
  { name: 'Users', path: '/admin/users' },
  { name: 'Media', path: '/admin/media' },
];
