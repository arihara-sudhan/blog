// Blog Application JavaScript
class BlogApp {
    constructor() {
        this.posts = [];
        this.currentPost = null;
        this.comments = {};
        this.likes = {};
        
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.handleRouting();
        this.loadPosts();
    }

    // Data Management
    loadData() {
        // Load posts data
        const savedPosts = localStorage.getItem('blogPosts');
        if (savedPosts) {
            this.posts = JSON.parse(savedPosts);
        }

        // Load comments data
        const savedComments = localStorage.getItem('blogComments');
        if (savedComments) {
            this.comments = JSON.parse(savedComments);
        }

        // Load likes data
        const savedLikes = localStorage.getItem('blogLikes');
        if (savedLikes) {
            this.likes = JSON.parse(savedLikes);
        }
    }

    saveData() {
        localStorage.setItem('blogPosts', JSON.stringify(this.posts));
        localStorage.setItem('blogComments', JSON.stringify(this.comments));
        localStorage.setItem('blogLikes', JSON.stringify(this.likes));
    }

    // Event Listeners
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.navigateToPage(page);
            });
        });

        // Giscus handles comments automatically

        // Like button
        document.getElementById('like-btn').addEventListener('click', () => {
            this.toggleLike();
        });

        // Back button
        document.querySelector('.back-link').addEventListener('click', (e) => {
            e.preventDefault();
            this.navigateToPage('home');
        });
    }

    // Routing
    handleRouting() {
        const hash = window.location.hash.substring(1);
        
        if (hash.startsWith('post/')) {
            const postId = hash.substring(5);
            this.showPost(postId);
        } else if (hash === 'about') {
            this.navigateToPage('about');
        } else {
            this.navigateToPage('home');
        }
    }

    navigateToPage(page) {
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === page) {
                link.classList.add('active');
            }
        });

        // Show appropriate page
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });

        if (page === 'home') {
            document.getElementById('home-page').classList.add('active');
            window.location.hash = '';
        } else if (page === 'about') {
            document.getElementById('about-page').classList.add('active');
            window.location.hash = 'about';
        }
    }

    // Posts Management
    async loadPosts() {
        try {
            // Try to load posts from markdown files
            const response = await fetch('posts.json');
            if (response.ok) {
                const postsData = await response.json();
                this.posts = postsData.posts;
                this.saveData();
            }
        } catch (error) {
            console.log('Using default posts or local storage data');
        }

        this.renderPosts();
    }

    renderPosts() {
        const postsGrid = document.getElementById('posts-grid');
        
        if (this.posts.length === 0) {
            postsGrid.innerHTML = '<div class="loading">No posts available</div>';
            return;
        }

        postsGrid.innerHTML = this.posts.map(post => `
            <div class="post-card" onclick="blogApp.showPost('${post.id}')">
                ${post.image ? `<img src="${post.image}" alt="${post.title}" class="post-card-image">` : ''}
                <div class="post-card-content">
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <div class="post-card-meta">
                        <span>${new Date(post.date).toLocaleDateString()}</span>
                        <div class="post-card-actions">
                            <span class="action-btn">
                                <span>♥</span>
                                <span>${this.getLikeCount(post.id)}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    async showPost(postId) {
        let post = this.posts.find(p => p.id === postId);
        
        // Always load the markdown content, even if we have metadata
        if (post && !post.content) {
            try {
                const response = await fetch(`posts/${postId}.md`);
                if (response.ok) {
                    const content = await response.text();
                    const parsedPost = this.parseMarkdownPost(content, postId);
                    // Merge the loaded content with existing metadata
                    post.content = parsedPost.content;
                    post.title = parsedPost.title || post.title;
                    post.date = parsedPost.date || post.date;
                    post.author = parsedPost.author || post.author;
                    post.image = parsedPost.image || post.image;
                }
            } catch (error) {
                console.error('Error loading post:', error);
                alert('Error loading post content!');
                return;
            }
        }

        if (!post) {
            alert('Post not found!');
            return;
        }

        if (!post.content) {
            alert('Post content not available!');
            return;
        }

        this.currentPost = post;
        this.renderPost(post);
        this.navigateToPost(postId);
    }

    parseMarkdownPost(content, postId) {
        const lines = content.split('\n');
        let title = '';
        let date = new Date().toISOString();
        let image = '';
        let author = 'Admin';
        
        // Parse frontmatter if present
        if (lines[0].startsWith('---')) {
            let i = 1;
            while (i < lines.length && !lines[i].startsWith('---')) {
                const line = lines[i];
                if (line.startsWith('title:')) {
                    title = line.substring(6).trim().replace(/['"]/g, '');
                } else if (line.startsWith('date:')) {
                    date = line.substring(5).trim();
                } else if (line.startsWith('image:')) {
                    image = line.substring(6).trim();
                } else if (line.startsWith('author:')) {
                    author = line.substring(7).trim();
                }
                i++;
            }
            content = lines.slice(i + 1).join('\n');
        }

        // If no title found, try to extract from first heading
        if (!title) {
            const titleMatch = content.match(/^#\s+(.+)$/m);
            if (titleMatch) {
                title = titleMatch[1];
                content = content.replace(/^#\s+.+$/m, '');
            }
        }

        // Generate excerpt
        const excerpt = this.generateExcerpt(content);

        return {
            id: postId,
            title: title || 'Untitled Post',
            content: content,
            excerpt: excerpt,
            date: date,
            image: image,
            author: author
        };
    }

    generateExcerpt(content) {
        // Remove markdown syntax and get first 150 characters
        const plainText = content
            .replace(/^#+\s+/gm, '')
            .replace(/\*\*(.*?)\*\*/g, '$1')
            .replace(/\*(.*?)\*/g, '$1')
            .replace(/`(.*?)`/g, '$1')
            .replace(/\[(.*?)\]\(.*?\)/g, '$1')
            .replace(/!\[.*?\]\(.*?\)/g, '')
            .trim();
        
        return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
    }

    renderPost(post) {
        document.getElementById('post-title').textContent = post.title;
        document.getElementById('post-date').textContent = new Date(post.date).toLocaleDateString();
        document.getElementById('post-author').textContent = `By ${post.author}`;
        
        // Render markdown content
        const htmlContent = marked.parse(post.content);
        document.getElementById('post-content').innerHTML = htmlContent;
        
        // Update like button
        this.updateLikeButton(post.id);
        
        // Initialize Giscus comments
        this.initGiscus();
        
        // Show post page
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById('post-page').classList.add('active');
    }

    navigateToPost(postId) {
        window.location.hash = `post/${postId}`;
        
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
    }

    // Giscus Comments System
    initGiscus() {
        // Giscus will automatically load when the script is included
        // We just need to configure it per post
        this.setupGiscusForPost();
    }

    setupGiscusForPost() {
        if (!this.currentPost) return;

        // Update the Giscus configuration for this specific post
        const giscusElement = document.querySelector('#giscus-comments');
        if (giscusElement) {
            // Clear existing giscus
            giscusElement.innerHTML = '';
            
            // Create new giscus instance for this post
            const script = document.createElement('script');
            script.src = 'https://giscus.app/client.js';
            script.setAttribute('data-repo', 'arihara-sudhan/blog');
            script.setAttribute('data-repo-id', 'R_kgDOHjabc123');
            script.setAttribute('data-category', 'General');
            script.setAttribute('data-category-id', 'DIC_kwDOHjabc123');
            script.setAttribute('data-mapping', 'pathname');
            script.setAttribute('data-term', `Blog Post: ${this.currentPost.title}`);
            script.setAttribute('data-reactions-enabled', '1');
            script.setAttribute('data-emit-metadata', '0');
            script.setAttribute('data-input-position', 'bottom');
            script.setAttribute('data-theme', 'light');
            script.setAttribute('data-lang', 'en');
            script.setAttribute('data-loading', 'lazy');
            script.setAttribute('crossorigin', 'anonymous');
            script.async = true;
            
            giscusElement.appendChild(script);
        }

        // Update the GitHub discussion link
        const discussionLink = document.getElementById('github-discussion-link');
        if (discussionLink) {
            discussionLink.href = `https://github.com/arihara-sudhan/blog/discussions`;
            discussionLink.textContent = 'view the discussion on GitHub';
        }
    }

    // Likes System
    toggleLike() {
        if (!this.currentPost) return;

        const postId = this.currentPost.id;
        const userLikes = this.getUserLikes();
        
        if (userLikes.includes(postId)) {
            // Unlike
            this.likes[postId] = Math.max(0, (this.likes[postId] || 0) - 1);
            this.removeUserLike(postId);
        } else {
            // Like
            this.likes[postId] = (this.likes[postId] || 0) + 1;
            this.addUserLike(postId);
        }

        this.saveData();
        this.updateLikeButton(postId);
        
        // Also update the home page if it's visible
        this.renderPosts();
    }

    getUserLikes() {
        const saved = localStorage.getItem('userLikes');
        return saved ? JSON.parse(saved) : [];
    }

    addUserLike(postId) {
        const userLikes = this.getUserLikes();
        if (!userLikes.includes(postId)) {
            userLikes.push(postId);
            localStorage.setItem('userLikes', JSON.stringify(userLikes));
        }
    }

    removeUserLike(postId) {
        const userLikes = this.getUserLikes();
        const index = userLikes.indexOf(postId);
        if (index > -1) {
            userLikes.splice(index, 1);
            localStorage.setItem('userLikes', JSON.stringify(userLikes));
        }
    }

    getLikeCount(postId) {
        return this.likes[postId] || 0;
    }

    updateLikeButton(postId) {
        const likeBtn = document.getElementById('like-btn');
        const likeIcon = document.getElementById('like-icon');
        const likeCount = document.getElementById('like-count');
        
        const isLiked = this.getUserLikes().includes(postId);
        const count = this.getLikeCount(postId);
        
        likeIcon.textContent = isLiked ? '♥' : '♡';
        likeCount.textContent = count;
        
        likeBtn.classList.toggle('liked', isLiked);
    }

    // Utility Functions
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the blog app when DOM is loaded
let blogApp;
document.addEventListener('DOMContentLoaded', () => {
    blogApp = new BlogApp();
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    if (blogApp) {
        blogApp.handleRouting();
    }
});

// Handle hash changes
window.addEventListener('hashchange', () => {
    if (blogApp) {
        blogApp.handleRouting();
    }
});
