import axios from 'axios';
import { useEffect, useState } from 'react';
import { ClosestCityResponse, ClosestCitySuccess } from '../types/closestCityTypes';
import * as polyline from '@mapbox/polyline';

export const useCurrentLocation = () => {
    const [enabled, setEnabled] = useState(false);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState<string>();
    const [hasNavigator, setHasNavigator] = useState(true);
    const [showMap, setShowMap] = useState(false);
    const [closestCity, setClosestCity] = useState<ClosestCitySuccess & { imageUrl: string }>();

    const successfulGeoCoords = (position: GeolocationPosition) => {
        buildMapData(position.coords.latitude, position.coords.longitude);
    };

    useEffect(() => {
        const geo = navigator.geolocation;
        if (!geo) {
            setHasNavigator(false);
        }

        if (enabled) {
            geo.getCurrentPosition(successfulGeoCoords, () => setError(true));
        }
    }, [enabled]);

    const getClosestSunnyCity = async (lat: number, lon: number): Promise<ClosestCityResponse> => {
        const request = await axios.post(`/api/city`, { lat, lon });
        return request.data;
    };

    const buildImageUrl = (
        centerLat: number,
        centerLon: number,
        sunLat: number,
        sunLon: number,
        distance: number
    ) => {
        return `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l+2dabe1(${centerLon},${centerLat}),path-2+6deaf3-0.8(${polyline.encode(
            [
                [centerLat, centerLon],
                [sunLat, sunLon],
            ]
        )}),url-https%3A%2F%2Fi.imgur.com%2Fdv98e3p.png(${sunLon},${sunLat})/${centerLon},${centerLat},${
            distance < 30 ? '9.84' : '8.5' //zoom
        },0/1200x900?access_token=pk.eyJ1Ijoic2VzZ29lIiwiYSI6ImNrdGRzNzV4bzJpb3EyeW84bjV6d2N2dDcifQ.-yf9uAguvXbOk5pgy_0b7g`;
    };

    const buildMapData = async (lat: number, lon: number) => {
        const closestCity = await getClosestSunnyCity(lat, lon);
        if (closestCity.result === 'failure') {
            setError(true);
            setErrorText(closestCity.message);
        } else {
            const imageUrl = buildImageUrl(
                lat,
                lon,
                closestCity.data.lat,
                closestCity.data.lon,
                closestCity.data.distance
            );
            setClosestCity({
                ...closestCity,
                imageUrl,
            });
            setShowMap(true);
        }
    };

    const resetMap = () => {
        setShowMap(false);
        setEnabled(false);
        setError(false);
    };

    return {
        hasNavigator,
        setEnabled,
        error,
        errorText,
        buildMapData,
        showMap,
        closestCity,
        resetMap,
    };
};
