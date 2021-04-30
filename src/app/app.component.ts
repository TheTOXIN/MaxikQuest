import {Component} from '@angular/core';
import {Question, quests} from './Question';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('bouncedState', [
      transition('* => *', [
        style({transform: 'scale(1)'}),
        animate(200, keyframes([
          style({transform: 'scale(1)', offset: 0}),
          style({transform: 'scale(1.5)', offset: 0.5}),
          style({transform: 'scale(1)', offset: 1})
        ]))
      ])
    ]),
    trigger('counterState', [
      transition('* => *', [
        style({opacity: 0}),
        animate(300, style({transform: 'translateY(50px)', opacity: 0.5})),
        animate(500, style({opacity: 1})),
        animate(100, style({transform: 'translateY(100px)', opacity: 0}))
      ])
    ]),
    trigger('moveRightState', [
      transition('* => *', [
        style({transform: 'translateX(-100%)'}),
        animate('300ms ease-in', style({transform: 'translateX(0%)'}))
      ])
    ]),
    trigger('moveLeftState', [
      transition('* => *', [
        style({transform: 'translateX(100%)'}),
        animate('300ms ease-in', style({transform: 'translateX(0%)'}))
      ])
    ])
  ]
})
export class AppComponent {

  public state = 'START';

  public quest: Question;
  public questIndex = 0;
  public questCount = quests.length;

  public score = 0;
  public winScore = 0;

  public scoreBonus = '';
  public scoreState = 'default';
  public scoreColor = 'black';

  public pointStart = 1;
  public startCounter = this.pointStart;

  public resultText = '';
  public resultImage = '';
  public resultSound = null;
  public showResult = false;
  public counterGift = 0;

  public imageLoadOne = true;
  public imageLoadTwo = true;

  private winSound = new Audio();
  private looseSound = new Audio();

  private winSoundResult = new Audio();
  private looseSoundResult = new Audio();

  constructor() {
    this.loadAudio();
    this.initScore();
  }

  public loadAudio(): void {
    this.winSound.src = '../../../assets/sfx-5.mp3';
    this.winSound.load();

    this.looseSound.src = '../../../assets/sfx-8.mp3';
    this.looseSound.load();

    this.winSoundResult.src = '../../../assets/win.mp3';
    this.winSoundResult.load();

    this.looseSoundResult.src = '../../../assets/loose.mp3';
    this.looseSoundResult.load();
  }

  public initScore(): void {
    let sum = 0;

    quests.forEach((q) => {
      const score = Math.max(q.scoreOne, q.scoreTwo);
      sum += score;
    });

    this.winScore = sum;
  }

  public plusStartCounter(): void {
    this.startCounter--;
    if (this.startCounter <= 0) {
      this.startQuest();
    }
  }

  public startQuest(): void {
    this.nextQuest();
    this.winSound.play();
    this.state = 'MAIN';
  }

  public nextQuest(): void {
    if (this.questIndex >= quests.length) {
      this.result();
      return;
    }

    this.quest = quests[this.questIndex];
    this.questIndex++;
  }

  public makeVote(variant: number): void {
    const bonus = variant === 1 ? this.quest.scoreOne : this.quest.scoreTwo;
    this.score += bonus;

    if (bonus >= 0) {
      this.winSound.play();
      this.setState(true, Math.abs(bonus));
    } else {
      this.looseSound.play();
      this.setState(false, Math.abs(bonus));
    }

    if (bonus === -228) {
      this.ban();
    }

    this.nextQuest();
  }

  public setState(win: boolean, score: number): void {
    this.scoreState = (this.scoreState === 'default' ? 'move' : 'default');

    if (win) {
      this.scoreBonus = '+' + score;
      this.scoreColor = 'green';
    } else {
      this.scoreBonus = '-' + score;
      this.scoreColor = 'red';
    }
  }

  public result(): void {
    if (this.score >= this.winScore) {
      this.resultWin();
    } else {
      this.resultLoose();
    }

    this.state = 'END';
  }

  public resultWin(): void {
    this.resultText = 'ТВОЙ ПРИЗ ТУТ';
    this.resultImage = 'assets/win.jpg';
    this.resultSound = this.winSoundResult;
  }

  public resultLoose(): void {
    this.resultText = 'ТЫ ПРОИГРАЛ';
    this.resultImage = 'assets/loose.jpg';
    this.resultSound = this.looseSoundResult;
  }

  public clickGift(): void {
    this.counterGift++;

    if (this.counterGift >= 10) {
      this.showResult = true;
      this.resultSound.play();
    }
  }

  public onLoadOne(): void {
    this.imageLoadOne = false;
  }

  public onLoadTwo(): void {
    this.imageLoadTwo = false;
  }

  public ban(): void {
    alert('ЗРЯ ТЫ ТАК ДРУЖОК...');
    window.location.href = 'https://www.youtube.com/watch?v=rzcFsykYPgA';
  }
}
