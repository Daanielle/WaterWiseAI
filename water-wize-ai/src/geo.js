export default class Converters {
    static eWGS84 = 0;
    static eGRS80 = 1;
    static eCLARK80M = 2;

    static gICS = 0;
    static gITM = 1;

    static DatumList = [];
    static GridList = [];

    static pi() { return 3.141592653589793; }
    static sin2(x) { return Math.sin(x) * Math.sin(x); }
    static cos2(x) { return Math.cos(x) * Math.cos(x); }
    static tan2(x) { return Math.tan(x) * Math.tan(x); }
    static tan4(x) { return this.tan2(x) * this.tan2(x); }

    static init() {
        // WGS84 data
        this.DatumList.push(new DATUM(
            6378137.0,				// a
            6356752.3142,			// b
            0.00335281066474748,  	// f = 1/298.257223563
            0.006694380004260807,	// esq
            0.0818191909289062, 	// e
            // deltas to WGS84
            0, 0, 0
        ));

        // GRS80 data
        this.DatumList.push(new DATUM(
            6378137.0,				// a
            6356752.3141,			// b
            0.0033528106811823,		// f = 1/298.257222101
            0.00669438002290272,	// esq
            0.0818191910428276,		// e
            // deltas to WGS84
            -48, 55, 52
        ));

        // Clark 1880 Modified data
        this.DatumList.push(new DATUM(
            6378300.789,			// a
            6356566.4116309,		// b
            0.003407549767264,		// f = 1/293.466
            0.006803488139112318,	// esq
            0.08248325975076590,	// e
            // deltas to WGS84
            -235, -85, 264
        ));

        // ICS data
        this.GridList.push(new GRID(
            0.6145667421719,			// lon0 = central meridian in radians of 35.12'43.490"
            0.55386447682762762,		// lat0 = central latitude in radians of 31.44'02.749"
            1.00000,					// k0 = scale factor
            170251.555,					// false_easting
            2385259.0					// false_northing
        ));

        // ITM data
        // this.GridList.push(new GRID(
        //     31.7343936111111,		// lon0 = central meridian in radians 35.12'16.261"
        //     35.2045169444445,		// lat0 = central latitude in radians 31.44'03.817"
        //     1.0000067,					// k0 = scale factor
        //     219529.584,					// false_easting
        //     2885516.9488				// false_northing = 3512424.3388-626907.390
        // ));
        this.GridList.push(new GRID(
            0.61443473225468920,		// lon0 = central meridian in radians 35.12'16.261"
            0.55386965463774187,		// lat0 = central latitude in radians 31.44'03.817"
            1.0000067,					// k0 = scale factor
            219529.584,					// false_easting
            2885516.9488				// false_northing = 3512424.3388-626907.390
        ));
    }

    static itm2wgs84(N, E) {
        // 1. Local Grid (ITM) -> GRS80
        let [lat80, lon80] = this.Grid2LatLon(N, E, this.gITM, this.eGRS80);

        // 2. Molodensky GRS80->WGS84
        let [lat84, lon84] = this.Molodensky(lat80, lon80, this.eGRS80, this.eWGS84);

        // final results
        let lat = lat84 * 180 / this.pi();
        let lon = lon84 * 180 / this.pi();
        return { lat, lon };
    }

    static wgs842itm(lat, lon) {
        let latr = lat * this.pi() / 180;
        let lonr = lon * this.pi() / 180;

        // 1. Molodensky WGS84 -> GRS80
        let [lat80, lon80] = this.Molodensky(latr, lonr, this.eWGS84, this.eGRS80);

        // 2. Lat/Lon (GRS80) -> Local Grid (ITM)
        let [N, E] = this.LatLon2Grid(lat80, lon80, this.eGRS80, this.gITM);
        return { N, E };
    }

    static ics2wgs84(N, E) {
        // 1. Local Grid (ICS) -> Clark_1880_modified
        let [lat80, lon80] = this.Grid2LatLon(N, E, this.gICS, this.eCLARK80M);

        // 2. Molodensky Clark_1880_modified -> WGS84
        let [lat84, lon84] = this.Molodensky(lat80, lon80, this.eCLARK80M, this.eWGS84);

        // final results
        let lat = lat84 * 180 / this.pi();
        let lon = lon84 * 180 / this.pi();
        return { lat, lon };
    }

    static wgs842ics(lat, lon) {
        let latr = lat * this.pi() / 180;
        let lonr = lon * this.pi() / 180;

        // 1. Molodensky WGS84 -> Clark_1880_modified
        let [lat80, lon80] = this.Molodensky(latr, lonr, this.eWGS84, this.eCLARK80M);

        // 2. Lat/Lon (Clark_1880_modified) -> Local Grid (ICS)
        let [N, E] = this.LatLon2Grid(lat80, lon80, this.eCLARK80M, this.gICS);
        return { N, E };
    }

    static Grid2LatLon(N, E, from, to) {
        //================
        // GRID -> Lat/Lon
        //================

        let y = N + this.GridList[from].false_n;
        let x = E - this.GridList[from].false_e;
        let M = y / this.GridList[from].k0;

        let a = this.DatumList[to].a;
        let b = this.DatumList[to].b;
        let e = this.DatumList[to].e;
        let esq = this.DatumList[to].esq;

        let mu = M / (a * (1 - e * e / 4 - 3 * Math.pow(e, 4) / 64 - 5 * Math.pow(e, 6) / 256));

        let ee = Math.sqrt(1 - esq);
        let e1 = (1 - ee) / (1 + ee);
        let j1 = 3 * e1 / 2 - 27 * e1 * e1 * e1 / 32;
        let j2 = 21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32;
        let j3 = 151 * e1 * e1 * e1 / 96;
        let j4 = 1097 * e1 * e1 * e1 * e1 / 512;

        // Footprint Latitude
        let fp = mu + j1 * Math.sin(2 * mu) + j2 * Math.sin(4 * mu) + j3 * Math.sin(6 * mu) + j4 * Math.sin(8 * mu);

        let sinfp = Math.sin(fp);
        let cosfp = Math.cos(fp);
        let tanfp = sinfp / cosfp;
        let eg = (e * a / b);
        let eg2 = eg * eg;
        let C1 = eg2 * cosfp * cosfp;
        let T1 = tanfp * tanfp;
        let R1 = a * (1 - e * e) / Math.pow(1 - (e * sinfp) * (e * sinfp), 1.5);
        let N1 = a / Math.sqrt(1 - (e * sinfp) * (e * sinfp));
        let D = x / (N1 * this.GridList[from].k0);

        let Q1 = N1 * tanfp / R1;
        let Q2 = D * D / 2;
        let Q3 = (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * eg2 * eg2) * (D * D * D * D) / 24;
        let Q4 = (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * eg2 * eg2 - 3 * C1 * C1) * (D * D * D * D * D * D) / 720;
        let lat = fp - Q1 * (Q2 - Q3 + Q4);

        let Q5 = D;
        let Q6 = (1 + 2 * T1 + C1) * (D * D * D) / 6;
        let Q7 = (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * eg2 * eg2 + 24 * T1 * T1) * (D * D * D * D * D) / 120;
        let lon = this.GridList[from].lon0 + (Q5 - Q6 + Q7) / cosfp;

        return [lat, lon];
    }

    static LatLon2Grid(lat, lon, from, to) {
        //================
        // Lat/Lon -> GRID
        //================

        let a = this.DatumList[from].a;
        let b = this.DatumList[from].b;
        let e = this.DatumList[from].e;
        let e2 = e * e;

        let sinlat = Math.sin(lat);
        let coslat = Math.cos(lat);
        let tanlat = sinlat / coslat;
        let esq = (1 - (b / a) * (b / a));
        let N = a / Math.sqrt(1 - esq * sinlat * sinlat);
        let T = tanlat * tanlat;
        let C = esq * coslat * coslat / (1 - esq);
        let A = coslat * (lon - this.GridList[to].lon0);
        let M = a * ((1 - e2 / 4 - 3 * e2 * e2 / 64 - 5 * e2 * e2 * e2 / 256) * lat - (3 * e2 / 8 + 3 * e2 * e2 / 32 + 45 * e2 * e2 * e2 / 1024) * Math.sin(2 * lat) + (15 * e2 * e2 / 256 + 45 * e2 * e2 * e2 / 1024) * Math.sin(4 * lat) - (35 * e2 * e2 * e2 / 3072) * Math.sin(6 * lat));

        let M0 = 0;
        let x = this.GridList[to].false_e + this.GridList[to].k0 * N * (A + (1 - T + C) * A * A * A / 6 + (5 - 18 * T + T * T + 72 * C - 58 * esq / (1 - esq)) * A * A * A * A * A / 120);
        let y = this.GridList[to].false_n + this.GridList[to].k0 * (M - M0 + N * tanlat * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * A * A * A * A / 24 + (61 - 58 * T + T * T + 600 * C - 330 * esq / (1 - esq)) * A * A * A * A * A * A / 720));

        return [y, x];
    }

    static Molodensky(ilat, ilon, from, to) {
        let slat = Math.sin(ilat);
        let clat = Math.cos(ilat);
        let slon = Math.sin(ilon);
        let clon = Math.cos(ilon);
        let ssqlat = slat * slat;

        // input geodetic coordinates
        let dlat = ilat;
        let dlon = ilon;
        let fromDatum = this.DatumList[from];
        let toDatum = this.DatumList[to];
        let from_a = fromDatum.a;
        let from_b = fromDatum.b;
        let from_esq = fromDatum.esq;
        let to_a = toDatum.a;
        let to_b = toDatum.b;
        let to_esq = toDatum.esq;

        let df = toDatum.f - fromDatum.f;
        let dx = fromDatum.dx - toDatum.dx;
        let dy = fromDatum.dy - toDatum.dy;
        let dz = fromDatum.dz - toDatum.dz;

        let adb = 1.0 / (1.0 - from_esq);
        let rn = from_a / Math.sqrt(1.0 - from_esq * ssqlat);
        let rm = from_a * (1.0 - from_esq) / Math.pow(1.0 - from_esq * ssqlat, 1.5);

        dlat = (dx * slat * clon + dy * slat * slon + dz * clat - df * rm * from_esq * slat * clat / from_a + rn * from_esq * slat * clat * (dx * clat * clon + dy * clat * slon - dz * slat) / from_a) / rm;

        dlon = (-dx * slon + dy * clon) / (rn * clat);

        return [ilat + dlat, ilon + dlon];
    }
}

class DATUM {
    constructor(a, b, f, esq, e, dx, dy, dz) {
        this.a = a;  // semi-major axis
        this.b = b;  // semi-minor axis
        this.f = f;  // flattening
        this.esq = esq;  // eccentricity squared
        this.e = e;  // eccentricity
        this.dx = dx;  // delta x to WGS84
        this.dy = dy;  // delta y to WGS84
        this.dz = dz;  // delta z to WGS84
    }
}

class GRID {
    constructor(lon0, lat0, k0, false_e, false_n) {
        this.lon0 = lon0;  // central meridian (longitude)
        this.lat0 = lat0;  // central latitude
        this.k0 = k0;  // scale factor
        this.false_e = false_e;  // false easting
        this.false_n = false_n;  // false northing
    }
}

// Initialize the converters
Converters.init();
