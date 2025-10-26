class BlogApp {
    constructor() {
        this.posts = [];
        this.currentPost = null;
        this.comments = {};
        this.currentTopic = 'all';
        
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.handleRouting();
        this.loadPosts();
    }

    loadData() {
        const savedPosts = localStorage.getItem('blogPosts');
        if (savedPosts) {
            this.posts = JSON.parse(savedPosts);
        }

        const savedComments = localStorage.getItem('blogComments');
        if (savedComments) {
            this.comments = JSON.parse(savedComments);
        }

    }

    saveData() {
        localStorage.setItem('blogPosts', JSON.stringify(this.posts));
        localStorage.setItem('blogComments', JSON.stringify(this.comments));
    }

    setupEventListeners() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.navigateToPage(page);
            });
        });

        document.querySelectorAll('.topic-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const topic = btn.dataset.topic;
                this.filterByTopic(topic);
                
                document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    handleRouting() {
        const hash = window.location.hash.substring(1);
        
        if (hash.startsWith('post/')) {
            const postId = decodeURIComponent(hash.substring(5));
            this.showPost(postId);
        } else if (hash === 'about') {
            this.navigateToPage('about');
        } else {
            this.navigateToPage('home');
        }
    }

    navigateToPage(page) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === page) {
                link.classList.add('active');
            }
        });
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

    async loadPosts() {
        try {
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

    filterByTopic(topic) {
        this.currentTopic = topic;
        this.renderPosts();
    }

    renderPosts() {
        const postsGrid = document.getElementById('posts-grid');
        
        if (this.posts.length === 0) {
            postsGrid.innerHTML = '<div class="loading">No posts available</div>';
            return;
        }

        // Sort posts by date in descending order (newest first)
        const sortedPosts = [...this.posts].sort((a, b) => new Date(b.date) - new Date(a.date));

        const filteredPosts = this.currentTopic === 'all' 
            ? sortedPosts 
            : sortedPosts.filter(post => post.category === this.currentTopic);

        if (filteredPosts.length === 0) {
            postsGrid.innerHTML = '<div class="loading">No posts in this category yet</div>';
            return;
        }

        postsGrid.innerHTML = filteredPosts.map(post => `
            <div class="post-card" onclick="blogApp.showPost('${post.id}')">
                ${post.image ? `<img src="${post.image}" alt="${post.title}" class="post-card-image">` : ''}
                <div class="post-card-content">
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <div class="post-card-meta">
                        <span>${new Date(post.date).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    async showPost(postId) {
        let post = this.posts.find(p => p.id === postId);
        
        if (post && !post.content) {
            try {
                // Try local file first, fallback to GitHub
                let response = await fetch(`posts/${postId}.md`);
                if (!response.ok) {
                    response = await fetch(`https://raw.githubusercontent.com/arihara-sudhan/blog/main/posts/${postId}.md`);
                }
                if (response.ok) {
                    const content = await response.text();
                    const parsedPost = this.parseMarkdownPost(content, postId);
        
                    post.content = parsedPost.content;
                    post.date = parsedPost.date || post.date;
                    post.author = parsedPost.author || post.author;
                    post.image = parsedPost.image || post.image;
                }
            } catch (error) {
                console.error('Error loading post:', error);
                return;
            }
        }

        if (!post) {
            return;
        }

        if (!post.content) {
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

        if (!title) {
            const titleMatch = content.match(/^#\s+(.+)$/m);
            if (titleMatch) {
                title = titleMatch[1];
                content = content.replace(/^#\s+.+$/m, '');
            }
        }

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
        const postTitleElement = document.getElementById('post-title');
        postTitleElement.textContent = post.title;
        
        // Add hr after title if it doesn't exist
        if (!postTitleElement.nextElementSibling || !postTitleElement.nextElementSibling.tagName === 'HR') {
            const hr = document.createElement('hr');
            postTitleElement.parentNode.insertBefore(hr, postTitleElement.nextSibling);
        }
        
        const htmlContent = marked.parse(post.content);
        document.getElementById('post-content').innerHTML = htmlContent;
        
        this.initGiscus();
        
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById('post-page').classList.add('active');
    }

    navigateToPost(postId) {
        window.location.hash = `post/${postId}`;
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
    }

    initGiscus() {
        this.setupGiscusForPost();
    }

    setupGiscusForPost() {
        if (!this.currentPost) return;

        const giscusElement = document.querySelector('#giscus-comments');
        if (giscusElement) {
            giscusElement.innerHTML = '';
            
            const script = document.createElement('script');
            script.src = 'https://giscus.app/client.js';
            script.setAttribute('data-repo', 'arihara-sudhan/blog');
            script.setAttribute('data-repo-id', 'R_kgDOP23WIg');
            script.setAttribute('data-category', 'General');
            script.setAttribute('data-category-id', 'DIC_kwDOP23WIs4Cv48x');
            script.setAttribute('data-mapping', 'specific');
            script.setAttribute('data-term', `Blog Post: ${this.currentPost.title} (${this.currentPost.id})`);
            script.setAttribute('data-reactions-enabled', '1');
            script.setAttribute('data-emit-metadata', '0');
            script.setAttribute('data-input-position', 'top');
            script.setAttribute('data-theme', 'light');
            script.setAttribute('data-lang', 'en');
            script.setAttribute('data-loading', 'lazy');
            script.setAttribute('crossorigin', 'anonymous');
            script.async = true;
            
            giscusElement.appendChild(script);
        }

        const discussionLink = document.getElementById('github-discussion-link');
        if (discussionLink) {
            discussionLink.href = `https://github.com/arihara-sudhan/blog/discussions`;
            discussionLink.textContent = 'view the discussion on GitHub';
        }
    }


    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

let blogApp;
document.addEventListener('DOMContentLoaded', () => {
    blogApp = new BlogApp();
});

window.addEventListener('popstate', () => {
    if (blogApp) {
        blogApp.handleRouting();
    }
});

window.addEventListener('hashchange', () => {
    if (blogApp) {
        blogApp.handleRouting();
    }
});
