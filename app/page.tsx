'use client'

import dynamic from 'next/dynamic'
import '@tldraw/tldraw/tldraw.css'
import { MakeRealButton } from './components/MakeRealButton'
import { TldrawLogo } from './components/TldrawLogo'
import { ResponseShapeUtil } from './ResponseShape/ResponseShape'
import { SignInWithAIButton } from './components/SignInWithAIButton'
import Script from 'next/script'

const Tldraw = dynamic(async () => (await import('@tldraw/tldraw')).Tldraw, {
	ssr: false,
})

const shapeUtils = [ResponseShapeUtil]

export default function App() {
	return (
		<div className="editor">
			<Script src="https://unpkg.com/@passes/polyfill@^0.1.5"/>
			
			<Tldraw
				persistenceKey="make-real"
				shareZone={<MakeRealButton />}
				shapeUtils={shapeUtils}
			>
				<TldrawLogo />
				<SignInWithAIButton />
			</Tldraw>
		</div>
	)
}
