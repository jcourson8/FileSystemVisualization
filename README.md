# Getting Started
```bash
$ npm install # or pnpm install or yarn install
```

In the project directory, you can run:

### `npm run dev` or `npm start`

The main objective is to recreate a similar file dropdown to LangSmith:
![image](https://github.com/jcourson8/FileSystemVisualization/assets/80439017/325a607f-8052-424c-af6e-3f0ae7d52cb3)

This is what I have so far, but the issue is dynamically updating the locations of the "connectors" efficiently. I couldn't develope a reactive version so right now it works, but it checks for the location of the refernces on an interval which is no bueno...
<img width="851" alt="image" src="https://github.com/jcourson8/FileSystemVisualization/assets/80439017/6e192de5-6e87-47f9-8622-e5acf6e4147f">

