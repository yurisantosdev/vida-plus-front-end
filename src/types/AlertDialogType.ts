import { ALERT_TYPE } from 'react-native-alert-notification';

export type AlertDialogType = {
    title: string
    textBody: string
    textButton: string
    typeAlert: ALERT_TYPE
    onPressButton?: any
}