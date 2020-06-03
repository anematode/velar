import * as octicons from '@primer/octicons-v2'

for (const icon of document.getElementsByClassName('icon')) {
  const label = icon.textContent
  const iconType = icon.dataset.octicon
  if (octicons[iconType]) {
    icon.innerHTML = octicons[iconType].toSVG({
      'aria-label': label
    })
  } else {
    console.warn(`${iconType} is not an octicon.`, icon)
  }
}
