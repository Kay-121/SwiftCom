const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const WATCH_DIR = __dirname;
const COMMIT_MESSAGE = 'Auto-commit: Website changes detected';
const BRANCH = 'main';

console.log('🚀 Starting SwiftCom auto-push watcher...');
console.log(`📁 Watching directory: ${WATCH_DIR}`);
console.log(`🌐 Remote: origin/${BRANCH}`);

// Function to check if there are changes
function hasChanges() {
    try {
        const status = execSync('git status --porcelain', { encoding: 'utf8' });
        return status.trim().length > 0;
    } catch (error) {
        console.error('❌ Error checking git status:', error.message);
        return false;
    }
}

// Function to get changed files
function getChangedFiles() {
    try {
        const status = execSync('git status --porcelain', { encoding: 'utf8' });
        return status.trim().split('\n').filter(line => line.trim());
    } catch (error) {
        console.error('❌ Error getting changed files:', error.message);
        return [];
    }
}

// Function to commit and push changes
function commitAndPush() {
    try {
        console.log('📝 Changes detected, preparing to commit...');
        
        // Add all changes
        execSync('git add .', { encoding: 'utf8' });
        console.log('✅ Files added to staging area');
        
        // Get changed files for commit message
        const changedFiles = getChangedFiles();
        const fileList = changedFiles.map(file => file.split(' ').pop()).join(', ');
        const detailedMessage = `${COMMIT_MESSAGE}\n\nChanged files: ${fileList}`;
        
        // Commit changes
        execSync(`git commit -m "${detailedMessage}"`, { encoding: 'utf8' });
        console.log('✅ Changes committed successfully');
        
        // Push to remote
        execSync(`git push origin ${BRANCH}`, { encoding: 'utf8' });
        console.log('🚀 Changes pushed to GitHub successfully!');
        
        // Show changed files
        console.log('📋 Changed files:');
        changedFiles.forEach(file => {
            console.log(`   ${file}`);
        });
        
    } catch (error) {
        console.error('❌ Error during commit/push:', error.message);
        
        // Handle common errors
        if (error.message.includes('nothing to commit')) {
            console.log('ℹ️ No changes to commit');
        } else if (error.message.includes('Authentication failed')) {
            console.log('🔐 Authentication failed. Please check your GitHub credentials.');
        } else if (error.message.includes('remote:')) {
            console.log('🌐 Remote error. Check your internet connection.');
        }
    }
}

// Function to check git configuration
function checkGitConfig() {
    try {
        const user = execSync('git config user.name', { encoding: 'utf8' }).trim();
        const email = execSync('git config user.email', { encoding: 'utf8' }).trim();
        console.log(`👤 Git user: ${user} <${email}>`);
        return true;
    } catch (error) {
        console.log('⚠️ Git user not configured. Please run:');
        console.log('   git config --global user.name "Your Name"');
        console.log('   git config --global user.email "your.email@example.com"');
        return false;
    }
}

// Main monitoring function
function startMonitoring() {
    if (!checkGitConfig()) {
        process.exit(1);
    }

    console.log('👀 Monitoring for changes... (Press Ctrl+C to stop)');
    
    // Initial check
    if (hasChanges()) {
        commitAndPush();
    }
    
    // Set up file watcher
    const chokidar = require('chokidar');
    
    // Watch all relevant files
    const watcher = chokidar.watch([
        '**/*.html',
        '**/*.css',
        '**/*.js',
        '**/*.md',
        '!node_modules/**',
        '!.git/**'
    ], {
        ignored: /node_modules|\.git/,
        persistent: true,
        ignoreInitial: true
    });
    
    // Debounce changes to avoid multiple commits
    let timeout;
    
    watcher.on('all', (event, path) => {
        console.log(`🔄 File ${event}: ${path}`);
        
        // Clear existing timeout
        if (timeout) {
            clearTimeout(timeout);
        }
        
        // Wait 2 seconds before committing (debounce)
        timeout = setTimeout(() => {
            if (hasChanges()) {
                commitAndPush();
            }
        }, 2000);
    });
    
    watcher.on('error', error => {
        console.error('❌ Watcher error:', error);
    });
    
    // Handle process termination
    process.on('SIGINT', () => {
        console.log('\n👋 Stopping auto-push watcher...');
        watcher.close();
        process.exit(0);
    });
}

// Check if chokidar is available
try {
    require('chokidar');
    startMonitoring();
} catch (error) {
    console.log('📦 Installing required dependency...');
    execSync('npm init -y', { encoding: 'utf8' });
    execSync('npm install chokidar', { encoding: 'utf8' });
    console.log('✅ Dependency installed. Restarting...');
    
    // Restart the script
    setTimeout(() => {
        startMonitoring();
    }, 1000);
}
