# Simple Blog

A clean, responsive blog built with HTML, CSS, and JavaScript. No frameworks, no databases - just pure web technologies with local storage for persistence.

## Features

- 📝 **Markdown Support**: Write posts in Markdown format
- 🎨 **Responsive Design**: Built with CSS viewport units for true responsiveness
- 💬 **Comments System**: Readers can leave comments on posts
- ❤️ **Like System**: Users can like posts
- 🔗 **Unique URLs**: Each post has its own shareable URL
- 📱 **Mobile Friendly**: Works perfectly on all devices
- 💾 **Local Storage**: Data persists using browser's local storage

## Getting Started

1. **Open the blog**: Simply open `index.html` in your web browser
2. **Add posts**: Create new `.md` files in the `posts/` directory
3. **Customize**: Modify `styles.css` for different styling
4. **Deploy**: Upload all files to any web server

## Adding New Posts

### Method 1: Create Markdown Files
Create a new `.md` file in the `posts/` directory with frontmatter:

```markdown
---
title: "Your Post Title"
date: "2024-01-21"
author: "Your Name"
image: "optional-image-url"
---

# Your Post Content

Write your content here in Markdown format...
```

### Method 2: Edit posts.json
Add new posts metadata to the `posts.json` file (content will be loaded from the corresponding .md file):

```json
{
  "posts": [
    {
      "id": "your-post-id",
      "title": "Your Post Title",
      "excerpt": "Brief description of your post...",
      "date": "2024-01-21",
      "author": "Your Name",
      "image": "optional-image-url"
    }
  ]
}
```

**Note**: The `posts.json` file only contains metadata. The actual post content is loaded from the corresponding `.md` file when the post is clicked.

## File Structure

```
blog/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── posts.json          # Posts data (optional)
├── posts/              # Markdown posts directory
│   ├── welcome-to-my-blog.md
│   ├── building-simple-blog.md
│   └── css-responsive-design.md
└── README.md           # This file
```

## Customization

### Styling
Edit `styles.css` to customize the appearance. The design uses viewport units (vw) for responsive sizing.

### Functionality
Modify `script.js` to add new features or change behavior.

### Posts
- Use the `posts/` directory for individual Markdown files
- Or edit `posts.json` for centralized post management

## Browser Support

This blog works in all modern browsers that support:
- ES6 JavaScript features
- CSS Grid and Flexbox
- Local Storage API

## Deployment

### Local Development
Just open `index.html` in your browser - no server required!

### Web Server
Upload all files to any web server. Works with:
- Apache
- Nginx
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

### GitHub Pages
1. Push your files to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Your blog will be available at `https://yourusername.github.io/repositoryname`

## Features Explained

### Unique URLs
Each post gets a unique URL like `#post/post-id`. This allows direct linking to specific posts.

### Comments System
Comments are stored in the browser's local storage. Each post can have multiple comments with author names and timestamps.

### Like System
Users can like posts. Like counts are stored per post in local storage.

### Responsive Design
The blog uses CSS viewport units (vw) for sizing, making it truly responsive without media queries for most elements.

## Troubleshooting

### Posts Not Loading
- Check that your markdown files are in the `posts/` directory
- Verify the frontmatter format is correct
- Ensure the `posts.json` file has valid JSON syntax

### Styling Issues
- Check that `styles.css` is properly linked in `index.html`
- Verify CSS syntax is correct
- Test in different browsers

### JavaScript Errors
- Open browser developer tools (F12) to check for errors
- Ensure `script.js` is properly linked in `index.html`
- Check that all required libraries (marked.js) are loading

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to fork this project and submit pull requests for improvements!
