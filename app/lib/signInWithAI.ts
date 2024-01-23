import { requestOpenAIAPI } from '@genesis-xyz/ai'

const STORAGE_KEYS = {
	baseURL: 'makeitreal_ai_base_url',
	apiKey: 'makeitreal_ai_api_key',
}

export function getIsSignedIn() {
	const { baseURL, apiKey } = getOpenAIAPI()

	return !!baseURL && !!apiKey
}

export function getOpenAIAPI() {
	const baseURL = localStorage.getItem(STORAGE_KEYS.baseURL)
	const apiKey = localStorage.getItem(STORAGE_KEYS.apiKey)

	if (!baseURL || !apiKey) {
		return {}
	}

	return {
		baseURL,
		apiKey,
	}
}

export async function signInWithAI() {
	const { baseURL, apiKey } = await requestOpenAIAPI()

	localStorage.setItem(STORAGE_KEYS.baseURL, baseURL)
	localStorage.setItem(STORAGE_KEYS.apiKey, apiKey)
}

export function signOutFromAI() {
	localStorage.removeItem(STORAGE_KEYS.baseURL)
	localStorage.removeItem(STORAGE_KEYS.apiKey)
}
