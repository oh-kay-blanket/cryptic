import React, { useLayoutEffect, useRef, useState } from 'react'
import getMessage from '../utils/bottom/getMessage'

const HintTooltip = ({ hint, position, onDismiss }) => {
	const tooltipRef = useRef(null)
	// Phase 1: measuring (null), Phase 2: positioned (object with left/arrowLeft)
	const [layout, setLayout] = useState(null)

	const placement = position?.placement || 'above'
	const isBelow = placement === 'below'

	// Calculate clamped position to keep tooltip within viewport
	// useLayoutEffect runs synchronously before paint to avoid flicker
	useLayoutEffect(() => {
		// Reset layout when position changes to re-measure
		setLayout(null)
	}, [position])

	useLayoutEffect(() => {
		if (!tooltipRef.current || !position) return

		// If layout is null, we're in measuring phase
		if (layout === null) {
			const rect = tooltipRef.current.getBoundingClientRect()
			const viewportWidth = window.innerWidth
			const padding = 16
			const tooltipWidth = rect.width

			// Calculate where tooltip left edge should be (centered on position.x)
			let leftEdge = position.x - tooltipWidth / 2

			// Clamp to viewport bounds
			if (leftEdge < padding) {
				leftEdge = padding
			} else if (leftEdge + tooltipWidth > viewportWidth - padding) {
				leftEdge = viewportWidth - padding - tooltipWidth
			}

			// Calculate arrow position (where position.x falls within the tooltip)
			const arrowPosition = position.x - leftEdge
			const arrowPercent = (arrowPosition / tooltipWidth) * 100
			// Clamp arrow to stay within tooltip bounds
			const clampedArrowPercent = Math.max(10, Math.min(90, arrowPercent))

			setLayout({
				left: leftEdge,
				arrowLeft: `${clampedArrowPercent}%`,
			})
		}
	}, [position, layout])

	if (!hint || !position) return null

	const message = getMessage(hint)
	const explainer = hint.explainer || null

	// Measuring phase: render off-screen to get natural width
	if (layout === null) {
		return (
			<div
				ref={tooltipRef}
				className="hint-tooltip"
				style={{
					position: 'fixed',
					top: position.y,
					left: 16,
					transform: 'translateY(-100%)',
					zIndex: 100,
					visibility: 'hidden',
				}}
			>
				<div className="hint-tooltip-content">
					{message && <div className="hint-tooltip-message">{message}</div>}
					{explainer && <div className="hint-tooltip-explainer">{explainer}</div>}
				</div>
				<div className="hint-tooltip-arrow" />
			</div>
		)
	}

	// Positioned phase: render at calculated position
	const tooltipClass = isBelow ? 'hint-tooltip hint-tooltip--below' : 'hint-tooltip'
	const arrowClass = isBelow ? 'hint-tooltip-arrow hint-tooltip-arrow--top' : 'hint-tooltip-arrow'

	return (
		<div
			ref={tooltipRef}
			className={tooltipClass}
			style={{
				position: 'fixed',
				top: isBelow ? position.y + 12 : position.y - 12,
				left: layout.left,
				transform: isBelow ? 'none' : 'translateY(-100%)',
				zIndex: 100,
			}}
			onClick={(e) => e.stopPropagation()}
		>
			<div className="hint-tooltip-content">
				{message && <div className="hint-tooltip-message">{message}</div>}
				{explainer && <div className="hint-tooltip-explainer">{explainer}</div>}
			</div>
			<div
				className={arrowClass}
				style={{ left: layout.arrowLeft }}
			/>
		</div>
	)
}

export default HintTooltip
