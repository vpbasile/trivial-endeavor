export type categoryTag = string
export type player = {index:number,name:string,correctCategories:string[]}
export type category = { key: string, queryTag: categoryTag, title: string, cssClass: string }
export type fixMeLater = any
export type phaseDefinition = {key:string, title:string, index:number}
export type whatsHappening = { currentPhase: phaseDefinition, currentPlayerIndex: number }
export type choices = [string, string, string, string] | [null, null, null, null]
export type question = {
  questionText: string | null, choices: choices,
  correctAnswer: string | null,
  correctIndex: number,
  categoryTag: categoryTag,
  guessEntered: number
}