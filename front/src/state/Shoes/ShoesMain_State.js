import {atom} from 'recoil';

export const ShoesMain_PopularLoading = atom({
    key: 'ShoesMain_PopularLoading', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
});

export const ShoesMain_BrandLoading = atom({
    key: 'ShoesMain_BrandLoading', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
});

export const ShoesMain_FeatureLoading = atom({
    key: 'ShoesMain_FeatureLoading', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
});

export const ShoesMain_Error = atom({
    key: 'ShoesMain_Error', // unique ID (with respect to other atoms/selectors)
    default: undefined, // default value (aka initial value)
});

export const ShoesMain_AllLoading = atom({
    key: 'ShoesMain_AllLoading', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
});