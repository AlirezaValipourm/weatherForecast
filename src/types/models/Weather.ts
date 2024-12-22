export interface WeatherData {
    temp: number;
    weather: {
        description: string;
        icon: string;
    }
    time?: string;
}

export interface ForecastDayData {
    max_temp: string,
    min_temp: string
    temp: string;
    valid_date: string;
    weather: {
        description: string;
        icon: string;
    }
}

export interface WeatherAlert {
    title: string;
    description: string;
    severity: string;
    regions: string[]
}

export type TemperatureUnit = 'C' | 'F';

export interface WeatherError {
    message: string;
    code?: string;
}