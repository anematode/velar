// rollup -c src/designs/octicons/rollup.config.js

import * as octicons from '@primer/octicons-v2'

for (const icon of document.getElementsByClassName('icon')) {
  const iconType = icon.dataset.octicon
  if (!iconType) continue
  const label = icon.textContent
  if (octicons[iconType]) {
    icon.innerHTML = octicons[iconType].toSVG({
      'aria-label': label
    })
  } else {
    console.warn(`${iconType} is not an octicon.`, icon)
  }
}
