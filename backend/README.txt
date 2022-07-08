npm install -g heroku
heroku login
heroku create
git checkout main
git status
git commit -m ''
git push
git subtree push --prefix backend heroku main
heroku logs --tailsss


