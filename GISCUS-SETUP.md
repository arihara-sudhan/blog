# Giscus Setup Guide

Giscus is now integrated into your blog! Follow these steps to complete the setup.

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `my-blog` or `blog`
3. Make sure it's **public** (required for Giscus)
4. Enable **GitHub Discussions**:
   - Go to repository **Settings**
   - Scroll to **Features** section
   - Check **Discussions**

## Step 2: Get Repository Information

You need these values for the Giscus configuration:

### Repository Details:
- **Repository**: `yourusername/your-repo-name`
- **Repository ID**: Found in repository settings under "General"

### Category Details:
1. Go to your repository → **Discussions** tab
2. Create a new category called "General" (or use existing)
3. Get the **Category ID** from the URL or API

## Step 3: Update Configuration

Replace these values in `index.html`:

```html
<!-- Find this section and update: -->
<script src="https://giscus.app/client.js"
        data-repo="YOUR_USERNAME/YOUR_REPO"
        data-repo-id="YOUR_REPO_ID"
        data-category="General"
        data-category-id="YOUR_CATEGORY_ID"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="light"
        data-lang="en"
        data-loading="lazy"
        crossorigin="anonymous"
        async>
</script>
```

## Step 4: Update JavaScript

Also update the JavaScript file `script.js`:

```javascript
// Find these lines and update:
script.setAttribute('data-repo', 'YOUR_USERNAME/YOUR_REPO');
script.setAttribute('data-repo-id', 'YOUR_REPO_ID');
script.setAttribute('data-category', 'General');
script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID');

// And this line:
discussionLink.href = `https://github.com/YOUR_USERNAME/YOUR_REPO/discussions`;
```

## Step 5: Deploy to GitHub Pages

1. Push your blog to the GitHub repository
2. Go to repository **Settings** → **Pages**
3. Select **Deploy from a branch** → **main**
4. Your blog will be live at: `https://yourusername.github.io/your-repo`

## How Giscus Works

### Automatic Features:
- ✅ **Auto-creates discussions** when first comment is posted
- ✅ **Real GitHub accounts** required (reduces spam)
- ✅ **Reactions/Likes** built-in
- ✅ **Moderation** via GitHub Discussions
- ✅ **Markdown support** in comments
- ✅ **Threaded replies**
- ✅ **Real-time updates**

### Mapping Options:
- `pathname` - Each blog post gets its own discussion
- `title` - Uses post title to match discussions
- `url` - Uses full URL (including hash)

### Themes:
- `light` - Light theme
- `dark` - Dark theme
- `preferred_color_scheme` - Auto-detect user preference
- `transparent_dark` - Transparent dark
- `noborder_light` - Light without borders

## Testing

1. Deploy your blog to GitHub Pages
2. Visit a blog post
3. Try commenting (you'll need to authorize with GitHub)
4. Check your repository's Discussions tab to see the created discussion

## Benefits Over localStorage:

- ✅ **Permanent** - Stored on GitHub forever
- ✅ **Cross-device** - Comments sync everywhere
- ✅ **Moderation** - Full control over comments
- ✅ **Real users** - GitHub accounts required
- ✅ **Professional** - Looks legitimate
- ✅ **No spam** - GitHub's built-in spam protection
- ✅ **Rich features** - Reactions, replies, markdown

## Troubleshooting

### Comments not loading?
- Check repository is public
- Verify Discussions are enabled
- Check browser console for errors
- Ensure repository ID and category ID are correct

### Theme not matching?
- Try different theme options
- Use `preferred_color_scheme` for auto-detection
- Customize with CSS if needed

### Want different mapping?
- Change `data-mapping` to `title`, `url`, or `pathname`
- Each option creates discussions differently

## Advanced Configuration

Visit [giscus.app](https://giscus.app) for more configuration options and a visual configurator!
