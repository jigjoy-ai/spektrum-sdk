import { SpektrumError } from "./errors"
import type {
  SpektrumSDKOptions,
  CreateProjectResponse,
  CreateTaskResponse,
  LeaveCommentResponse,
  Task,
} from "./types"

const DEFAULT_ENDPOINT = "https://platform.jigjoy.ai"

function readEnv(name: string): string | undefined {
  // Works in Node. In browsers this is usually undefined (unless bundled/injected).
  return (globalThis as any)?.process?.env?.[name]
}

export class SpektrumSDK {
  private readonly endpoint: string
  private readonly apiKey: string

  constructor(options: SpektrumSDKOptions = {}) {
    const endpoint = options.endpoint ?? readEnv("SPEKTRUM_ENDPOINT") ?? DEFAULT_ENDPOINT
    const apiKey = options.apiKey ?? readEnv("SPEKTRUM_API_KEY")

    if (!apiKey) {
      throw new Error(
        "Missing SPEKTRUM_API_KEY. Set it in your environment or pass { apiKey } to the constructor."
      )
    }

    this.endpoint = endpoint.replace(/\/+$/, "")
    this.apiKey = apiKey
  }

  private async request<T>(path: string, init: RequestInit): Promise<T> {
    const res = await fetch(`${this.endpoint}${path}`, {
      ...init,
      headers: {
        "content-type": "application/json",
        "x-api-key": this.apiKey,
        ...(init.headers ?? {}),
      },
    })

    const text = await res.text()
    const body = text ? safeJson(text) : undefined

    if (!res.ok) {
      throw new SpektrumError(`Request failed: ${res.status}`, res.status, body)
    }

    return body as T
  }

  async createProject(owner: string): Promise<CreateProjectResponse> {
    return this.request(`/planning/project`, {
      method: "POST",
      body: JSON.stringify({ owner }),
    })
  }

  async createTask(projectId: string, title: string, description: string): Promise<CreateTaskResponse> {
    return this.request(`/planning/task`, {
      method: "POST",
      body: JSON.stringify({ projectId, title, description }),
    })
  }

  async leaveComment(taskId: string, commentText: string, authorId: string): Promise<LeaveCommentResponse> {
    return this.request(`/planning/task/leave-comment`, {
      method: "POST",
      body: JSON.stringify({ taskId, commentText, authorId }),
    })
  }

  async getAppUrl(projectId: string): Promise<string> {
    const response = await this.request<{
      moduleId: string
      assetBaseUrl: string
      publicAppUrl: string
    }>(
      `/deployment/projects/${projectId}/environments/DEV/entry-point`,
      { method: "GET" }
    )
  
    return response.publicAppUrl
  }
  

  async codeAndDeploy(task: Task): Promise<void> {
    await this.request(`/ai/module/development`, {
      method: "POST",
      body: JSON.stringify({ task }),
    })
  }
  
}

function safeJson(text: string) {
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}
