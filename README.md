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

---

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
Sowohl die Nummerierung der Zeilen ($n$), also auch die der Einträge innerhalb einer Zeile ($k$), beginnt man dabei mit $0$ zu zählen. An den Positionen links und rechts der $1$sen am Rand denkt man sich wieder je eine $0$ hinzu. Direkt berechnen lassen sich die Einträge mit dem **Binomialkoeffizienten**:
```math
a_{n,k} = {n \choose k} = \frac{n!}{k!(n-k)!}
```

Die Binomialkoeffizienten, bzw. Zahlen im Pascaleschen Dreieck haben viele interessante und nützliche mathematische Eigenschaften. So steht ${n \choose k}$ in der Kombinatorik für die Anzahl der Möglichkeiten, $k$ Objekte aus $n$ zu wählen, ohne Beachtung der Reihenfolge.
In der Algebra geben die Binomialkoeffizienten die Koeffizienten in der **Binomialformel** an, etwa $(a + b)^2 = a^2 + 2ab + b^2$, (Zeile Nummer $2$ im Dreieck), oder allgemein:
$(a + b)^n = \sum_{k=0}^{n} {n \choose k} a^{n-k} b^k$.

### Modulo-Muster im Pascalschen Dreieck

In der Web-App werden nicht die Zahlenwerte des Pascalschen Dreiecks selbst ausgegeben. Stattdessen wird an der Position jeder Zahl markiert, ob sie durch die ganze Zahl $m$ (in der Web-App als teiler eingestellt) teilbar ist ($a_{n,k}\mod m = 0$) oder nicht ($a_{n,k}\mod m \neq 0$).
Mathematisch ausgedrückt: Wenn man die Zahlen im Pascalschen Dreieck **modulo einer ganzen Zahl m** betrachtet, ergeben sich faszinierende Muster. In der Web-App werden die Einträge so dargestellt:

- `·` wenn nicht durch *m* teilbar ($a_{n,k}\mod m \neq 0$)
- `V` wenn durch *m* teilbar ($a_{n,k}\mod m = 0$)

Es entsteht so z.B. bei *m = 2* das berühmte **Sierpinski-Dreieck**, bei *m = 3, 5, 7* weitere fraktalartige **modulare Muster**. Solche Muster sind nicht nur schön, sondern [in der Mathematik tatsächlich Forschungsgegenstand](https://scholar.google.de/scholar?hl=de&as_sdt=0%2C5&q=Pascal%E2%80%99s+Triangle+modulo+m+&btnG=).

## 🔁 Effiziente Berechnung

Anstatt die Binomialkoeffizienten mit Fakultäten zu berechnen (was teuer und speicherintensiv wäre), nutzen wir die rekursive Eigenschaft des Pascalschen Dreiecks:

Modulo ist kompatibel mit der Addition
$$a_{n,k}\mod m = (a_{n-1,k-1}\mod m + a_{n-1,k}\mod m)\mod m$$

$$(a + b) \mod m = \left( (a \mod m) + (b \mod m) \right) \mod m$$


So entsteht die rekursive Zeile-zu-Zeile-Berechnung mit extrem geringer Rechenlast und ohne vollständige Matrizenhaltung.

### 📊 Vergleich der Berechnungsansätze

| Methode                       | Rechenaufwand         | Speicherbedarf       | Bewertung       |
|------------------------------|------------------------|----------------------|-----------------|
| Direkte Berechnung mit Fakultäten | Hoch (n!)              | Mittel               | ❌ langsam       |
| Lookup-Tabelle (Precompute)  | Schnell                | Hoch (O(n²))         | ❌ speicherintensiv |
| **Iterative Modulo-Berechnung** | **Sehr gering**         | **Minimal**          | ✅ optimal       |

Diese Methode zeigt, wie mathematisches Nachdenken vor dem Programmieren nicht nur Klarheit, sondern auch Performance bringt.


---

## Technologien

- HTML5 (strukturierter Aufbau)
- CSS3 (Media Queries, Variablen, responsive Design)
- Vanilla JavaScript (modular, ohne Framework)

---

## Autor & Lizenz

Erstellt von [Björn Schwentker](https://github.com/BSchwentker). Dieses Projekt steht unter der [MIT License](LICENSE). Du darfst es kopieren, verändern, verwenden – auch kommerziell – solange du den ursprünglichen Autor nennst. Kommentare und Hinweise willkommen!

---

## Quellen & Dank

- Darstellung der Teilbarkeitsmuster inspiriert durch:  
  [Arndt Brünner – Pascalmod](https://www.arndt-bruenner.de/mathe/scripts/pascalmod.htm)

