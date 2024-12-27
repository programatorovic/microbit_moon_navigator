# Moon Navigator

Moon Navigator je rozšírenie pre MakeCode pre micro:bit, ktoré umožňuje vypočítať azimut, výšku, fázu a svietivosť Mesiaca na základe zadaných GPS súradníc a času.

## Bloky

### Set Moon
Nastaví globálne premenné pre GPS súradnice a čas.

- **Vstupné parametre**:
  - GPSX: Geografická šírka (v stupňoch)
  - GPSY: Geografická dĺžka (v stupňoch)
  - Year: Rok
  - Month: Mesiac
  - Day: Deň
  - Hour: Hodina
  - Minute: Minúta
  - Second: Sekunda

### Azimuth
Vypočíta azimut Mesiaca na základe globálnych premenných.

- **Výstup**: Azimut (v stupňoch od -180 do +180)

### Angular height
Vypočíta výšku Mesiaca na základe globálnych premenných.

- **Výstup**: Výška (v stupňoch od -180 do +180)

### Phase
Vypočíta fázu Mesiaca na základe globálnych premenných.

- **Výstup**: Fáza Mesiaca (v percentách od -100 do 100, kde kladné hodnoty znamenajú rastúci Mesiac a záporné hodnoty znamenajú klesajúci Mesiac)

### Light
Vypočíta svietivosť Mesiaca na základe globálnych premenných.

- **Výstup**: Svietivosť Mesiaca (v percentách, kde 0% znamená nový Mesiac a 100% znamená spln)

## Inštalácia

1. Otvorte MakeCode pre micro:bit.
2. Kliknite na "Rozšírenia".
3. Vyhľadajte "Moon Navigator" a pridajte ho do svojho projektu.

## Použitie

1. Pridajte blok "Set Moon" do svojho programu a zadajte požadované vstupné parametre.
2. Pridajte blok "Azimuth" do svojho programu na výpočet azimutu.
3. Pridajte blok "Angular height" do svojho programu na výpočet výšky.
4. Pridajte blok "Phase" do svojho programu na výpočet fázy.
5. Pridajte blok "Light" do svojho programu na výpočet svietivosti.

## Príklad

```typescript
moonNavigator.setMoon(48.1486, 17.1077, 2024, 12, 27, 16, 30, 0);
let azimuthValue = moonNavigator.azimuth();
let angularHeightValue = moonNavigator.angularHeight();
let phaseValue = moonNavigator.phase();
let lightValue = moonNavigator.light();
