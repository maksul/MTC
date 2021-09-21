import * as types from '../types';

const initialState = {
    mgmtProfiles: [],
    loading: false,
    isLoaded: false,
    isMgmtProfileCreated: false,
    isMgmtProfileUpdated: false,
    isMgmtProfileDeleted: false
}

// export mgmtProfile reducet
const mgmtProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_MGMTPROFILES:
            return {
                ...state,
                mgmtProfiles: action.payload,
                loading: false,
                isLoaded: true
            };
        case types.MGMTPROFILES_LOADING:
            return {
                ...state,
                loading: true
            }
        case types.ADD_MGMTPROFILE:
            return {
                ...state,
                mgmtProfiles: [
                    action.payload, ...state.mgmtProfiles
                ],
                isMgmtProfileCreated: true
            }
        case types.RESET_MGMTPROFILE_CREATED:
            return {
                ...state,
                isMgmtProfileCreated: false
            }
        case types.UPDATE_MGMTPROFILE:
            return {
                ...state,
                mgmtProfiles: state
                    .mgmtProfiles
                    .map(mgmtProfile => {
                        if (mgmtProfile._id === action.payload._id) {
                            return action.payload;
                        } else {
                            return mgmtProfile;
                        }
                    }),
                isMgmtProfileUpdated: true
            }
        case types.RESET_MGMTPROFILE_UPDATED:
            return {
                ...state,
                isMgmtProfileUpdated: false
            }
        case types.DELETE_MGMTPROFILE:
            return {
                ...state,
                mgmtProfiles: state
                    .mgmtProfiles
                    .filter(mgmtProfile => mgmtProfile._id !== action.payload),
                isMgmtProfileDeleted: true
            }
        case types.RESET_MGMTPROFILE_DELETED:
            return {
                ...state,
                isMgmtProfileDeleted: false
            }
        default:
            return state;
    }
}

export default mgmtProfileReducer;