export type Answer = Array<{
  id: string;
  label: string;
  text: string;
  correct: boolean;
}>;

export type Question = {
  id: string;
  text: string;
  answer: Answer;
};

export interface Quiz {
  id: string;
  img: string;
  race: string;
  questions: Array<Question>;
}
