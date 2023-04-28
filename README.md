# CS 30700 Project Charter
## Team 15: Frederick Clarke, Brandon Hart, Garrett O’Brien, Abdul Saleh

## Problem Statement
Selecting courses is often a daunting and stressful task for Purdue students. Between the wide selection, varying online reviews and confusing degree requirements, this process is one that has a clear need to be simplified so that students can spend more time focusing on their current courses and other interests rather than worrying about their future registration. The goal of our project is to simplify this process for students by suggesting classes based on criteria set by a student (including the degree requirement, number of credit hours, and time) and sorted based on reviews of the course/instructor by other Purdue students. This project will be unique in that it is an all-in-one service to find the best courses for a student rather than having to search around through university documentation and often-unreliable online forum reviews to gague opinions on a course or instructor.

## Project Objectives
- Verify users are students at Purdue University
- Retrieve scheduling information from official Purdue sources
- Accept input criteria from users to filter and suggest courses that best fit their requirements
- Rank courses suggested to a student based on reviews from other students
- Allow students to review courses they have taken and professors by whom they have been instructed, as well as submit grading information
- Suggest Ratemyprofessor pages and Reddit threads relevant to specific courses for users to further research a course

## Stakeholders
- Users: Purdue University students looking for courses to fit their requirements, academic advisors helping students find courses and looking to optimize registration process
- Developers: Frederick Clarke, Brandon Hart, Garrett O’Brien, Abdul Saleh
- Project Manager: Pranjal Punekar
- Project Owners: Frederick Clarke, Brandon Hart, Garrett O’Brien, Abdul Saleh

## Project Deliverables
- User-friendly and visually appealing React frontend
- Spring/Node.js backend to perform API and database calls
- Secure login/registration system with email verification to ensure users attend Purduea
- Connection to Purdue University APIs to access up-to-date scheduling information
- Well-designed MongoDB database to store user login information, course/instructor reviews, and build a user profile over time to more accurately suggest classes with reduced user input.
