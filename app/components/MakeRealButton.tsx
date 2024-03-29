import { useEditor, useToasts } from '@tldraw/tldraw'
import { useCallback } from 'react'
import { makeReal } from '../lib/makeReal'
import { getOpenAIAPI } from '../lib/signInWithAI'

export function MakeRealButton() {
	const editor = useEditor()
	const { addToast } = useToasts()

	const handleClick = useCallback(async () => {
		const { baseURL, apiKey } = getOpenAIAPI()

		try {
			await makeReal(editor, baseURL!, apiKey!)
		} catch (e) {
			console.error(e)
			addToast({
				icon: 'cross-2',
				title: 'Something went wrong',
				description: (e as Error).message.slice(0, 100),
			})
		}
	}, [editor, addToast])

	return (
		<button className="makeRealButton" onClick={handleClick}>
			Make Real
		</button>
	)
}
