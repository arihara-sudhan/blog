class GitHubComments {
    constructor(repoOwner, repoName) {
        this.repoOwner = repoOwner;
        this.repoName = repoName;
        this.apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/issues`;
    }

    async createPostIssue(postId, postTitle) {
        const issueData = {
            title: `Blog Post: ${postTitle}`,
            body: `This issue tracks comments for the blog post: ${postTitle}\n\nPost ID: ${postId}\n\n---\n\n*Comments below will appear on the blog post.*`,
            labels: ['blog-post', 'comments']
        };

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `token YOUR_GITHUB_TOKEN`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(issueData)
            });

            if (response.ok) {
                const issue = await response.json();
                return issue.number;
            }
        } catch (error) {
            console.error('Error creating GitHub issue:', error);
        }
    }

    async getComments(issueNumber) {
        try {
            const response = await fetch(`${this.apiUrl}/${issueNumber}/comments`);
            if (response.ok) {
                const comments = await response.json();
                return comments.map(comment => ({
                    id: comment.id,
                    text: comment.body,
                    author: comment.user.login,
                    date: comment.created_at,
                    avatar: comment.user.avatar_url,
                    url: comment.html_url
                }));
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
        return [];
    }

    async getLikeCount(issueNumber) {
        try {
            const response = await fetch(`${this.apiUrl}/${issueNumber}/reactions`);
            if (response.ok) {
                const reactions = await response.json();
                return reactions.filter(r => r.content === '+1').length;
            }
        } catch (error) {
            console.error('Error fetching reactions:', error);
        }
        return 0;
    }

    async addLike(issueNumber, token) {
        try {
            const response = await fetch(`${this.apiUrl}/${issueNumber}/reactions`, {
                method: 'POST',
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: '+1'
                })
            });
            return response.ok;
        } catch (error) {
            console.error('Error adding like:', error);
            return false;
        }
    }

    getCommentUrl(issueNumber) {
        return `https://github.com/${this.repoOwner}/${this.repoName}/issues/${issueNumber}`;
    }

    renderComments(comments) {
        return comments.map(comment => `
            <div class="comment github-comment">
                <div class="comment-header">
                    <img src="${comment.avatar}" alt="${comment.author}" class="comment-avatar">
                    <div class="comment-author">${comment.author}</div>
                    <div class="comment-date">${new Date(comment.date).toLocaleString()}</div>
                </div>
                <div class="comment-text">${this.markdownToHtml(comment.text)}</div>
                <a href="${comment.url}" target="_blank" class="comment-link">View on GitHub</a>
            </div>
        `).join('');
    }

    markdownToHtml(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }
}

