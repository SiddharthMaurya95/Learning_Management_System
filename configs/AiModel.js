// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';

export async function courseOutlineAIModel() {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: 'text/plain',
  };
  const model = 'gemini-2.5-pro-preview-06-05';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `Generate a study material for Python for Exam and level of difficulty will be Easy with summery of course, List of Chapters along with summery  for each chapter, Topic list in each chapter, all result  in JSON format

`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `**Developing Exam JSON Object**

I'm currently working on creating a JSON object tailored for an "Easy" level Python exam. The structure will include a course summary and a list of chapters, adhering to the user's specifications. The JSON will provide focused study material.


**Refining the JSON Structure**

I've revised the "Easy" level Python exam JSON object structure. I've added \`"course_title"\`, \`"difficulty_level"\`, and a more descriptive \`"course_summary"\`. I am adding \`"chapter_number"\`, \`"chapter_title"\`, \`"chapter_summary"\`, and \`"topics"\` for each chapter. This structured format will provide study material that is both comprehensive and easy to navigate.


**Outlining JSON Content**

I'm now populating the JSON structure I created. I'm focusing on "Python for Beginners" with an "Easy" difficulty. I'm building out the chapters, including titles, summaries, and topics, as requested. Each chapter focuses on fundamental concepts like setting up the environment, variables, and data types. I'm aiming for comprehensiveness at an introductory level.


**Expanding the Chapter Details**

I'm making progress by adding a fourth chapter on string manipulation. I'm focusing on key topics like string creation, concatenation, indexing, and slicing. I am now populating the content of the JSON. It will provide a solid foundation for exam preparation.


**Defining JSON Structure**

I've outlined the JSON structure needed for the "Easy" Python exam study material. It will include course details like "course_title", "difficulty_level", and "course_summary". Each chapter will have a number, title, summary, and topics. The structure will provide focused study material.


**Developing Exam Study Guide**

I'm presently building the study material JSON, focusing on Python fundamentals. I've structured it into a concise format: course summary, chapter titles, summaries, and key topics for an easy-level Python exam. The goal is to provide a structured, accessible guide for beginner Python learners.


**Structuring Exam Study Material**

I've finalized the JSON structure for the "Easy" Python exam study material, and I've also populated it with relevant data. The course details, including the summary, are included. All chapters are populated, each with a chapter number, title, summary, and a list of topics. I believe this JSON is comprehensive for an easy-level Python exam study guide.


`,
        },
        {
          text: `\`\`\`json
{
  "course_title": "Python Fundamentals for Beginners",
  "difficulty_level": "Easy",
  "course_summary": "This course is designed for individuals with no prior programming experience. It covers the essential building blocks of the Python language, including basic syntax, data types, control structures, and functions. By the end of this course, you will be able to write simple Python scripts and have a solid foundation to tackle more advanced topics.",
  "chapters": [
    {
      "chapter_number": 1,
      "chapter_title": "Introduction to Python",
      "chapter_summary": "This chapter introduces the world of Python. It covers what Python is, why it's a popular choice for beginners, and how to set up your computer to start coding. You will write and execute your very first Python program.",
      "topics": [
        "What is Python and its uses?",
        "Key features of Python (e.g., readability, dynamic typing)",
        "Installing Python on your system (Windows, macOS, Linux)",
        "Choosing and setting up a code editor (e.g., VS Code)",
        "Writing your first 'Hello, World!' program",
        "How to run a Python script from the terminal",
        "Understanding Python's indentation rules",
        "How to write comments in your code"
      ]
    },
    {
      "chapter_number": 2,
      "chapter_title": "Variables and Basic Data Types",
      "chapter_summary": "Learn the fundamental concept of storing information in variables. This chapter explores the different types of data you can work with in Python, such as numbers, text, and true/false values.",
      "topics": [
        "What are variables?",
        "Rules for naming variables",
        "Assigning values to variables",
        "Data Type: Integers (int)",
        "Data Type: Floating-Point Numbers (float)",
        "Data Type: Strings (str)",
        "Data Type: Booleans (bool)",
        "Using the type() function to check a variable's type",
        "Simple input from the user using the input() function",
        "Basic type conversion (casting)"
      ]
    },
    {
      "chapter_number": 3,
      "chapter_title": "Operators and Expressions",
      "chapter_summary": "This chapter covers the symbols and keywords Python uses to perform operations. You will learn how to do math, compare values, and combine logical conditions.",
      "topics": [
        "Arithmetic Operators (+, -, *, /, %, //, **)",
        "Assignment Operators (=, +=, -=)",
        "Comparison Operators (==, !=, >, <, >=, <=)",
        "Logical Operators (and, or, not)",
        "Combining operators to form expressions"
      ]
    },
    {
      "chapter_number": 4,
      "chapter_title": "Working with Strings",
      "chapter_summary": "A deeper look into handling text data. This chapter covers common operations you'll need when working with strings, from joining them together to changing their case.",
      "topics": [
        "Creating strings with single or double quotes",
        "String concatenation (joining strings)",
        "Using f-strings for easy formatting",
        "Accessing characters using indexing",
        "Getting the length of a string with len()",
        "Common string methods: .upper(), .lower(), .strip(), .replace()"
      ]
    },
    {
      "chapter_number": 5,
      "chapter_title": "Data Structures: Lists",
      "chapter_summary": "An introduction to one of Python's most useful data structures: the list. Lists allow you to store collections of items in a single variable, which can be easily accessed and modified.",
      "topics": [
        "What is a list?",
        "Creating a list",
        "Accessing list items by index",
        "Changing the value of a list item",
        "Adding items to a list with .append()",
        "Removing items from a list with .remove() or .pop()",
        "Finding the length of a list with len()"
      ]
    },
    {
      "chapter_number": 6,
      "chapter_title": "Control Flow: Conditional Statements",
      "chapter_summary": "Learn to control the flow of your program and make it execute different blocks of code based on certain conditions. This is how you make your programs 'smart'.",
      "topics": [
        "The 'if' statement",
        "The 'else' statement",
        "The 'elif' (else if) statement",
        "Writing conditions using comparison operators",
        "Combining conditions with 'and' and 'or'",
        "Nested 'if' statements"
      ]
    },
    {
      "chapter_number": 7,
      "chapter_title": "Control Flow: Loops",
      "chapter_summary": "Loops are essential for automation. This chapter teaches you how to execute a block of code multiple times without rewriting it, using 'for' and 'while' loops.",
      "topics": [
        "The 'for' loop",
        "Looping through a list",
        "Using the range() function with a 'for' loop",
        "The 'while' loop",
        "Creating a loop that runs as long as a condition is True",
        "The 'break' statement to exit a loop early",
        "The 'continue' statement to skip an iteration"
      ]
    },
    {
      "chapter_number": 8,
      "chapter_title": "Introduction to Functions",
      "chapter_summary": "Learn how to bundle your code into reusable blocks called functions. Functions make your code more organized, readable, and efficient by avoiding repetition.",
      "topics": [
        "Why use functions?",
        "Defining a function using the 'def' keyword",
        "Calling a function",
        "Passing information to functions using parameters",
        "Using the 'return' statement to get a value back from a function",
        "Understanding function arguments",
        "Basic variable scope (local vs. global)"
      ]
    }
  ]
}
\`\`\``,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let fileIndex = 0;
  for await (const chunk of response) {
    console.log(chunk.text);
  }
}

main();
