// GitHub API configuration
const GITHUB_API = 'https://api.github.com';
const USERNAME = 'jayesthsingh';

// Create stars background effect
function createStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        starsContainer.appendChild(star);
    }
}

// Fetch user data from GitHub API
async function fetchUserData() {
    try {
        const response = await fetch(`${GITHUB_API}/users/${USERNAME}`);
        const userData = await response.json();
        updateUserStats(userData);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

// Fetch user repositories
async function fetchUserRepos() {
    try {
        const response = await fetch(`${GITHUB_API}/users/${USERNAME}/repos?sort=updated&per_page=6`);
        const repos = await response.json();
        displayRepos(repos);
    } catch (error) {
        console.error('Error fetching repositories:', error);
    }
}

// Update user statistics
function updateUserStats(userData) {
    document.getElementById('repo-count').textContent = userData.public_repos;
    document.getElementById('star-count').textContent = userData.starred_url.split('/').pop();

    // Fetch languages
    fetchUserLanguages();
}

// Fetch and display user's programming languages
async function fetchUserLanguages() {
    try {
        const response = await fetch(`${GITHUB_API}/users/${USERNAME}/repos`);
        const repos = await response.json();
        const languages = new Set();

        for (const repo of repos) {
            if (repo.language) {
                languages.add(repo.language);
            }
        }

        document.getElementById('language-count').textContent = languages.size;
        displaySkills(Array.from(languages));
    } catch (error) {
        console.error('Error fetching languages:', error);
    }
}

// Display repositories
function displayRepos(repos) {
    const reposGrid = document.getElementById('repos-grid');
    reposGrid.innerHTML = '';

    repos.forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.className = 'repo-card';
        repoCard.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || 'No description available'}</p>
            <div class="repo-stats">
                <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
            </div>
            <a href="${repo.html_url}" target="_blank" class="repo-link">View on GitHub</a>
        `;
        reposGrid.appendChild(repoCard);
    });
}

// Display skills
function displaySkills(skills) {
    const skillsContainer = document.getElementById('skills-container');
    skillsContainer.innerHTML = '';

    skills.forEach(skill => {
        const skillTag = document.createElement('div');
        skillTag.className = 'skill-tag';
        skillTag.textContent = skill;
        skillsContainer.appendChild(skillTag);
    });
}

// Add hover effect to profile image
function addProfileImageEffect() {
    const profilePic = document.getElementById('profile-pic');
    profilePic.addEventListener('mouseover', () => {
        profilePic.style.transform = 'scale(1.1)';
    });

    profilePic.addEventListener('mouseout', () => {
        profilePic.style.transform = 'scale(1)';
    });
}

// Initialize the page
function init() {
    createStars();
    fetchUserData();
    fetchUserRepos();
    addProfileImageEffect();
}

// Start the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', init); 