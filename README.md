# The Skint Website

This repository contains the code needed to deploy the [Skint website](https://www.skintdance.org.uk/)

## ▶️ Getting started

1. Make sure you've got the following installed on your computer

   - [git](https://git-scm.com/)
     - I'd recommend running through [this exercise](https://docs.github.com/en/get-started/using-github/hello-world) if you're new to git
   - [node](https://nodejs.org/en)
   - [VSCode](https://code.visualstudio.com/) - optional but recommended

2. Clone this repo onto your computer. There are various ways of doing this

   - Run `git clone https://github.com/romosborne/skint-website` in a terminal
   - [Using VSCode](https://code.visualstudio.com/docs/sourcecontrol/repos-remotes#_clone-repositories)

3. In a terminal, run `npm i` in the directory that you cloned to to install all the dependancies

   - If you've opened the project in VSCode, you can select `Terminal > New Terminal` to open a terminal in the correct directory

4. Run `npm run dev` to get a local version of the site up and running. You can now go to http://localhost:3000 to view the site

   - When you don't need this anymore, use `ctrl-c` to stop it

5. Whilst that command is running, any changes you make to the project should automatically update your local view
   - Give it a go! Try changing the Skint description in `src/pages/index.astro` and see what happens

## 🚀 Deploying the site

The deployment of this website is largely automated. Here's the expected way of getting a change live.

1. Once a change has been made locally, the changes are committed and pushed to a new branch
2. In Github, a PR (Pull Request) is created to propose those changes
   - In larger projects, this is where you would get someone else to review your changes
3. When a PR is created, that new version of the site is automatically built and deployed to http://test.skint.s3-website-eu-west-1.amazonaws.com/
   - This doesn't affect the live site, and allows you to test that your changes work as expected
   - This process is controlled by a Github Action defined in `.github/workflows/test.yml`
4. If you spot any issues in testing, you can commit more changes to the same branch and the same PR
   - The new changes will automatically be deployed to the test site
5. Once you're happy, you can merge the PR into the main branch which will automatically trigger a deployment to the live site
   - This is defined in `.github/workflows/deploy.yml`

## 🔍 Useful places to look

| What                                  | Where                      |
| ------------------------------------- | -------------------------- |
| Individual pages                      | `src/pages`                |
| Layout elements                       | `src/layouts/Layout.astro` |
| Elements reused across multiple pages | `src/components`           |
| Data that changes every year          | `src/constants.ts`         |

`TICKET_BOOKING_LIVE` in `src/constants.ts` controls the visibility of the booking link. I added it in because it's easier to toggle one variable each year than adding/removing the link each time.

---

# Technical Info

This project uses [Astro](https://astro.build/) as a framework to build a static website that is then uploaded to an [S3 bucket](https://aws.amazon.com/s3/) for serving.

Astro is probably overkill for what we need here. Previous iterations of this site have used [Hugo](https://gohugo.io/). Dealer's choice really.
