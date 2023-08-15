export type categoryTag = string

export type winners = number;
export type player = { index: number, name: string, correctCategories: string[], wonPlace: winners }
export type category = { key: string, queryTag: categoryTag, title: string, cssClass: string }
export type phaseDefinition = { key: string, title: string, index: number }
export type whatsHappening = { currentPhase: phaseDefinition, currentPlayerIndex: number }
export type choices = string[]
export type questionInternal = {
  questionText: string | null, choices: choices,
  correctAnswer: string | null,
  correctIndex: number,
  categoryTag: categoryTag,
  guessEntered: number
}

// {
//   questionText: string;
//   choices: (string | undefined)[];
//   correctAnswer: string;
//   correctIndex: number;
//   categoryTag: string;
// }