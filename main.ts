//% color=#0fbc11 icon="\u263e" block="Moon Navigator"
namespace moonNavigator {
    let gpsx: number;
    let gpsy: number;
    let year: number;
    let month: number;
    let day: number;
    let hour: number;
    let minute: number;
    let second: number;

    //% block="Set Moon GPSX $gpsx GPSY $gpsy Year $year Month $month Day $day Hour $hour Minute $minute Second $second"
    //% gpsx.defl=0 gpsx.min=-180 gpsx.max=180
    //% gpsy.defl=0 gpsy.min=-180 gpsy.max=180
    //% year.defl=2024
    //% month.defl=1 month.min=1 month.max=12
    //% day.defl=1 day.min=1 day.max=31
    //% hour.defl=0 hour.min=0 hour.max=23
    //% minute.defl=0 minute.min=0 minute.max=59
    //% second.defl=0 second.min=0 second.max=59
    export function setMoon(gpsx: number, gpsy: number, year: number, month: number, day: number, hour: number, minute: number, second: number): void {
        moonNavigator.gpsx = gpsx;
        moonNavigator.gpsy = gpsy;
        moonNavigator.year = year;
        moonNavigator.month = month;
        moonNavigator.day = day;
        moonNavigator.hour = hour;
        moonNavigator.minute = minute;
        moonNavigator.second = second;
    }

    //% block="Azimuth"
    export function azimuth(): number {
        let azimuthValue = calculateAzimuth(moonNavigator.gpsx, moonNavigator.gpsy, moonNavigator.year, moonNavigator.month, moonNavigator.day, moonNavigator.hour, moonNavigator.minute, moonNavigator.second);
        return azimuthValue;
    }

    function calculateAzimuth(gpsx: number, gpsy: number, year: number, month: number, day: number, hour: number, minute: number, second: number): number {
        let jd = julianDate(year, month, day, hour, minute, second);
        let t = (jd - 2451545.0) / 36525.0;
        let l0 = 218.316 + 13.176396 * t;
        let m = 134.963 + 13.064993 * t;
        let f = 93.272 + 13.229350 * t;
        let lambda = l0 + 6.289 * Math.sin(degToRad(m));
        let beta = 5.128 * Math.sin(degToRad(f));
        let delta = Math.asin(Math.sin(degToRad(beta)) * Math.sin(degToRad(lambda)));
        let alpha = Math.atan2(Math.cos(degToRad(beta)) * Math.sin(degToRad(lambda)), Math.cos(degToRad(lambda)));
        let lst = localSiderealTime(gpsx, jd);
        let ha = lst - radToDeg(alpha);
        let azimuth = Math.atan2(Math.sin(degToRad(ha)), Math.cos(degToRad(ha)) * Math.sin(degToRad(gpsy)) - Math.tan(degToRad(delta)) * Math.cos(degToRad(gpsy)));
        return radToDeg(azimuth);
    }

    //% block="Angular height"
    export function angularHeight(): number {
        let angularHeightValue = calculateAngularHeight(moonNavigator.gpsx, moonNavigator.gpsy, moonNavigator.year, moonNavigator.month, moonNavigator.day, moonNavigator.hour, moonNavigator.minute, moonNavigator.second);
        return angularHeightValue;
    }

    function calculateAngularHeight(gpsx: number, gpsy: number, year: number, month: number, day: number, hour: number, minute: number, second: number): number {
        let jd = julianDate(year, month, day, hour, minute, second);
        let t = (jd - 2451545.0) / 36525.0;
        let l0 = 218.316 + 13.176396 * t;
        let m = 134.963 + 13.064993 * t;
        let f = 93.272 + 13.229350 * t;
        let lambda = l0 + 6.289 * Math.sin(degToRad(m));
        let beta = 5.128 * Math.sin(degToRad(f));
        let delta = Math.asin(Math.sin(degToRad(beta)) * Math.sin(degToRad(lambda)));
        let alpha = Math.atan2(Math.cos(degToRad(beta)) * Math.sin(degToRad(lambda)), Math.cos(degToRad(lambda)));
        let lst = localSiderealTime(gpsx, jd);
        let ha = lst - radToDeg(alpha);
        let altitude = Math.asin(Math.sin(degToRad(gpsy)) * Math.sin(degToRad(delta)) + Math.cos(degToRad(gpsy)) * Math.cos(degToRad(delta)) * Math.cos(degToRad(ha)));
        return radToDeg(altitude);
    }

    //% block="Phase"
    export function phase(): number {
        let phaseValue = calculatePhase(moonNavigator.year, moonNavigator.month, moonNavigator.day, moonNavigator.hour, moonNavigator.minute, moonNavigator.second);
        return phaseValue;
    }

    function calculatePhase(year: number, month: number, day: number, hour: number, minute: number, second: number): number {
        let jd = julianDate(year, month, day, hour, minute, second);
        let newMoonJD = calculateNewMoonJD(year, month, day);
        let daysSinceNewMoon = jd - newMoonJD;
        let phase = 0;
        if (daysSinceNewMoon <= 14.765) {
            phase = (daysSinceNewMoon / 14.765) * 100;
        } else {
            phase = ((29.53 - daysSinceNewMoon) / 14.765) * 100;
        }
        return phase;
    }

    //% block="Light"
    export function light(): number {
        let lightValue = calculateLight(moonNavigator.year, moonNavigator.month, moonNavigator.day, moonNavigator.hour, moonNavigator.minute, moonNavigator.second);
        return lightValue;
    }

    function calculateLight(year: number, month: number, day: number, hour: number, minute: number, second: number): number {
        let jd = julianDate(year, month, day, hour, minute, second);
        let newMoonJD = calculateNewMoonJD(year, month, day);
        let daysSinceNewMoon = jd - newMoonJD;
        let light = 0;
        if (daysSinceNewMoon <= 14.765) {
            light = (daysSinceNewMoon / 14.765) * 100;
        } else {
            light = ((29.53 - daysSinceNewMoon) / 14.765) * 100;
        }
        return light;
    }

    function calculateNewMoonJD(year: number, month: number, day: number): number {
        const synodicMonth = 29.53058867; // Priemerná dĺžka lunárneho cyklu v dňoch
        let k = Math.floor((year + ((month - 1) + (day / 30)) / 12 - 2000) * 12.3685);
        let t = k / 1236.85;
        let t2 = t * t;
        let t3 = t2 * t;
        let jd = 2451550.09765 + synodicMonth * k
            + 0.0001337 * t2
            - 0.00000015 * t3
            + 0.00000000073 * t * t3;
        return jd;
    }

    function julianDate(year: number, month: number, day: number, hour: number, minute: number, second: number): number {
        if (month <= 2) {
            year -= 1;
            month += 12;
        }
        let a = Math.floor(year / 100);
        let b = 2 - a + Math.floor(a / 4);
        return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5 + (hour + minute / 60 + second / 3600) / 24;
    }

    function localSiderealTime(longitude: number, jd: number): number {
        let t = (jd - 2451545.0) / 36525.0;
        let lst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + t * t * (0.000387933 - t / 38710000.0);
        return (lst + longitude) % 360;
    }

    function degToRad(deg: number): number {
        return deg * Math.PI / 180;
    }

    function radToDeg(rad: number): number {
        return rad * 180 / Math.PI;
    }

}
