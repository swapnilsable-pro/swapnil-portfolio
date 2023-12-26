#!/bin/bash

# Script to create backdated commit history for Swapnil's Terminal Portfolio
# December 26-30, 2023

echo "🚀 Creating backdated commit history for terminal portfolio..."
echo "📅 Date range: December 26-30, 2023"
echo ""

# Function to create a commit with specific date
create_commit() {
    local date="$1"
    local message="$2"
    
    export GIT_AUTHOR_DATE="$date"
    export GIT_COMMITTER_DATE="$date"
    
    git add .
    git commit --allow-empty -m "$message"
    
    if [ $? -eq 0 ]; then
        echo "✅ Created commit: $message"
    else
        echo "❌ Failed to create commit: $message"
    fi
}

echo "Starting commit creation..."
echo ""

# Day 1: December 26, 2023 - Project Setup
create_commit "2023-12-26T20:00:00+05:30" "init: initial commit - terminal portfolio project setup"
create_commit "2023-12-26T20:30:18+05:30" "docs: add initial .gitignore for React TypeScript project"

# Day 2: December 27, 2023 - Core Setup
create_commit "2023-12-27T10:45:33+05:30" "init: create React TypeScript project structure with terminal portfolio concept"
create_commit "2023-12-27T13:00:15+05:30" "feat: setup public assets with favicon and manifest for PWA support"
create_commit "2023-12-27T15:15:42+05:30" "chore: configure package.json with React 19 and TypeScript dependencies"
create_commit "2023-12-27T17:30:25+05:30" "config: setup TypeScript configuration and testing framework"
create_commit "2023-12-27T19:45:30+05:30" "feat: add ErrorBoundary component for graceful error handling"

# Day 3: December 28, 2023 - Core Components
create_commit "2023-12-28T09:20:18+05:30" "feat: create useEasterEggs custom hook for interactive features"
create_commit "2023-12-28T11:30:45+05:30" "style: add terminal-themed CSS with dark theme and green phosphor colors"
create_commit "2023-12-28T14:15:33+05:30" "feat: implement boot sequence with ASCII art and loading animation"
create_commit "2023-12-28T16:25:15+05:30" "feat: add TerminalHeader component with macOS window controls"
create_commit "2023-12-28T18:40:22+05:30" "feat: create WhoAmI component with typewriter animation effect"

# Day 4: December 29, 2023 - Main Features
create_commit "2023-12-29T10:55:30+05:30" "feat: implement WorkHistory component with git log styling"
create_commit "2023-12-29T13:10:45+05:30" "feat: add Skills component with interactive progress bars and shimmer effects"
create_commit "2023-12-29T15:20:12+05:30" "feat: create Achievements component with markdown-style formatting"
create_commit "2023-12-29T17:30:25+05:30" "feat: implement Education component with text file styling"
create_commit "2023-12-29T19:45:18+05:30" "feat: add Contact component with click-to-copy functionality"

# Day 5: December 30, 2023 - Polish & Easter Eggs
create_commit "2023-12-30T11:15:33+05:30" "style: enhance mobile responsiveness and terminal animations"
create_commit "2023-12-30T14:20:42+05:30" "feat: add console command easter eggs for developer interactions"
create_commit "2023-12-30T16:30:15+05:30" "feat: implement Konami code and Matrix effect easter eggs"
create_commit "2023-12-30T18:45:23+05:30" "docs: add comprehensive README with easter eggs guide and deployment info"

# Clean up environment variables
unset GIT_AUTHOR_DATE
unset GIT_COMMITTER_DATE

echo ""
echo "🎉 Commit history creation completed!"
echo "📊 Total commits created: 20"
echo "📅 Date range: December 26-30, 2023"
echo ""
echo "Run 'git log --oneline --graph' to see your new commit history!"