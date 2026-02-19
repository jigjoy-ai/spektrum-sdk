# Spektrum TypeScript SDK

Spektrum is a Vibe Coding SDK that generates applications from requests and returns a URL to the deployed app.

## Installation

```bash
npm install @spektrum-ai/sdk
```

## Quick Start

```typescript
import { SpektrumSDK } from "@spektrum-ai/sdk"

const spektrum = new SpektrumSDK({
  apiKey: "your-api-key",
})

// Create a project, add a task, and deploy
const project = await spektrum.createProject("my-user-id")
const task = await spektrum.createTask(
  project.id,
  "Build a landing page",
  "Create a modern landing page with a hero section, features list, and contact form"
)

await spektrum.codeAndDeploy(task)

const appUrl = await spektrum.getAppUrl(project.id)
console.log(`Your app is live at: ${appUrl}`)
```

## Configuration

### Environment Variables

The SDK can be configured using environment variables:

```bash
export SPEKTRUM_API_KEY="your-api-key"
export SPEKTRUM_ENDPOINT="https://platform.jigjoy.ai"  # optional, this is the default
```

### Constructor Options

```typescript
const spektrum = new SpektrumSDK({
  apiKey: "your-api-key",        // Required (or set SPEKTRUM_API_KEY env var)
  endpoint: "https://custom.endpoint.com",  // Optional
})
```

## API Reference

### `createProject(owner: string)`

Creates a new project for the specified owner.

```typescript
const project = await spektrum.createProject("user-123")

console.log(project)
// {
//   id: "proj_abc123",
//   owner: "user-123",
//   name: "...",
//   description: "..."
// }
```

### `createTask(projectId: string, title: string, description: string)`

Creates a new task within a project. The description should detail what you want the AI to build.

```typescript
const task = await spektrum.createTask(
  project.id,
  "E-commerce product page",
  "Build a product page with image gallery, price display, add to cart button, and reviews section"
)

console.log(task.id)     // "task_xyz789"
console.log(task.status) // "Todo"
```

### `leaveComment(taskId: string, commentText: string, authorId: string)`

Adds a comment to an existing task. Use this to provide feedback or request changes.

```typescript
const updatedTask = await spektrum.leaveComment(
  task.id,
  "Please add a size selector dropdown above the add to cart button",
  "user-123"
)
```

### `codeAndDeploy(task: Task)`

Triggers the AI to generate code for the task and deploy it.

```typescript
await spektrum.codeAndDeploy(task)
```

### `getAppUrl(projectId: string)`

Returns the public URL of the deployed application.

```typescript
const url = await spektrum.getAppUrl(project.id)
console.log(url) // "https://your-app.jigjoy.ai"
```

## Complete Example

```typescript
import { SpektrumSDK, TaskStatus } from "@spektrum-ai/sdk"

async function buildAndDeployApp() {
  const spektrum = new SpektrumSDK({
    apiKey: process.env.SPEKTRUM_API_KEY,
  })

  // 1. Create a project
  const project = await spektrum.createProject("my-org")
  console.log(`Created project: ${project.id}`)

  // 2. Create a task describing what to build
  const task = await spektrum.createTask(
    project.id,
    "Todo App",
    `Build a todo application with the following features:
    - Add, edit, and delete todos
    - Mark todos as complete
    - Filter by status (all, active, completed)
    - Persist data to local storage
    - Clean, modern UI with animations`
  )
  console.log(`Created task: ${task.id}`)

  // 3. Generate and deploy the code
  await spektrum.codeAndDeploy(task)
  console.log("Code generated and deployed!")

  // 4. Get the deployed app URL
  const appUrl = await spektrum.getAppUrl(project.id)
  console.log(`App is live at: ${appUrl}`)

  // 5. Request changes via comments
  const updated = await spektrum.leaveComment(
    task.id,
    "Add dark mode support",
    "my-org"
  )

  // 6. Redeploy with changes
  await spektrum.codeAndDeploy(updated)
  const newUrl = await spektrum.getAppUrl(project.id)
  console.log(`Updated app: ${newUrl}`)
}

buildAndDeployApp().catch(console.error)
```

## Error Handling

The SDK throws `SpektrumError` for API errors:

```typescript
import { SpektrumSDK, SpektrumError } from "@spektrum-ai/sdk"

try {
  const spektrum = new SpektrumSDK({ apiKey: "invalid-key" })
  await spektrum.createProject("user")
} catch (error) {
  if (error instanceof SpektrumError) {
    console.error(`API Error: ${error.message}`)
    console.error(`Status: ${error.status}`)
    console.error(`Body: ${JSON.stringify(error.body)}`)
  }
}
```