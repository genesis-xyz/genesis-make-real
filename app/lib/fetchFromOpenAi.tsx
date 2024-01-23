export async function fetchFromOpenAi(
	baseURL: string | undefined,
	apiKey: string | undefined,
	body: GPT4VCompletionRequest
): Promise<GPT4VCompletionResponse> {


	if (!apiKey || !baseURL) {
		throw new Error(
			'You need to provide an API key. Click "Sign In With AI" to add your key.'
		)
	}

	try {
		const repsonse = await fetch(`${baseURL}/chat/completions`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify(body),
		})

		return await repsonse.json()
	} catch (e) {
		console.error(e)
		throw new Error('Sorry, there was an error fetching from OpenAI')
	}
}

export type MessageContent =
	| string
	| (
			| string
			| {
					type: 'image_url'
					image_url:
						| string
						| {
								url: string
								detail: 'low' | 'high' | 'auto'
						  }
			  }
			| {
					type: 'text'
					text: string
			  }
	  )[]

export type GPT4VMessage = {
	role: 'system' | 'user' | 'assistant' | 'function'
	content: MessageContent
	name?: string | undefined
}

export type GPT4VCompletionRequest = {
	model: 'gpt-4-vision-preview'
	messages: GPT4VMessage[]
	functions?: unknown[] | undefined
	function_call?: unknown | undefined
	stream?: boolean | undefined
	temperature?: number | undefined
	top_p?: number | undefined
	max_tokens?: number | undefined
	n?: number | undefined
	best_of?: number | undefined
	frequency_penalty?: number | undefined
	presence_penalty?: number | undefined
	logit_bias?:
		| {
				[x: string]: number
		  }
		| undefined
	stop?: (string[] | string) | undefined
}

export type GPT4VCompletionResponse =
	| {
			error: undefined
			model: string
			choices: {
				message: { content: string }
			}[]
	  }
	| {
			error: {
				code: number
				message: string
				status: number
			}
	  }
