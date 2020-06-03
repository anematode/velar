// rollup -c src/designs/octicons/rollup.config.js

import * as octicons from '@primer/octicons-v2'

const customIcons = new Map()
function getCustomIcon (url) {
  if (customIcons.has(url)) {
    return customIcons.get(url)
  } else {
    const promise = fetch(url).then(r => r.ok ? r.text() : Promise.reject(r))
    customIcons.set(url, promise)
    return promise
  }
}

export default function load () {
  for (const icon of document.getElementsByClassName('icon')) {
    const label = icon.textContent
    if (icon.dataset.octicon) {
      const iconType = icon.dataset.octicon
      if (octicons[iconType]) {
        icon.innerHTML = octicons[iconType].toSVG({
          'aria-label': label
        })
      } else {
        console.warn(`${iconType} is not an octicon.`, icon)
      }
    } else if (icon.dataset.src) {
      getCustomIcon(icon.dataset.src)
        .then(svg => {
          icon.innerHTML = svg
          icon.querySelector('svg').setAttributeNS(null, 'aria-label', label)
        })
    }
  }
}
