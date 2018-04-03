import decks from '../lib/libraries/decks';

const CLOSE_CARDS = 'scratch-gui/navigation/CLOSE_CARDS';
const VIEW_CARDS = 'scratch-gui/navigation/VIEW_CARDS';
const ACTIVATE_DECK = 'scratch-gui/navigation/ACTIVATE_DECK';
const NEXT_STEP = 'scratch-gui/navigation/NEXT_STEP';
const PREV_STEP = 'scratch-gui/navigation/PREV_STEP';
const TOGGLE_LIGHTBOX = 'scratch-gui/navigation/TOGGLE_LIGHTBOX';

const initialState = {
    visible: true,
    content: decks,
    activeDeckIndex: null,
    step: 0,
    lightboxVisible: false
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case CLOSE_CARDS:
        return Object.assign({}, state, {
            visible: false
        });
    case VIEW_CARDS:
        return Object.assign({}, state, {
            visible: true
        });
    case ACTIVATE_DECK:
        return Object.assign({}, state, {
            activeDeckIndex: action.activeDeckIndex,
            step: 0
        });
    case TOGGLE_LIGHTBOX:
        return Object.assign({}, state, {
            lightboxVisible: !state.lightboxVisible
        });
    case NEXT_STEP:
        if (state.activeDeckIndex !== null) {
            const steps = state.content[state.activeDeckIndex].steps.length;
            if (state.step + 1 < steps - 1) {
                return Object.assign({}, state, {
                    step: state.step + 1
                });
            }
            return Object.assign({}, state, {
                activeDeckIndex: null,
                step: 0
            });

        }
        return state;
    case PREV_STEP:
        if (state.activeDeckIndex !== null) {
            const steps = state.content[state.activeDeckIndex].steps.length;
            if (state.step > 0) {
                return Object.assign({}, state, {
                    step: state.step - 1
                });
            }
        }
        return state;
    default:
        return state;
    }
};

const activateDeck = function (activeDeckIndex) {
    return {
        type: ACTIVATE_DECK,
        activeDeckIndex
    };
};

const viewCards = function () {
    return {type: VIEW_CARDS};
};

const closeCards = function () {
    return {type: CLOSE_CARDS};
};

const nextStep = function () {
    return {type: NEXT_STEP};
};

const prevStep = function () {
    return {type: PREV_STEP};
};

const toggleLightbox = function () {
    return {type: TOGGLE_LIGHTBOX};
};

export {
    reducer as default,
    activateDeck,
    viewCards,
    closeCards,
    nextStep,
    prevStep,
    toggleLightbox
};
