# Migrate Repositories

## Source of information

[Github Import](https://help.github.com/articles/importing-a-git-repository-using-the-command-line)

## Commands

```Shell Session
git clone --bare https://external-host.com/extuser/repo.git
git clone --bare https://niteshvora@bitbucket.org/niteshvora/_templates.git

cd repo.git
cd _templates.git

git push --mirror https://github.com/ghuser/repo.git
git push --mirror https://github.com/niteshv/_templates.git
```