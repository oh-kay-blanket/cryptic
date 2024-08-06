
const solveAnagramOld = () => {
	// OLD JS


	// // anagrams
	// const W1 = 'Tom Marvolo Riddle';
	// const W2 = 'I am Lord Voldemort';

	// // containers
	const wordContainer1 = $(`.w1`);
	const wordContainer2 = $(`.w2`);

	// // wrap letters in span
	// for(const letter of W1) {
	// 	wordContainer1.append(`<span class='letter'>${letter}</span>`);
	// }
	
	// for(const letter of W2) {
	// 	wordContainer2.append(`<span class='letter'>${letter}</span>`);
	// }

	// find object function
	function findObjectInArray(array, key, val) {
		for(let i = 0; i < array.length; i++)
			if(array[i][key].toLowerCase() === val.toLowerCase())
				return i;
		return null;
	}

	// animate function
	function animate(elem, options, duration = 500) {
		let first = Object.assign({}, options);
		first.top *= rand(100, 103) / 100;
		first.left *= rand(100, 103) / 100;
		elem.animate(first, duration, function() {
			elem.animate(options, duration / 1.5)
		});
	}
	
	// random function
	function rand(min = 0, max = 100) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	// rearrange function
	function rearrange(w1, w2) {
		
		// set up position arrays
		let p1 = [];
		let p2 = [];
		
		// get y diff (when all on same line)
		const yDiff = w2.position().top - w1.position().top;
		console.log(yDiff);
		
		// populate p1 array
		for(let letter of w1.children()) {
			if(!letter.textContent.trim())
				continue;
			letter = $(letter);
			p1.push(Object.assign({}, letter.position(), {
				name: letter.text(),
				element: letter
			}));
		}

		// populate p2 array
		for(let letter of w2.children()) {
			letter = $(letter);
			p2.push(Object.assign({}, letter.position(), {
				name: letter.text(),
				element: letter
			}));
		}

		// set w1 realtive and fixed height
		w1.css({
			position: 'relative',
			height: w1.height()
		});

		// set p1 letters absolute and to current position
		for(letter of p1) {
			letter.element.css({
				position: 'absolute',
				left: letter.left,
				top: letter.top
			});
		}
		
		// animate p1 letters to p2 positions
		for(const l1 of p1) {
			const l2Index = findObjectInArray(p2, 'name', l1.name);
			const l2 = p2.splice(l2Index, 1)[0];
			console.log(l2)
			setTimeout(
				animate.bind(null, l1.element, {
					top: l2.top + yDiff,
					left: l2.left
				}),
				rand(100, 1000)
			);
		}
	}

	showBtn.on('click', rearrange.bind(null, wordContainer1, wordContainer2));
}