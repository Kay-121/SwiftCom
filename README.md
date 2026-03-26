# SwiftCom Telecommunications Website

A modern, responsive 3-page telecommunications website for SwiftCom, featuring automatic Git integration for seamless development workflow.

## 🚀 Features

- **3 Professional Pages**: Homepage, Services, and Contact
- **Modern Design**: Responsive layout with gradient backgrounds and smooth animations
- **Interactive Elements**: Mobile navigation, form validation, smooth scrolling
- **Auto-Push System**: Automatic Git commits and pushes on file changes
- **Telecommunications Content**: 5G, fiber optics, business solutions, IoT services

## 📁 Project Structure

```
swiftcom-website/
├── index.html          # Homepage with hero section and features
├── services.html       # Services page with pricing plans
├── contact.html        # Contact page with form and information
├── styles.css          # Complete styling with responsive design
├── script.js           # Interactive JavaScript features
├── auto-push.js        # Automatic Git integration system
├── package.json        # Node.js dependencies and scripts
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## 🛠️ Setup and Usage

### Initial Setup

1. **Clone or navigate to the project directory**
   ```bash
   cd swiftcom-website
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Configure Git (if not already done)**
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

### Development Workflow

#### Option 1: Automatic Git Push (Recommended)

Start the auto-push watcher:
```bash
npm start
```

This will:
- Watch all HTML, CSS, JS, and MD files for changes
- Automatically commit and push changes to GitHub
- Provide detailed feedback on each operation
- Debounce changes to avoid excessive commits

#### Option 2: Manual Development

For manual development without auto-push:
```bash
# Start local server
python -m http.server 8000
# or
npx serve .

# Manual Git operations
git add .
git commit -m "Your commit message"
git push origin main
```

## 🔄 Auto-Push Features

The automatic push system includes:

- **File Watching**: Monitors all relevant file types
- **Debouncing**: Waits 2 seconds after changes before committing
- **Detailed Logging**: Shows which files were changed
- **Error Handling**: Handles common Git errors gracefully
- **Status Checks**: Verifies Git configuration before starting

## 🌐 Deployment

The website is ready for deployment on any static hosting service:

- **GitHub Pages**: Enable in repository settings
- **Netlify**: Connect the GitHub repository
- **Vercel**: Import the project
- **Firebase Hosting**: Deploy with Firebase CLI

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🎨 Design Features

- Modern gradient backgrounds
- Smooth animations and transitions
- Interactive hover effects
- Mobile-friendly navigation
- Form validation and feedback
- Counter animations for statistics

## 📞 Contact Information

- **Phone**: 1-800-SWIFTCOM
- **Email**: info@swiftcom.com
- **Hours**: 24/7 Support

## 🤝 Contributing

1. Make changes to any file
2. The auto-push system will automatically commit and push
3. Or use manual Git workflow if preferred

## 📄 License

This project is licensed under the MIT License.

---

**Note**: The auto-push system requires Node.js and a configured Git environment with proper GitHub credentials.
SwiftCom Website
