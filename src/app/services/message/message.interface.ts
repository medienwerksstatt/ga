import {OSNotification} from '@ionic-native/onesignal';

export interface MessageInterface extends OSNotification {
    opened: boolean;
}
