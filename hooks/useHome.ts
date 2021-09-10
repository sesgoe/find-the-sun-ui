import { debounce } from 'lodash';
import { useState, useCallback } from 'react';
import { FeaturesEntity, GeocodingResponse } from '../types/mapboxTypes';
import { useCurrentLocation } from './useCurrentLocation';

export const useHome = () => {
    const {
        hasNavigator,
        setEnabled,
        buildMapData,
        showMap,
        closestCity,
        resetMap,
        error,
        errorText,
    } = useCurrentLocation();

    const [searchResults, setSearchResults] = useState<FeaturesEntity[]>([]);

    const changeHandler = (e) => {
        mapboxSearch(e.target.value);
    };

    const debouncedSearch = useCallback(debounce(changeHandler, 300), []);

    const mapboxSearch = async (searchText: string) => {
        const result = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?access_token=pk.eyJ1Ijoic2VzZ29lIiwiYSI6ImNrdGRzNzV4bzJpb3EyeW84bjV6d2N2dDcifQ.-yf9uAguvXbOk5pgy_0b7g`
        );
        const response: GeocodingResponse = await result.json();
        console.log(response);
        setSearchResults(response.features);
    };

    const reset = () => {
        setSearchResults([]);
        resetMap();
    };

    return {
        reset,
        error,
        errorText,
        showMap,
        debouncedSearch,
        searchResults,
        buildMapData,
        hasNavigator,
        setEnabled,
        closestCity,
    };
};
