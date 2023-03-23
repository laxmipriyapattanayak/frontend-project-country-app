export interface CountryState {
    countriesData: Country[],
    originalData: Country[],
    favoriteCountry: Country[],
    loading: boolean
}

export interface Country {
    cca3: string;
    flags: { png: string; alt: string};
    name: {common: string};
    region: string;
    population: number;
    languages?: { [key: string]: string };
    isFav: boolean;
}