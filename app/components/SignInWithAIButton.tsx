'use client';

import { Icon, useBreakpoint, useEditor, useValue } from '@tldraw/tldraw'
import { useCallback, useState } from 'react'
import { getIsSignedIn, signInWithAI, signOutFromAI } from '../lib/signInWithAI'

export function SignInWithAIButton() {
	const breakpoint = useBreakpoint()
	const [isSignedIn, setIsSignedIn] = useState(getIsSignedIn())

	const editor = useEditor()
	const isFocusMode = useValue('is focus mode', () => editor.getInstanceState().isFocusMode, [
		editor,
	])

	// Sign In With AI
	const handleSignIn = useCallback(async () => {
		try {
			await signInWithAI()

			setIsSignedIn(getIsSignedIn())
		} catch (e) {
			console.log({ error: e })
			alert('The request was not accepted')
		}
	}, [])

	const handleSignOut = useCallback(() => {
		signOutFromAI()

		setIsSignedIn(getIsSignedIn())
	}, [])


	if (isFocusMode) return null

	return (
		<div className={`your-own-api-key ${breakpoint < 6 ? 'your-own-api-key__mobile' : ''}`}>
			<div className="your-own-api-key__inner">
				<div className="input__wrapper">
					{isSignedIn ? (
						<button onClick={handleSignOut}>Sign Out</button>
					) : (
						<button onClick={handleSignIn}>Sign In With AI</button>
					)}
				</div>
				<a
					className="question__button"
					target="_blank"
					href="https://tldraw.notion.site/Make-Real-FAQs-93be8b5273d14f7386e14eb142575e6e?pvs=4"
				>
					<Icon icon="question" />
				</a>
			</div>
		</div>
	)
}
