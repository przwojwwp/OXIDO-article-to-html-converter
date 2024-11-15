# Article to HTML Converter

Aplikacja do konwersji artykułu tekstowego do formatu HTML z automatycznym generowaniem szablonu CSS. Używa OpenAI API do przetwarzania tekstu artykułu i generowania odpowiednich plików HTML oraz CSS.

## Jak działa aplikacja?

1. **Wczytanie artykułu**: Artykuł w formacie tekstowym (`article.txt`) jest wczytywany z systemu plików.
2. **Generowanie HTML**: OpenAI GPT-4 przekształca artykuł na strukturę HTML, uwzględniając semantyczne tagi HTML, miejsca na obrazy, podpisy itp.
3. **Generowanie CSS**: Na podstawie wygenerowanego HTML tworzy się arkusz stylów CSS, który zawiera układ Flexbox, odpowiednie marginesy, kolorystykę i responsywność.
4. **Tworzenie szablonu HTML**: Wygenerowane HTML i CSS są łączone w jeden dokument HTML, który jest gotowy do podglądu.
5. **Zapis do pliku**: Ostateczny plik HTML jest zapisywany jako `podglad.html`.

## Instrukcja uruchomienia

### Wymagania:
- Node.js (zalecana wersja: 18 lub wyższa)
- Konto na OpenAI i klucz API

### Krok 1: Instalacja zależności

Najpierw zainstaluj wszystkie zależności:

```bash
npm install