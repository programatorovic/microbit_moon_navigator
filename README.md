# Moon Navigator

Moon Navigator je rozšírenie pre MakeCode pre micro:bit, ktoré umožňuje vypočítať azimut, výšku a fázu Mesiaca na základe zadaných GPS súradníc a času.

## Bloky

### Azimuth
Vypočíta azimut Mesiaca.

- **Vstupné parametre**:
  - GPSX: Geografická šírka (v stupňoch)
  - GPSY: Geografická dĺžka (v stupňoch)
  - Year: Rok
  - Month: Mesiac
  - Day: Deň
  - Hour: Hodina
  - Minute: Minúta
  - Second: Sekunda

- **Výstup**: Azimut (v stupňoch od -180 do +180)

### Angular height
Vypočíta výšku Mesiaca.

- **Vstupné parametre**:
  - GPSX: Geografická šírka (v stupňoch)
  - GPSY: Geografická dĺžka (v stupňoch)
  - Year: Rok
  - Month: Mesiac
  - Day: Deň
  - Hour: Hodina
  - Minute: Minúta
  - Second: Sekunda

- **Výstup**: Výška (v stupňoch od -180 do +180)

### Phase
Vypočíta fázu Mesiaca.

- **Vstupné parametre**:
  - Year: Rok
  - Month: Mesiac
  - Day: Deň
  - Hour: Hodina
  - Minute: Minúta
  - Second: Sekunda

- **Výstup**: Fáza Mesiaca (v percentách od -100 do 100, kde kladné hodnoty znamenajú rastúci Mesiac a záporné hodnoty znamenajú klesajúci Mesiac)

## Inštalácia

1. Otvorte MakeCode pre micro:bit.
2. Kliknite na "Rozšírenia".
3. Vyhľadajte "Moon Navigator" a pridajte ho do svojho projektu.

## Použitie

1. Pridajte blok "Azimuth" do svojho programu a zadajte požadované vstupné parametre.
2. Pridajte blok "Angular height" do svojho programu a zadajte požadované vstupné parametre.
3. Pridajte blok "Phase" do svojho programu a zadajte požadované vstupné parametre.

## Príklad

```typescript
let azimuthValue = moonNavigator.azimuth(48.1486, 17.1077, 2024, 12, 27, 16, 30, 0);
let angularHeightValue = moonNavigator.angularHeight(48.1486, 17.1077, 2024, 12, 27, 16, 30, 0);
let phaseValue = moonNavigator.phase(2024, 12, 27, 16, 30, 0);
