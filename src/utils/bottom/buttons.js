// buttons
const buttons = {
	showHint: {
		name:'Show hint',
		style: 'secondary',
		onClick: function() {
			activeClue.stats.hints++
			console.log(activeClue.stats)
			setCheckAns(false)
			setShowMessage(true)
		}
	},
	revealSolution: { 
		name:'Reveal solution', 
		style: 'primary', 
		onClick: function() {
			setShowMessage(true)
			setInput([])
		} 
	},
	checkAnswer: { 
		name:'Check answer', 
		style: 'primary', 
		onClick: function() {
			activeClue.stats.guesses++
			console.log(activeClue.stats)
			setCheckAns(true)
			setShowMessage(true)
		} 
	}
}

export default buttons