import {
	getHomepageMotivations,
	selectHomepageMotivation,
} from '../homepageMotivation'

const makeClues = (count, overrides = {}) =>
	Array.from({ length: count }, (_, i) => ({
		clid: 500 + i,
		how: 'g',
		guesses: 2,
		hints: 1,
		solveTime: 120,
		difficulty: '1',
		...overrides,
	}))

describe('homepageMotivation', () => {
	describe('getHomepageMotivations', () => {
		it('includes Next Volume Milestone with higher priority when close to target', () => {
			const motivationsClose = getHomepageMotivations({
				completedClues: makeClues(8), // 2 away from volume-10
				achievements: { unlocked: { 'volume-1': { unlockedAt: '2026-01-01' } } },
				todayClue: { clid: 722, difficulty: '1' },
			})

			const volItem = motivationsClose.find((m) => m.type === 'volume')
			expect(volItem).toBeDefined()
			expect(volItem.title).toBe('Getting the Hang of It')
			expect(volItem.subtitle).toBe('8 of 10 clues solved')
			expect(volItem.cta).toContain('Just 2 clues away')
			expect(volItem.priority).toBe(3)
			expect(volItem.unlocked).toBe(false)
		})

		it('uses singular CTA when 1 clue away from volume milestone', () => {
			const motivations = getHomepageMotivations({
				completedClues: makeClues(9), // 1 away from volume-10
				achievements: { unlocked: { 'volume-1': { unlockedAt: '2026-01-01' } } },
			})

			const volItem = motivations.find((m) => m.type === 'volume')
			expect(volItem.cta).toBe(
				'Solve today\'s clue to unlock "Getting the Hang of It"!'
			)
		})

		it('includes Today Clue Difficulty Opportunity when user has not unlocked that difficulty', () => {
			const motivations = getHomepageMotivations({
				completedClues: makeClues(3),
				achievements: {
					unlocked: {
						'volume-1': { unlockedAt: '2026-01-01' },
						'skill-difficulty-1': { unlockedAt: '2026-01-01' },
					},
				},
				todayClue: { clid: 722, difficulty: '3' },
			})

			const opp = motivations.find((m) => m.type === 'opportunity')
			expect(opp).toBeDefined()
			expect(opp.id).toBe('motivation-skill-difficulty-3')
			expect(opp.title).toBe('Challenge Accepted')
			expect(opp.cta).toContain("Today's clue is difficult")
			expect(opp.priority).toBe(3)
		})

		it('omits Today Clue Difficulty Opportunity when already unlocked', () => {
			const motivations = getHomepageMotivations({
				completedClues: makeClues(3),
				achievements: {
					unlocked: {
						'skill-difficulty-2': { unlockedAt: '2026-01-01' },
					},
				},
				todayClue: { clid: 722, difficulty: '2' },
			})

			const opp = motivations.find((m) => m.type === 'opportunity')
			expect(opp).toBeUndefined()
		})

		it('includes Recent Achievement Unlocked and prefers non-volume-1 badges', () => {
			const motivations = getHomepageMotivations({
				completedClues: makeClues(5),
				achievements: {
					unlocked: {
						'volume-1': { unlockedAt: '2026-01-05T10:00:00Z' },
						'type-anagram': { unlockedAt: '2026-01-04T10:00:00Z' },
					},
				},
			})

			const recent = motivations.find((m) => m.type === 'recent')
			expect(recent).toBeDefined()
			expect(recent.title).toBe('Anagram Ace')
			expect(recent.unlocked).toBe(true)
			expect(recent.subtitle).toContain('Unlocked · Solve your first anagram')
		})

		it('includes Unclaimed Skill Challenge for next locked skill badge', () => {
			const motivations = getHomepageMotivations({
				completedClues: makeClues(4),
				achievements: {
					unlocked: {
						'skill-no-hints': { unlockedAt: '2026-01-01' },
					},
				},
			})

			const skill = motivations.find((m) => m.type === 'skill')
			expect(skill).toBeDefined()
			expect(skill.id).toBe('motivation-skill-first-guess')
			expect(skill.title).toBe('First Try')
			expect(skill.unlocked).toBe(false)
		})

		it('includes Clue Type Collection Progress without spoiling today clue type', () => {
			const motivations = getHomepageMotivations({
				completedClues: makeClues(6),
				achievements: {
					unlocked: {
						'type-anagram': { unlockedAt: '2026-01-01' },
						'type-charade': { unlockedAt: '2026-01-02' },
						'type-container': { unlockedAt: '2026-01-03' },
					},
				},
				todayClue: { clid: 722, type: 'hidden' },
			})

			const collection = motivations.find((m) => m.type === 'collection')
			expect(collection).toBeDefined()
			expect(collection.title).toBe('3 of 13 Clue Types')
			expect(collection.unlocked).toBe(true)
			expect(collection.cta).not.toContain('hidden')
		})

		it('includes Personal Best / Stats Callouts for perfect solves, speed, or longest streak', () => {
			const motivationsPerfect = getHomepageMotivations({
				completedClues: makeClues(3, { hints: 0, guesses: 1 }),
				achievements: { unlocked: {} },
			})
			const statPerfect = motivationsPerfect.find((m) => m.type === 'stats')
			expect(statPerfect).toBeDefined()
			expect(statPerfect.title).toBe('3 Perfect Solves')
			expect(statPerfect.tab).toBe('stats')

			const motivationsSpeed = getHomepageMotivations({
				completedClues: makeClues(2, { hints: 1, guesses: 2, solveTime: 42 }),
				achievements: { unlocked: {} },
			})
			const statSpeed = motivationsSpeed.find((m) => m.type === 'stats')
			expect(statSpeed).toBeDefined()
			expect(statSpeed.title).toBe('42s Personal Best')

			const motivationsStreak = getHomepageMotivations({
				completedClues: makeClues(2, { hints: 1, guesses: 2, solveTime: 180 }),
				longestStreak: 6,
				achievements: { unlocked: {} },
			})
			const statStreak = motivationsStreak.find((m) => m.type === 'stats')
			expect(statStreak).toBeDefined()
			expect(statStreak.title).toBe('6-Day Best Streak')
		})
	})

	describe('selectHomepageMotivation', () => {
		it('rotates deterministically across top-priority motivations using seed', () => {
			const context = {
				completedClues: makeClues(4, { hints: 0, guesses: 1 }),
				achievements: {
					unlocked: {
						'type-anagram': { unlockedAt: '2026-01-01' },
						'skill-difficulty-2': { unlockedAt: '2026-01-01' },
					},
				},
				todayClue: { clid: 722, difficulty: '2' },
			}

			const first = selectHomepageMotivation(context, 0)
			const second = selectHomepageMotivation(context, 1)
			const firstAgain = selectHomepageMotivation(context, 0)

			expect(first).toEqual(firstAgain)
			expect(first.id).not.toBe(second.id)
		})
	})
})
