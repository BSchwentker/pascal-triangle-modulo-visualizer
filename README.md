# Pascalsches Dreieck – Teilbarkeitsmuster

Ein interaktives, responsives Web-Tool zur Visualisierung von Teilbarkeitsmustern im Pascalschen Dreieck.
Online-Version: [http://mathe.schwentker.de/pascal/pascal.html](http://mathe.schwentker.de/pascal/pascal.html)

<img src="assets/pascal_preview.png" alt="Screenshot webapp" style="max-width: 100%; width: 400px;">

## 📌 Features

- Interaktive Steuerung von Zeilenzahl und Teiler (Modulo)
- Zoom-Funktion für große Muster
- Schnelle Berechnung großer Muster bis 5000 Zeilen durch ressourchenschonenden Algorithmus ohne "n über k"
- Overlay mit mathematischen Hintergrundinformationen
- Minimalistisch, performant und leichtgewichtig (keine Frameworks)
- Responsives Design (funktioniert auf Mobilgeräten, Tablets und Desktops)


## 🧼 Mathematischer Hintergrund

Das Pascalsche Dreieck besteht aus ganzen Zahlen, die zeilenweise versetzt untereinander geschrieben werden. Beginnen mit der $1$ in der obersten Zeile (man denkt sich links und rechts davon je eine unsichtbare $0$ dazu), ergeben sie sich die Zahlen in der jeweils nachfolgenden Zeile immer aus der Summer der beiden direkt links und rechts darüber stehenden Zahlen. Beispiel für die ersten 5 Zeilen:

```
        1
      1   1
    1   2   1
  1   3   3   1
1   4   6   4   1
```
Die rekursive Rechenregel für den Eintrag $a_{n,k}$ an der $k$ten Stelle in der $n$ten Zeile lautet also:
$$a_{n,k} = a_{n-1,k-1} + a_{n-1,k}$$
Sowohl die Nummerierung der Zeilen ($n$), als auch die der Einträge innerhalb einer Zeile ($k$), beginnt dabei mit $0$. An den Positionen links und rechts der Einsen am Rand denkt man sich wieder je eine $0$ hinzu. Direkt berechnen lassen sich die Einträge mit dem **Binomialkoeffizienten**:
```math
a_{n,k} = {n \choose k} = \frac{n!}{k!(n-k)!}
```

Die Binomialkoeffizienten, bzw. Zahlen im Pascaleschen Dreieck haben viele interessante und nützliche mathematische Eigenschaften. So steht ${n \choose k}$ in der Kombinatorik für die Anzahl der Möglichkeiten, $k$ Objekte aus $n$ zu wählen, ohne Beachtung der Reihenfolge.
In der Algebra geben die Binomialkoeffizienten die Koeffizienten in der **Binomialformel** an, etwa $(a + b)^2 = a^2 + 2ab + b^2$, (Zeile Nummer $2$ im Dreieck), oder allgemein:
$(a + b)^n = \sum_{k=0}^{n} {n \choose k} a^{n-k} b^k$.

### Modulo-Muster im Pascalschen Dreieck

In der Web-App werden nicht die Zahlenwerte des Pascalschen Dreiecks selbst ausgegeben. Stattdessen angezeigt, ob der Wert durch die ganze Zahl $m$ (in der Web-App als Teiler eingestellt) teilbar ist ($a_{n,k}\mod m = 0$) oder nicht ($a_{n,k}\mod m \neq 0$).
Die Einträge des Dreiecks werden in einem Textfeld so dargestellt:

- `·`, wenn Wert nicht durch *m* teilbar ($a_{n,k}\mod m \neq 0$)
- `V`, wenn Wert durch *m* teilbar ($a_{n,k}\mod m = 0$)

Es entsteht so z.B. bei *m = 2* das berühmte **Sierpinski-Dreieck**, bei *m = 3, 5, 7* weitere fraktalartige **modulare Muster**. Solche Muster sind nicht nur schön, sondern [in der Mathematik tatsächlich Forschungsgegenstand](https://scholar.google.de/scholar?hl=de&as_sdt=0%2C5&q=Pascal%E2%80%99s+Triangle+modulo+m+&btnG=).

## 🔁 Effiziente Berechnung

Da mit der App auch große Muster bis 5000 Zeilen berechnet werden sollen, müssen die Einträge im Pascalschen Dreieck effizient berechnet werden. Die direkte Berechnung über die Binomialkoeffizienten ${n \choose k}$ ist wegen der Fakultäten zu rechenintensiv ($O(n!)$) und führtschnell zu sehr großen Zahlen. Schon für nur 150 Zeilen ist der größte Beitrag mit $46.413.034.868.354.394.849.492.907.436.302.560.970.058.760$ schon in der Größenordnung $10^{44}$. Die Speicherung aller Werte in einer Lookup-Tabelle (Precompute) würde unnötig viel Speicher verbrauchen ($O(n^2)$).

Zum Glück geht es viel einfacher: Denn nicht nur die Einträge des Pascalschen Dreiecks selbst lassen sich ohne die Fakultäst-Formel rekusriv viel einfacher berechnnen (via $a_{n,k} = a_{n-1,k-1} + a_{n-1,k}$). Eine ähnlich einfache rekursive Regel gilt auch für die Einträge modulo $m$:

$$a_{n,k}\mod m = (a_{n-1,k-1}\mod m + a_{n-1,k}\mod m)\mod m$$

Mit dieser Regel berechnen sich die Einträge rekusriv blitzschnell und speicherschonend, da jeweils nur kleine Modulowerte berechnet und addiert werden müssen. Mathematisch funktioniert das, weil Modulo-Operationen generell "kompatibel mit der Addition" sind ($(a + b) \mod m = \left( (a \mod m) + (b \mod m) \right) \mod m$).

### Vergleich der Berechnungsansätze

| Methode                       | Rechenaufwand         | Speicherbedarf       | Bewertung       |
|------------------------------|------------------------|----------------------|-----------------|
| Direkte Berechnung mit Fakultäten | Hoch (n!)              | Mittel               | ❌ langsam       |
| Lookup-Tabelle (Precompute)  | Schnell                | Hoch (O(n²))         | ❌ speicherintensiv |
| **Iterative Modulo-Berechnung** | **Sehr gering**         | **Minimal**          | ✅ optimal       |

Noch effizienter ließen sich die Modulo-Einträge berechnen, wenn man die Symmetrie des Pascalschen Dreiecks ausnutzt ($a_{n,k} = a_{n,n - k}$ wegen ${n \choose k} = {n \choose n - k}$). Aber das bringt wegen der ohnehin schon so einfachen Berechnung kaum mehr wahrnehmbare Geschwindigkeitsvorteile und geht zulasten der Lesbarkeit des Codes. Darum wird die Symmetrie im Code nicht ausgenutzt.

## Technologien

- HTML5 (strukturierter Aufbau)
- CSS3 (Media Queries, Variablen, responsive Design)
- Vanilla JavaScript (modular, ohne Framework)

## Autor & Lizenz

Erstellt von [Björn Schwentker](https://github.com/BSchwentker). Dieses Projekt steht unter der [MIT License](LICENSE). Du darfst es kopieren, verändern, verwenden – auch kommerziell – solange du den ursprünglichen Autor nennst. Kommentare und Hinweise willkommen!


## Quellen & Dank

- Darstellung der Teilbarkeitsmuster inspiriert durch:  
  [Arndt Brünner – Pascalmod](https://www.arndt-bruenner.de/mathe/scripts/pascalmod.htm)

