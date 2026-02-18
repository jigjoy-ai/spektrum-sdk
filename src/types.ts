export type SpektrumSDKOptions = {
	apiKey?: string
	endpoint?: string
}

export type CreateProjectResponse = {
	id: string
	owner: string
	name?: string
	description?: string
}

export enum ActivityType {
	COMMENT_LEFT = "COMMENT_LEFT",
	DESCRIPTION_UPDATED = "DESCRIPTION_UPDATED",
	FINISHED_WORK = "FINISHED_WORK",
	STARTED_WORK = "STARTED_WORK",
	TASK_CREATED = "TASK_CREATED",
	TITLE_UPDATED = "TITLE_UPDATED",
}

export type CommentLeftMetadata = {
	authorId: string
	commentText: string
}

export type CommentLeftActivity = {
	id: string
	type: ActivityType.COMMENT_LEFT
	projectId: string
	taskId: string
	userId: string
	occurredAt: string
	metadata: CommentLeftMetadata
}

export type DescriptionUpdatedMetadata = {
	message: string
	oldDescription: string
	newDescription: string
}

export type DescriptionUpdatedActivity = {
	id: string
	type: ActivityType.DESCRIPTION_UPDATED
	projectId: string
	taskId: string
	userId: string
	occurredAt: string
	metadata: DescriptionUpdatedMetadata
}

export type FinishedWorkMetadata = {
	workerId: string
	message: string
}

export type FinishedWorkActivity = {
	id: string
	type: ActivityType.FINISHED_WORK
	projectId: string
	taskId: string
	userId: string
	occurredAt: string
	metadata: FinishedWorkMetadata
}

export type StartedWorkMetadata = {
	workerId: string
	message: string
}

export type StartedWorkActivity = {
	id: string
	type: ActivityType.STARTED_WORK
	projectId: string
	taskId: string
	userId: string
	occurredAt: string
	metadata: StartedWorkMetadata
}

export type TaskCreatedMetadata = {
	message: string
	title: string
	description: string
}

export type TaskCreatedActivity = {
	id: string
	type: ActivityType.TASK_CREATED
	projectId: string
	taskId: string
	userId: string
	occurredAt: string
	metadata: TaskCreatedMetadata
}

export type TitleUpdatedMetadata = {
	message: string
	oldTitle: string
	newTitle: string
}

export type TitleUpdatedActivity = {
	id: string
	type: ActivityType.TITLE_UPDATED
	projectId: string
	taskId: string
	userId: string
	occurredAt: string
	metadata: TitleUpdatedMetadata
}

export type ActivityMetadata =
	| CommentLeftMetadata
	| DescriptionUpdatedMetadata
	| FinishedWorkMetadata
	| StartedWorkMetadata
	| TaskCreatedMetadata
	| TitleUpdatedMetadata

export type Activity =
	| CommentLeftActivity
	| DescriptionUpdatedActivity
	| FinishedWorkActivity
	| StartedWorkActivity
	| TaskCreatedActivity
	| TitleUpdatedActivity

export enum TaskStatus {
	TODO = "Todo",
	WORK_IN_PROGRESS = "Work in progress",
	DONE = "Done",
}

export type Task = {
	id: string
	title: string
	description: string
	projectId: string
	created: string
	updated: string | null
	status: TaskStatus
	activities: Activity[]
}

export type CreateTaskResponse = Task
export type LeaveCommentResponse = Task
