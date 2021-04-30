export class Question {
  constructor(
    public quest: string,
    public variantOne: string,
    public variantTwo: string,
    public scoreWin: number,
    public scoreLoss: number,
    public rightVariant: number
  ) {
  }
}

export const quests = [
  new Question(
    'ТЫ КТО 1 ?',
    'АЛЕГКasdasdasd',
    'МАКСИКasdasdasd',
    100,
    100,
    2
  ),
  new Question(
    'ТЫ КТО 2 ?',
    'АЛЕГК',
    'МАКСИК',
    100,
    100,
    2
  ),
  new Question(
    'ТЫ КТО 3 ?',
    'АЛЕГК',
    'МАКСИК',
    100,
    100,
    2
  ),
  new Question(
    'Последний вопрос... Хочешь я пукну?',
    'ДА',
    'НЕТ',
    0,
    0,
    0
  )
];
