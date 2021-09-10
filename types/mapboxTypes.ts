export interface GeocodingResponse {
    type: string;
    query?: string[] | null;
    features?: FeaturesEntity[] | null;
    attribution: string;
}
export interface FeaturesEntity {
    id: string;
    type: string;
    place_type?: string[] | null;
    relevance: number;
    properties: Properties;
    text: string;
    place_name: string;
    bbox?: number[] | null;
    center?: number[] | null;
    geometry: Geometry;
    context?: ContextEntity[] | null;
}
export interface Properties {
    wikidata?: string | null;
    foursquare?: string | null;
    landmark?: boolean | null;
    address?: string | null;
    category?: string | null;
    maki?: string | null;
}
export interface Geometry {
    type: string;
    coordinates?: number[] | null;
}
export interface ContextEntity {
    id: string;
    text: string;
    wikidata?: string | null;
    short_code?: string | null;
}
