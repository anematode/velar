import { ReactComponent as SolidIcon } from './icons/icon-solid.svg'
import { ReactComponent as DashedIcon } from './icons/icon-dashed.svg'
import { ReactComponent as DottedIcon } from './icons/icon-dotted.svg'

const SOLID = { thickness: 2, dashPattern: [], name: 'Solid', Icon: SolidIcon }

const DASHED = {
  thickness: 2,
  dashPattern: [5, 5],
  name: 'Dashed',
  Icon: DashedIcon
}

// HACK: Dotted dash patterns are a bit broken atm, so using 0.0001
const DOTTED = {
  thickness: 4,
  dashPattern: [0.0001, 8],
  name: 'Dotted',
  Icon: DottedIcon
}

export const lineStyles = { SOLID, DASHED, DOTTED }
