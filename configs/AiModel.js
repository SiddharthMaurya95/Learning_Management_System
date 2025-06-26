import { GoogleGenerativeAI } from "@google/generative-ai";
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  export const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  export const GenerateStudyTypeContentAiModel = model.startChat({
      generationConfig,
      history: [
    {
      role: 'user',
      parts: [
        {
          text: `Generate the flashcard on topic : Flutter Fundamentals,User Interface (UI) Development,Basic App Navigation in JSON format with front back content, Maximum 15
`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `**Initiating the Design**

I'm starting the design process. My goal is to craft JSON flashcards on Flutter fundamentals, UI development, and basic navigation. I will structure each flashcard with a front and back side for efficient learning.


**Refining the Structure**

The brainstorming is done. Now, I'm focusing on organizing the concepts into manageable flashcards. I'm prioritizing essential Flutter topics, UI design elements, and core navigation principles. I will draft the JSON structure and map the concepts to ensure clarity and coherence, striving for concise yet informative flashcards.


**Structuring the Flashcards**

I've selected the most important concepts, prioritizing brevity for each flashcard. Now, I'm working to refine each front and back pair to be concise and accurate. I'm focusing on clarity, ensuring the responses are easy to understand and provide the essential information about each topic. After the first 5 flashcards, I'm focusing on refining the UI Development section of my notes.


**Focusing on Refinement**

Now, I'm focusing on the navigation concepts. My goal is to ensure each front and back pair encapsulates the core ideas, keeping things concise. The intent is to provide straightforward answers. Currently, I'm constructing clear and concise responses for the first six flashcards, focusing on Flutter fundamentals and initial UI widgets. After that, I'll move into navigation. I plan to refine the presentation to be more appealing.


**Finalizing the Content**

I've finalized the flashcards, aiming for clarity, conciseness, and accuracy. Each front and back pair encapsulates essential Flutter concepts. I carefully structured the JSON and verified its syntax, ensuring it's ready for use. Now, I will polish the UI Development section of my notes.


`,
        },
        {
          text: `\`\`\`json
[
  {
    "front": "What is Flutter?",
    "back": "Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase."
  },
  {
    "front": "What programming language does Flutter primarily use?",
    "back": "Dart."
  },
  {
    "front": "What are the fundamental building blocks of Flutter UI?",
    "back": "Widgets."
  },
  {
    "front": "What are the two main types of widgets in Flutter?",
    "back": "StatelessWidget and StatefulWidget."
  },
  {
    "front": "Explain the difference between a StatelessWidget and a StatefulWidget.",
    "back": "A StatelessWidget's properties are immutable (cannot change over time), while a StatefulWidget's state can change during the lifetime of the widget."
  },
  {
    "front": "What is 'Hot Reload' in Flutter?",
    "back": "A feature that injects updated source code files into the running Dart Virtual Machine, allowing for rapid UI changes without losing the app's current state."
  },
  {
    "front": "Which Flutter widget arranges its children vertically?",
    "back": "\`Column\`."
  },
  {
    "front": "Which Flutter widget arranges its children horizontally?",
    "back": "\`Row\`."
  },
  {
    "front": "What is the primary purpose of the \`Scaffold\` widget?",
    "back": "Provides a basic material design visual structure for a screen, including \`AppBar\`, \`Drawer\`, \`SnackBar\`, and \`FloatingActionButton\`."
  },
  {
    "front": "How do you add internal padding around a widget in Flutter?",
    "back": "Wrap the widget with a \`Padding\` widget."
  },
  {
    "front": "How can you add fixed empty space between widgets?",
    "back": "\`SizedBox\` (e.g., \`SizedBox(height: 10)\` or \`SizedBox(width: 20)\`)."
  },
  {
    "front": "What Flutter class is used for managing a stack of routes (screens)?",
    "back": "\`Navigator\`."
  },
  {
    "front": "How do you navigate to a new screen (route) in Flutter?",
    "back": "Use \`Navigator.push()\` (often with \`MaterialPageRoute\`)."
  },
  {
    "front": "How do you go back to the previous screen (route)?",
    "back": "Use \`Navigator.pop(context)\`."
  },
  {
    "front": "What are 'named routes' in Flutter navigation?",
    "back": "Routes defined by a unique string name (e.g., '/home', '/settings'), allowing navigation using \`Navigator.pushNamed()\` for cleaner code and easier management."
  }
]
\`\`\``,
        },
      ],
    },  
  ],
    });

    export const GenerateQuizAiModel = model.startChat({
      generationConfig,
      history: [
    {
      role: 'user',
      parts: [
        {
          text: `Generate Quiz on topic : Flutter Fundamentals,User Interface (UI) Development,Basic App Navigation with Question and Options along with correct answer in JSON format, (Max 10)
schema:
{
"quizTitle":"string",
"questions":[
{"question":"string",
"options":["string",],
"answer":"string"},]}`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `\`\`\`json
{
  "quizTitle": "Flutter Fundamentals and UI Development Quiz",
  "questions": [
    {
      "question": "What is Flutter?",
      "options": [
        "A backend framework",
        "A cross-platform UI toolkit",
        "A database management system",
        "An operating system"
      ],
      "answer": "A cross-platform UI toolkit"
    },
    {
      "question": "Which programming language is used to develop Flutter apps?",
      "options": [
        "Java",
        "Swift",
        "Kotlin",
        "Dart"
      ],
      "answer": "Dart"
    },
    {
      "question": "What is a Widget in Flutter?",
      "options": [
        "A function that returns data",
        "A blueprint for a UI element",
        "A database table",
        "A network protocol"
      ],
      "answer": "A blueprint for a UI element"
    },
    {
      "question": "What is the purpose of the 'build' method in a Flutter Widget?",
      "options": [
        "To initialize the widget's state",
        "To define the widget's visual structure",
        "To handle user input",
        "To connect to a database"
      ],
      "answer": "To define the widget's visual structure"
    },
    {
      "question": "What is the difference between a StatelessWidget and a StatefulWidget?",
      "options": [
        "StatelessWidgets can be updated, while StatefulWidgets cannot.",
        "StatefulWidgets can be updated, while StatelessWidget cannot.",
        "StatelessWidgets are more performant than StatefulWidgets.",
        "There is no difference between them."
      ],
      "answer": "StatefulWidgets can be updated, while StatelessWidget cannot."
    },
    {
      "question": "Which widget is used for creating a vertical list of items?",
      "options": [
        "Row",
        "Column",
        "ListView",
        "GridView"
      ],
      "answer": "ListView"
    },
    {
      "question": "Which widget is used for creating a horizontal list of items?",
      "options": [
        "Row",
        "Column",
        "ListView",
        "GridView"
      ],
      "answer": "Row"
    },
    {
      "question": "What is the purpose of the 'Navigator' in Flutter?",
      "options": [
        "To manage network requests",
        "To handle user authentication",
        "To manage routes and screen transitions",
        "To store application data"
      ],
      "answer": "To manage routes and screen transitions"
    },
    {
      "question": "What is the function \`setState()\` used for in Flutter?",
      "options": [
        "To initialize the state of a widget.",
        "To rebuild the widget with new state data.",
        "To define the visual layout.",
        "To handle user events."
      ],
      "answer": "To rebuild the widget with new state data."
    },
    {
      "question": "Which layout widget arranges children in a two-dimensional, scrollable grid?",
      "options": [
        "Column",
        "Row",
        "ListView",
        "GridView"
      ],
      "answer": "GridView"
    }
  ]
}
\`\`\``,
        },
      ],
    }
  ],
    });
  
  