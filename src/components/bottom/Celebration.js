import React, { useEffect, useState } from 'react'

const Celebration = () => {
	const [particles, setParticles] = useState([])
	const [origin, setOrigin] = useState({ x: 50, y: 50 })

	useEffect(() => {
		// Find the solution box and get its center position
		const solBox = document.getElementById('solSectionRef')
		if (solBox) {
			const rect = solBox.getBoundingClientRect()
			const centerX = ((rect.left + rect.width / 2) / window.innerWidth) * 100
			const centerY = ((rect.top + rect.height / 2) / window.innerHeight) * 100
			setOrigin({ x: centerX, y: centerY })
		}

		// Generate particles that explode outward then fall with gravity
		// Scale down velocity on wider screens so desktop matches mobile feel
		const viewportWidth = window.innerWidth
		const velocityScale = viewportWidth > 768 ? 600 / viewportWidth : 1

		const newParticles = Array.from({ length: 100 }, (_, i) => {
			// Even spread across the upper hemisphere (180-360 degrees)
			const angle = 180 + Math.random() * 180
			const angleRad = angle * (Math.PI / 180)

			// Random velocity (how far the initial burst goes)
			const velocity = (20 + Math.random() * 35) * velocityScale

			// Horizontal movement
			const endX = Math.cos(angleRad) * velocity * 1.0

			// Initial vertical burst - reduce on mobile since viewport height is smaller
			const verticalScale = viewportWidth > 768 ? 1.0 : 0.7
			const burstY = Math.sin(angleRad) * velocity * verticalScale

			// Gravity pulls everything down - adds to final Y position
			const gravity = 40 + Math.random() * 30

			return {
				id: i,
				endX,
				burstY,
				gravity,
				delay: Math.random() * 0.08,
				duration: 1.4 + Math.random() * 0.5,
				size: 5 + Math.random() * 10,
				color: Math.random() > 0.5 ? 'primary' : 'secondary',
				rotation: 60 + Math.random() * 150, // ~1/4 to 1/2 turn (60-210 degrees)
			}
		})
		setParticles(newParticles)

		// Cleanup after animation completes
		const timeout = setTimeout(() => {
			setParticles([])
		}, 2800)

		return () => clearTimeout(timeout)
	}, [])

	if (particles.length === 0) return null

	return (
		<div className="celebration" aria-hidden="true">
			{particles.map((particle) => (
				<div
					key={particle.id}
					className={`celebration-particle celebration-particle--${particle.color}`}
					style={{
						left: `${origin.x}%`,
						top: `${origin.y}%`,
						'--end-x': `${particle.endX}vw`,
						'--burst-y': `${particle.burstY}vh`,
						'--gravity': `${particle.gravity}vh`,
						'--rotation': `${particle.rotation}deg`,
						animationDelay: `${particle.delay}s`,
						animationDuration: `${particle.duration}s`,
						width: `${particle.size}px`,
						height: `${particle.size}px`,
					}}
				/>
			))}
		</div>
	)
}

export default Celebration
