import {atom} from 'recoil';

export const CompetitionSchedule_MonthLoading =atom({
    key:'CompetitionSchedule_MonthLoading',
    default:true,
})

export const CompetitionSchedule_AccceptableLoading =atom({
    key:'CompetitionSchedule_AccceptableLoading',
    default:true,
})

export const CompetitionSchedule_CalendarLoading = atom({
    key: 'CompetitionSchedule_Calendar', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
});

export const CompetitionSchedule_Error = atom({
    key: 'CompetitionSchedule_Error', // unique ID (with respect to other atoms/selectors)
    default: undefined, // default value (aka initial value)
})

export const CompetitionSchedule_AllLoading = atom({
    key: 'CompetitionSchedule_AllLoading', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
});