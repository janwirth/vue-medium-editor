// Because Medium Editor does not support SSR, we just render in that case
import interactive from './interactive'
import renderOnly from './renderOnly'

export default process.browser ? interactive : renderOnly
