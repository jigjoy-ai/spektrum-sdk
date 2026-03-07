# Spektrum AI SDK

**From idea to deployed app in 4 lines of code.**

Spektrum is a Vibe Coding SDK that transforms natural language descriptions into fully functional, deployed web applications. Just describe what you want — Spektrum handles the rest.

```typescript
const project = await spektrum.createProject("finance-dashboard")
const task = await spektrum.createTask(project.id, "Build a finance dashboard with portfolio charts")
await spektrum.codeAndDeploy(task)
const url = await spektrum.getAppUrl(project.id) // Your app is live! 🚀
```

## See It In Action

Check out our **[working example repository](https://github.com/jigjoy-ai/spektrum-sdk-example)** — clone it, add your API key, and deploy your first AI-generated app in under a minute.

<img width="1363" height="774" alt="Screenshot from 2026-03-07 16-55-22" src="https://github.com/user-attachments/assets/561c7496-f157-420b-bf57-65afd0f598ca" />

## Installation

```bash
npm install @spektrum-ai/sdk
```

**Requirements:** Node.js 20.6.0 or higher

## Quick Start

### 1. Get Your API Key

Sign up at the [JigJoy Platform](https://jigjoy.ai/spektrum) to get your API key.

### 2. Set Up Environment

Create a `.env` file:

```bash
SPEKTRUM_API_KEY=your_api_key_here
```

### 3. Build Something Amazing

```typescript
import { SpektrumSDK } from "@spektrum-ai/sdk"

const spektrum = new SpektrumSDK()

// Create a project
const { project } = await spektrum.createProject("my-awesome-app")

// Describe what you want to build
const { task } = await spektrum.createTask(
  project.id,
  "E-commerce landing page",
  "Build a modern landing page with hero section, product grid, testimonials, and newsletter signup"
)

// Generate code and deploy
await spektrum.codeAndDeploy(task)

// Get your live URL
const appUrl = await spektrum.getAppUrl(project.id)
console.log(`🎉 Live at: ${appUrl}`)
```

## 🖥️ Live Monitoring on JigJoy Platform

Every task you run via the SDK can be monitored in real-time on the [JigJoy Platform](https://platform.jigjoy.ai). Watch as your application gets built step-by-step:

- **Live AI reasoning** — See the AI think through your requirements
- **Real-time code generation** — Watch your app being built
- **Deployment progress** — Track deployment status
- **Logs & debugging** — Access detailed logs when needed
- **App history** — View all your deployed apps and their versions


<img width="2555" height="1344" alt="Screenshot from 2026-03-07 16-57-47" src="https://github.com/user-attachments/assets/2151d118-0bca-4b36-b590-c273a664c165" />

## API Reference

### `createProject(name)`

Creates a new project.

```typescript
const { project } = await spektrum.createProject("my-project")
// project.id → "proj_abc123"
```

### `createTask(projectId, title, description)`

Creates a task describing what to build. Be as detailed as you want — the more context, the better the result.

```typescript
const { task } = await spektrum.createTask(
  project.id,
  "Dashboard",
  "Create an analytics dashboard with charts, filters, and data export"
)
```

### `codeAndDeploy(task)`

Triggers AI code generation and deployment. This is where the magic happens.

```typescript
await spektrum.codeAndDeploy(task)
```

### `getAppUrl(projectId)`

Returns the public URL of your deployed application.

```typescript
const url = await spektrum.getAppUrl(project.id)
// "https://abc123.apps.jigjoy.ai"
```

### `leaveComment(taskId, commentText, authorId)`

Add feedback or request changes to an existing task. Then call `codeAndDeploy` again to apply them.

```typescript
const { task: updatedTask } = await spektrum.leaveComment(
  task.id,
  "Add dark mode support",
  "user-123"
)
await spektrum.codeAndDeploy(updatedTask)
```

## SDK Methods Summary

| Method | Description |
|--------|-------------|
| `createProject(name)` | Creates a new project |
| `createTask(projectId, title, description)` | Defines what to build |
| `codeAndDeploy(task)` | Generates code and deploys |
| `getAppUrl(projectId)` | Returns the live app URL |
| `leaveComment(taskId, comment, authorId)` | Requests changes to a task |

## Error Handling

```typescript
import { SpektrumSDK, SpektrumError } from "@spektrum-ai/sdk"

try {
  await spektrum.codeAndDeploy(task)
} catch (error) {
  if (error instanceof SpektrumError) {
    console.error(`API Error [${error.status}]: ${error.message}`)
  }
}
```

## Complete Example

For a full working example with step-by-step instructions, check out:

**[spektrum-sdk-example](https://github.com/jigjoy-ai/spektrum-sdk-example)**

Clone it, run `npm install`, add your API key, and you'll have a deployed finance dashboard in seconds.

## Links

- [JigJoy Platform](https://platform.jigjoy.ai) — Get your API key and monitor your apps
- [Working Example](https://github.com/jigjoy-ai/spektrum-sdk-example) — Clone and run in seconds
- [npm Package](https://www.npmjs.com/package/@spektrum-ai/sdk) — Latest version

## License

MIT
