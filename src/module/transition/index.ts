import {Module} from "vuex";
import {TransitionState, RootState} from "../../types";
import {OBSEventTypes, OBSResponseTypes} from "obs-websocket-js/dist/types";

const obsTransitionModule: Module<TransitionState, RootState> = {
    state: {
        cursor: 0.0
    },
    actions: {
        'init'({getters:{client}, commit,dispatch}) {
            client.on('SceneTransitionEnded', (state:OBSEventTypes['CurrentProgramSceneChanged']) => commit('scenes/set/current',state.sceneName))
        },

        'connection/closed'({commit}) {
            commit('transition/reset')
        },
        async 'connection/ready'({dispatch}) {
            return dispatch('scenes/transition')
        },
        async 'transition/reload'({getters:{client},commit}){
            const status: OBSResponseTypes['GetCurrentSceneTransitionCursor'] = await client.call('GetCurrentSceneTransitionCursor')
            commit('transition/set/cursor',status.transitionCursor)
        },
        async 'transition/trigger'({getters:{client}},scene){
            await client.call('TriggerStudioModeTransition')
        },
    },
    getters: {
    },
    mutations: {

        'transition/reset'(state) {
            state.cursor = 0.0
        },
        'transition/set/cursor'(state, cursor:number ) {
            state.cursor = 0.0
        },
    }
}

export default obsTransitionModule