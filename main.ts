//% block="Azimuth GPSX $gpsx GPSY $gpsy Year $year Month $month Day $day Hour $hour Minute $minute Second $second"
//% gpsx.defl=0 gpsx.min=-180 gpsx.max=180
//% gpsy.defl=0 gpsy.min=-180 gpsy.max=180
//% year.defl=2024
//% month.defl=1 month.min=1 month.max=12
//% day.defl=1 day.min=1 day.max=31
//% hour.defl=0 hour.min=0 hour.max=23
//% minute.defl=0 minute.min=0 minute.max=59
//% second.defl=0 second.min=0 second.max=59
function azimuth(gpsx: number, gpsy: number, year: number, month: number, day: number, hour: number, minute: number, second: number): number {
    let azimuthValue = calculateAzimuth(gpsx, gpsy, year, month, day, hour, minute, second);
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

//% block="Angular height GPSX $gpsx GPSY $gpsy Year $year Month $month Day $day Hour $hour Minute $minute Second $second"
//% gpsx.defl=0 gpsx.min=-180 gpsx.max=180
//% gpsy.defl=0 gpsy.min=-180 gpsy.max=180
//% year.defl=2024
//% month.defl=1 month.min=1 month.max=12
//% day.defl=1 day.min=1 day.max=31
//% hour.defl=0 hour.min=0 hour.max=23
//% minute.defl=0 minute.min=0 minute.max=59
//% second.defl=0 second.min=0 second.max=59
function angularHeight(gpsx: number, gpsy: number, year: number, month: number, day: number, hour: number, minute: number, second: number): number {
    let angularHeightValue = calculateAngularHeight(gpsx, gpsy, year, month, day, hour, minute, second);
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
