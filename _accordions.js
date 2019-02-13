/**
 * Expandable content module
 * (Normally this would be a partial JS)
 */

const accordions = document.querySelectorAll('.accordion__header')

accordions.forEach(header => {
  header.addEventListener('click', _ => {
    header.parentElement.classList.add('is-open')
    // animate
  })
})
