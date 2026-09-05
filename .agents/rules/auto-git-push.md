# Auto Git Push Rule

Whenever any code changes, bug fixes, or feature implementations are made to the codebase:
- Immediately stage all modified/created files (`git add .`).
- Commit with a clear, descriptive message (`git commit -m "..."`).
- Push to GitHub directly (`git push origin main`).
- **NEVER** ask the user for permission to git push. Automatically perform git push every time.
