# Web Practice

|  #  | Page      | Description                                                        |
| :-: | :-------- | :----------------------------------------------------------------- |
|  1  | Homepage  | Shows paths and a brief description of each path                   |
|  2  | Login     | Login page                                                         |
|  3  | Register  | Register page                                                      |
|  4  | Path      | Overview of path, the challenges of path                           |
|  5  | Challenge | Overview of challenge, user stories, link to designs file on Figma |
|  6  | Dashboard | Ongoing projects, solutions, feedbacks, votes                      |
|  7  | Solution  | Solutions by path                                                  |

### GENERAL LAYOUT

- Header on top
- Sidebar on left
- The main content on right (based on sub-routing)
- Footer on bottom right

### LOGIN

#### Login form

- `Email`
  - Email input
  - Required
- `Password`
  - Password input
  - Required

### REGISTER

#### Register form

- `Name`
  - Text input
  - Should have at least 2 words
  - Required
- `Username`
  - Text input
  - Should only contain a-z, 0-9
  - Required
- `Email`
  - Email input
  - Required
- `Password`
  - Password input
  - Required

### DASHBOARD

- Ongoing projects
- Completed projects
- Feedbacks
- Votes

### CHALLENGE

- Overview
- User stories
- Designs file on Figma

### PATH

- Overview
  - For who
  - Rules
- Challenges

### SOLUTIONS

- Solutions by path
- Each solution includes:
  - Challenge name
  - Username
  - Thumbnail image of challenge
  - Actions: feedback & vote

### Built with

- UI library: Material UI
- Routing: React router DOM
- Form: React hook form
- Form validation: Yup
- HTTP client: axios

### Routings

- `/`: Home page
- `/login`: Login page
- `/register`: Register page
- `/paths/:pathName`: Path
- `/challenges/:challengeId`: Challenge
- `/dashboard`: Dashboard
- `/paths/:pathName/solution`: Solutions

Happy coding 🎉
