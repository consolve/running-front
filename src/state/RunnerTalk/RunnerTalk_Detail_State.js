import {atom} from 'recoil';

export const RunnerTalkDetail_isLiked = atom({
    key: 'RunnerTalkDetail_Like', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
})

export const RunnerTalkDetail_isBookMarked = atom({
    key: 'RunnerTalkDetail_isBookMarked', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
})