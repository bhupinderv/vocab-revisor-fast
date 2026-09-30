import { Component, HostListener } from '@angular/core';
import { NgIf, NgClass, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface VocabItem {
  word: string;
  meaning: string;
  status?: 'correct' | 'wrong' | 'unseen';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, NgClass, HttpClientModule, NgFor],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  words: VocabItem[] = [];
  //words: VocabItem[] = [...vocabList];
  currentIndex = 0;
  correctCount = 0;
  wrongCount = 0;

  showMeaning = false;
  reverseMode = false; // false: Dutch → English, true: English → Dutch

  wrongWordsList: VocabItem[] = []; // to display in modal
  showWrongModal = false; // controls modal visibility
  roundAccuracy = 0; // NEW: store accuracy for this round

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadVocab();
  }

  loadVocab() {
    this.http.get('/assets/vocab.txt', { responseType: 'text' }).subscribe((text) => {
      this.words = text
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('#'))
        .map((line) => {
          const [word, meaning] = line.split('=');
          return { word: word.trim(), meaning: meaning.trim() };
        });
      // Shuffle the words randomly
      this.shuffleArray(this.words);
    });
  }

  get currentWord(): VocabItem {
    return this.words[this.currentIndex];
  }

  /** Text shown on the card before revealing */
  get promptText(): string {
    return this.reverseMode ? this.currentWord.meaning : this.currentWord.word;
  }

  /** Text revealed after pressing Enter */
  get answerText(): string {
    return this.reverseMode ? this.currentWord.word : this.currentWord.meaning;
  }

  get modeLabel(): string {
    return this.reverseMode ? 'English → Dutch' : 'Dutch → English';
  }

  /** Switch between Dutch → English and English → Dutch */
  toggleReverse(event?: Event) {
    this.reverseMode = !this.reverseMode;
    this.showMeaning = false; // hide the answer so the flipped card isn't given away
    // Remove focus from the button so Enter/Space don't click it again
    (event?.target as HTMLElement | null)?.blur();
  }

  /** Handle Enter key globally */
  @HostListener('document:keydown.enter')
  handleEnterKey() {
    if (!this.showMeaning) {
      // Word page → show meaning
      this.showMeaning = true;
    } else {
      // Meaning page → mark correct
      this.markCorrect();
    }
  }

  markCorrect() {
    this.words[this.currentIndex].status = 'correct';
    this.correctCount++;
    this.moveToNextWord();
  }

  markWrong() {
    this.words[this.currentIndex].status = 'wrong';
    this.wrongCount++;
    this.moveToNextWord();
  }

  private moveToNextWord() {
    this.showMeaning = false;

    if (this.currentIndex < this.words.length - 1) {
      this.currentIndex++;
    } else {
      // Round complete
      this.showWrongWords(); // New method to show wrong words
      this.reset();
    }
  }

  private reset() {
    this.currentIndex = 0;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.words.forEach((w) => (w.status = undefined));
  }

  get accuracy(): number {
    const totalAnswered = this.correctCount + this.wrongCount;
    if (totalAnswered === 0) {
      return 0;
    }
    return Math.round((this.correctCount / totalAnswered) * 100);
  }

  get accuracyClass(): string {
    if (this.accuracy >= 80) return 'accuracy-high';
    if (this.accuracy >= 50) return 'accuracy-mid';
    return 'accuracy-low';
  }

  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private showWrongWords() {
    this.wrongWordsList = this.words.filter((w) => w.status === 'wrong');

    // Store accuracy before resetting
    this.roundAccuracy = this.accuracy;

    if (this.wrongWordsList.length > 0) {
      this.showWrongModal = true; // show modal
    } else {
      alert('✅ Great job! You got all words correct!');
    }
  }

  /** Handle Space key globally to mark wrong */
  @HostListener('document:keydown.space')
  handleSpaceKey() {
    if (this.showMeaning) {
      this.markWrong(); // only mark wrong if meaning is visible
    }
  }
}
