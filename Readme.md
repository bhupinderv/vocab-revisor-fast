Vocab Revisor Fast

A flashcard app for practising Dutch vocabulary, built with Angular 20 and Bootstrap. Everything happens on one screen, there's no backend, and nothing is saved between sessions.

Features

Word list

Words are loaded from src/assets/vocab.txt, one dutch = english pair per line. Lines starting with # are skipped.
The list is shuffled each time the app loads. It currently holds 5 words.

Practice direction (new)

A label above the card shows the current direction: Dutch → English or English → Dutch.
The ⇄ Reverse button switches between the two at any time. Your score and progress stay the same, but if the answer was showing it's hidden again.
The revealed answer is labelled "English:" or "Dutch:" to match the direction.

Practice loop (keyboard)

The card shows a word in the direction you chose.
Press Enter to reveal the answer.
Then press Enter again if you knew it, or Space if you didn't.

Live stats

Progress through the list (e.g. 3 / 5).
How many you got right and wrong.
Accuracy, shown in green at 80% or more, yellow from 50%, and red below that.

End of round

A popup shows your final accuracy and lists the words you missed with their answers, in the direction you practised. If you got everything right, you get a "Great job" alert instead.
The counters then reset and a new round starts, with the words in the same order.
