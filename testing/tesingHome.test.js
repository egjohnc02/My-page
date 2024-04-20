import userEvent from '@testing-library/user-event'
import Home from '/pages/Home.html'

const user = userEvent.setup()

await user.keyboard('[ShiftLeft>]') // Press Shift (without releasing it)
await user.click(element) // Perform a click with `shiftKey: true`
