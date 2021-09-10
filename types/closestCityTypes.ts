export interface ClosestCitySuccess {
    result: 'success';
    data: {
        distance: number;
        lat: number;
        lon: number;
        name: string;
        weather: {
            description: string;
            id: number;
            main: string;
        };
    };
}

export interface ClosestCityFailure {
    result: 'failure';
    message: string;
}

export type ClosestCityResponse = ClosestCitySuccess | ClosestCityFailure;
