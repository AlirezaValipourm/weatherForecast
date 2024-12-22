export interface LocationData {
    lat: number;
    lon: number;
}

export interface GeocodeResult {
    results: Array<GeoData>
}

export interface GeoData {
    annotations: {
        flag: string;
        timezone: {
            name: string;
        }
    },
    components: {
        city: string,
        continent: string
        country: string
        county: string
        state: string
    },
    geometry: {
        lat: string;
        lng: string;
    }
}