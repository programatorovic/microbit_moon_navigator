# Moon Navigator

Moon Navigator je rozšírenie pre MakeCode pre micro:bit, ktoré umožňuje vypočítať azimut a výšku Mesiaca na základe zadaných GPS súradníc a času.

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

## Inštalácia

1. Otvorte MakeCode pre micro:bit.
2. Kliknite na "Rozšírenia".
3. Vyhľadajte "Moon Navigator" a pridajte ho do svojho projektu.

## Použitie

1. Pridajte blok "Azimuth" do svojho programu a zadajte požadované vstupné parametre.
2. Pridajte blok "Angular height" do svojho programu a zadajte požadované vstupné parametre.

## Príklad

```typescript
let azimuthValue = azimuth(48.1486, 17.1077, 2024, 12, 27, 16, 09, 20)
