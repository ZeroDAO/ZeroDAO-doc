#!/usr/bin/env sh

set -e

# yarn docs:build

cd dist

echo 'docs.zerodao.net' > CNAME

git init

git add -A

git commit -m 'deploy'

git push -f git@github.com:ZeroDAO/ZeroDAO-doc.git master:gh-pages

cd -