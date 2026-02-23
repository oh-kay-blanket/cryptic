import React, { useEffect, useRef } from 'react'
import getMessage from '../utils/bottom/getMessage'

const HintTooltip = ({ hint, position, onDismiss }) => {
	const tooltipRef = useRef(null)
	const arrowRef = useRef(null)

	// Calculate clamped position to keep tooltip within viewport
	useEffect(() => {
		if (tooltipRef.current && arrowRef.current && position) {
			const rect = tooltipRef.current.getBoundingClientRect()
			const viewportWidth = window.innerWidth
			const padding = 16

			// Calculate where the tooltip would ideally be centered
			const idealLeft = position.x

			// Adjust horizontal position if tooltip would overflow
			let adjustedLeft = idealLeft
			if (rect.left < padding) {
				adjustedLeft = padding + rect.width / 2
			} else if (rect.right > viewportWidth - padding) {
				adjustedLeft = viewportWidth - padding - rect.width / 2
			}

			// Calculate how much the tooltip shifted
			const shift = adjustedLeft - idealLeft

			if (shift !== 0) {
				tooltipRef.current.style.left = `${adjustedLeft}px`
				// Move arrow in opposite direction to point at original position
				// Arrow is at 50% by default, so we offset it by the shift amount
				const arrowOffset = 50 - (shift / rect.width) * 100
				// Clamp arrow position to stay within tooltip bounds
				const clampedOffset = Math.max(10, Math.min(90, arrowOffset))
				arrowRef.current.style.left = `${clampedOffset}%`
			} else {
				// Reset arrow to center if no shift needed
				arrowRef.current.style.left = '50%'
			}
		}
	}, [position])

	if (!hint || !position) return null

	const message = getMessage(hint)
	const explainer = hint.explainer || null

	return (
		<div
			ref={tooltipRef}
			className="hint-tooltip"
			style={{
				position: 'fixed',
				top: position.y - 12,
				left: position.x,
				transform: 'translate(-50%, -100%)',
				zIndex: 100,
			}}
			onClick={(e) => e.stopPropagation()}
		>
			<div className="hint-tooltip-content">
				{message && <div className="hint-tooltip-message">{message}</div>}
				{explainer && <div className="hint-tooltip-explainer">{explainer}</div>}
			</div>
			<div ref={arrowRef} className="hint-tooltip-arrow" />
		</div>
	)
}

export default HintTooltip
