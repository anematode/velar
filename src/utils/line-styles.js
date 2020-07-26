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

const DOTTED = {
  thickness: 4,
  dashPattern: [0, 8],
  name: 'Dotted',
  Icon: DottedIcon
}

export const lineStyles = { SOLID, DASHED, DOTTED }
