export declare namespace Chat {
	interface Chat {
		dateTime: string;
		text: string;
		requestOptions: {
			prompt: string;
			options?: ConversationRequest | null;
		};
		inversion?: boolean;
		error?: boolean;
		loading?: boolean;
		model?: string;
		mjID?: string;
		uuid?: number;
		index?: number;
		myid?: string;
		logo?: string;
		
		opt?: {
			imageUrl?: string;
			status?: string;
			images?: string[];
			promptEn?: string;
			buttons?: any[];
			action?: string;
			progress?: string;
			seed?: number;
			duration?: number;
			lkey?: string;
		};
	}

	interface History {
		title: string;
		isEdit: boolean;
		uuid: number;
	}

	export interface ChatState {
		active: number | null;
		usingContext: boolean;
		history: History[];
		chat: { uuid: number; data: Chat[] }[];
	}

	interface ConversationRequest {
		conversationId?: string;
		parentMessageId?: string;
	}

	export interface ConversationResponse {
		conversationId: string;
		parentMessageId: string;
		role: string;
		text: string;
		detail: {
			choices: Array<{
				finish_reason: string;
				index: number;
				text: string;
			}>;
			usage: {
				completion_tokens: number;
				prompt_tokens: number;
				total_tokens: number;
			};
		};
	}
}
