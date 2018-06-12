import { NavigationActions } from 'react-navigation'
import { StackActions } from 'react-navigation'

const routeName = "Splash"
export const handleLogout = (navigation) => /*async (dispatch) =>*/ {

        // heres where it gets 100% crazy and exhilarating
        return navigation.dispatch(
            StackActions.reset({
            // this says put it on index 0, aka top of stack
            index: 0,
            // this key: null is 9001% critical, this is what
            // actually wipes the stack
            key: null,
            // this navigates you to some screen that is in the Root Navigation Stack
            actions: [NavigationActions.navigate({routeName})]
        }))
}

// export const handleLogout = () => {StackActions.reset({
//   index: 0,
//   actions: [NavigationActions.navigate({ routeName: {routeName} })],
// });}