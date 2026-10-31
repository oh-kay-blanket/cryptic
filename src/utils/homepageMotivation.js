import {
	achievements as ACHIEVEMENTS,
	ACHIEVEMENT_CATEGORIES,
	getAchievementById,
} from './achievements/achievementDefinitions'

const VOLUME_TARGETS = [
	{ id: 'volume-10', target: 10, closeThreshold: 3 },
	{ id: 'volume-50', target: 50, closeThreshold: 5 },
	{ id: 'volume-100', target: 100, closeThreshold: 10 },
	{ id: 'volume-300', target: 300, closeThreshold: 15 },
]

const DIFFICULTY_OPPORTUNITIES = {
	1: {
		id: 'skill-difficulty-1',
		label: 'easy',
	},
	2: {
		id: 'skill-difficulty-2',
		label: 'moderate',
	},
	3: {
		id: 'skill-difficulty-3',
		label: 'difficult',
	},
	4: {
		id: 'skill-difficulty-4',
		label: 'expert',
	},
}

const SKILL_CHALLENGES = [
	{
		id: 'skill-no-hints',
		cta: "Challenge: solve today's clue with 0 hints to unlock this badge",
	},
	{
		id: 'skill-first-guess',
		cta: "Challenge: nail today's clue on your first guess",
	},
	{
		id: 'skill-perfect',
		cta: 'Aim for a flawless solve today — 1 guess, 0 hints',
	},
	{
		id: 'skill-quick-thinker',
		cta: "Can you crack today's clue in under a minute?",
	},
	{
		id: 'skill-speed-demon',
		cta: "Ready for a speed run? Solve today's clue in under 30 seconds",
	},
]

const TOTAL_TYPE_ACHIEVEMENTS = ACHIEVEMENTS.filter(
	(a) => a.category === ACHIEVEMENT_CATEGORIES.TYPE
).length

/**
 * Generates an ordered list of eligible motivational prompts for a returning user
 * when they have no active streak (streak === 0).
 *
 * Each motivation object has:
 * - id: unique string identifier
 * - type: 'volume' | 'opportunity' | 'recent' | 'skill' | 'collection' | 'stats' | 'fallback'
 * - priority: number (higher = more timely/urgent)
 * - icon: AchievementIcon icon key
 * - unlocked: boolean (true = gold badge style, false = target/locked badge style)
 * - title: primary headline below the badge
 * - subtitle: secondary context line below the title
 * - cta: motivational prompt shown above the Play button
 * - tab: 'achievements' | 'stats' (which modal tab to open if badge is clicked)
 */
export const getHomepageMotivations = ({
	completedClues = [],
	achievements = {},
	longestStreak = 0,
	todayClue = null,
} = {}) => {
	const motivations = []
	const unlockedMap = achievements?.unlocked || {}
	const completedGuess = (completedClues || []).filter((c) => c.how === 'g')
	const totalSolved = completedGuess.length

	// 1. Next Volume Milestone
	const nextVolume = VOLUME_TARGETS.find(
		(v) => totalSolved < v.target && !unlockedMap[v.id]
	)
	if (nextVolume) {
		const ach = getAchievementById(nextVolume.id)
		const remaining = nextVolume.target - totalSolved
		const isClose = remaining <= nextVolume.closeThreshold

		if (ach) {
			motivations.push({
				id: `motivation-${nextVolume.id}`,
				type: 'volume',
				priority: isClose ? 3 : 2,
				icon: ach.icon,
				unlocked: false,
				title: ach.name,
				subtitle: `${totalSolved} of ${nextVolume.target} clues solved`,
				cta:
					remaining === 1
						? `Solve today's clue to unlock "${ach.name}"!`
						: `Just ${remaining} clues away from "${ach.name}"`,
				tab: 'achievements',
			})
		}
	}

	// 2. Today's Clue Difficulty Opportunity
	const todayDifficulty = Number(todayClue?.difficulty)
	const diffOpportunity = DIFFICULTY_OPPORTUNITIES[todayDifficulty]
	if (diffOpportunity && !unlockedMap[diffOpportunity.id]) {
		const ach = getAchievementById(diffOpportunity.id)
		if (ach) {
			motivations.push({
				id: `motivation-${diffOpportunity.id}`,
				type: 'opportunity',
				priority: 3,
				icon: ach.icon,
				unlocked: false,
				title: ach.name,
				subtitle: ach.description,
				cta: `Today's clue is ${diffOpportunity.label} — solve it to unlock "${ach.name}"!`,
				tab: 'achievements',
			})
		}
	}

	// 3. Recent Achievement Unlocked
	const unlockedEntries = Object.entries(unlockedMap)
		.map(([id, meta]) => ({
			id,
			unlockedAt: meta?.unlockedAt ? new Date(meta.unlockedAt).getTime() : 0,
			achievement: getAchievementById(id),
		}))
		.filter((entry) => entry.achievement)
		.sort((a, b) => {
			if (b.unlockedAt !== a.unlockedAt) return b.unlockedAt - a.unlockedAt
			// Prefer non-first-steps achievement when timestamps match (e.g. migration)
			if (a.id === 'volume-1') return 1
			if (b.id === 'volume-1') return -1
			return 0
		})

	if (unlockedEntries.length > 0) {
		const preferred =
			unlockedEntries.find((e) => e.id !== 'volume-1') || unlockedEntries[0]
		const ach = preferred.achievement
		motivations.push({
			id: `motivation-recent-${ach.id}`,
			type: 'recent',
			priority: 2,
			icon: ach.icon,
			unlocked: true,
			title: ach.name,
			subtitle: `Unlocked · ${ach.description}`,
			cta: 'Keep building your collection with today’s clue',
			tab: 'achievements',
		})
	}

	// 4. Unclaimed Skill Challenges
	const nextSkillChallenge = SKILL_CHALLENGES.find(
		(s) => !unlockedMap[s.id]
	)
	if (nextSkillChallenge) {
		const ach = getAchievementById(nextSkillChallenge.id)
		if (ach) {
			motivations.push({
				id: `motivation-${ach.id}`,
				type: 'skill',
				priority: 2,
				icon: ach.icon,
				unlocked: false,
				title: ach.name,
				subtitle: ach.description,
				cta: nextSkillChallenge.cta,
				tab: 'achievements',
			})
		}
	}

	// 5. Clue Type Collection Progress (without spoiling today's clue type)
	const unlockedTypeCount = ACHIEVEMENTS.filter(
		(a) =>
			a.category === ACHIEVEMENT_CATEGORIES.TYPE && Boolean(unlockedMap[a.id])
	).length

	if (unlockedTypeCount > 0 && unlockedTypeCount < TOTAL_TYPE_ACHIEVEMENTS) {
		const remainingTypes = TOTAL_TYPE_ACHIEVEMENTS - unlockedTypeCount
		motivations.push({
			id: 'motivation-type-collection',
			type: 'collection',
			priority: unlockedTypeCount >= 10 ? 3 : 2,
			icon: 'brain',
			unlocked: true,
			title: `${unlockedTypeCount} of ${TOTAL_TYPE_ACHIEVEMENTS} Clue Types`,
			subtitle: 'Wordplay types mastered so far',
			cta:
				remainingTypes === 1
					? 'Just 1 clue type left to complete your collection!'
					: "Play today's clue to keep expanding your repertoire",
			tab: 'achievements',
		})
	}

	// 6. Personal Best / Stats Callouts
	const perfectSolves = completedGuess.filter(
		(c) => c.hints === 0 && c.guesses === 1
	).length
	const solveTimes = completedGuess
		.map((c) => c.solveTime)
		.filter((t) => typeof t === 'number' && t > 0)
	const fastestTime =
		solveTimes.length > 0 ? Math.min(...solveTimes) : null

	if (perfectSolves >= 2) {
		motivations.push({
			id: 'motivation-stat-perfect',
			type: 'stats',
			priority: 2,
			icon: 'star',
			unlocked: true,
			title: `${perfectSolves} Perfect Solves`,
			subtitle: 'Solved on first guess with 0 hints',
			cta: 'Can you add another flawless solve today?',
			tab: 'stats',
		})
	} else if (fastestTime !== null && fastestTime <= 90) {
		motivations.push({
			id: 'motivation-stat-speed',
			type: 'stats',
			priority: 2,
			icon: 'lightning',
			unlocked: true,
			title: `${fastestTime}s Personal Best`,
			subtitle: 'Your fastest cryptic solve so far',
			cta: "See if you can beat your record on today's clue",
			tab: 'stats',
		})
	} else if (longestStreak >= 3) {
		motivations.push({
			id: 'motivation-stat-best-streak',
			type: 'stats',
			priority: 2,
			icon: 'streak',
			unlocked: true,
			title: `${longestStreak}-Day Best Streak`,
			subtitle: `${totalSolved} ${totalSolved === 1 ? 'clue' : 'clues'} solved overall`,
			cta: 'Every great run starts with day one',
			tab: 'stats',
		})
	}

	// Fallback if somehow no specific motivation matched
	if (motivations.length === 0) {
		motivations.push({
			id: 'motivation-fallback',
			type: 'fallback',
			priority: 1,
			icon: 'clue',
			unlocked: true,
			title: `${totalSolved || 1} ${totalSolved === 1 ? 'Clue' : 'Clues'} Solved`,
			subtitle: 'Welcome back to Learn Cryptic',
			cta: "Ready for today's cryptic challenge?",
			tab: 'stats',
		})
	}

	return motivations.sort((a, b) => b.priority - a.priority)
}

/**
 * Selects a single motivation to feature on the homepage.
 * Prioritizes top-priority items (e.g., 1-2 clues away from a milestone or a matching
 * difficulty opportunity on today's clue), and rotates deterministically across
 * items using a seed (such as today's clid + totalSolved).
 */
export const selectHomepageMotivation = (context = {}, seed = null) => {
	const motivations = getHomepageMotivations(context)
	const highestPriority = motivations[0].priority
	const topPool = motivations.filter((m) => m.priority === highestPriority)

	const completedGuessCount = (context.completedClues || []).filter(
		(c) => c.how === 'g'
	).length
	const clidNum = Number(context.todayClue?.clid) || 0
	const effectiveSeed =
		typeof seed === 'number' ? Math.abs(seed) : clidNum + completedGuessCount

	return topPool[effectiveSeed % topPool.length]
}

