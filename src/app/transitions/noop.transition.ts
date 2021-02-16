import {createAnimation} from '@ionic/core/dist/collection/utils/animation/animation';

export function noopTransition(_, opts) {
    return createAnimation();
}

