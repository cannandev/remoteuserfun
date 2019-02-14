/**
 * Profile data 
 */
const accordion = document.querySelector('.accordion')
const url = 'https://randomuser.me/api/?results=4&?nat=us,dk,fr,gb' // get 4 random users

 // Function to toggle expandables
 const toggler = e => {
    if (e.target.matches('.accordion__profile')) {
      e.target.parentElement.classList.toggle('is-open')
      // but now clicking on child elements (button, img, name, etc.) won't open .accordion__contact
    }
}

 // Function to add a CSS class 
 const addClass = (elem, className) => {
  elem.classList.add(className)
 }

 // Function to append multiple elements to a parent
 const appender = (parent, elemArray) => {
   elemArray.forEach(elem => parent.appendChild(elem))
 }

fetch(url)
  .then((response) => response.json()) // Transform the data into json
  .then(function(data) {
    // create and append the profile details
    let profiles = data.results
    return profiles.map(function(profile) {
      let drawer = document.createElement('div'),
          profileContainer = document.createElement('div'),
          contactContainer = document.createElement('div'),
          profileInfo = document.createElement('h2'),
          img = document.createElement('img'),
          name = document.createElement('strong'),
          date = document.createElement('span'),
          location = document.createElement('span'),
          phoneInfo = document.createElement('div'),
          emailInfo = document.createElement('div')

      // Get the profile image 
      addClass(img, 'profile__image');
      img.src = profile.picture.medium
      
      // Get the profile name
      addClass(name, 'profile__name')
      name.innerHTML = `${profile.name.first} ${profile.name.last}`
      
      // Convert the dob to a date object. Get only the year.
      let year = new Date(profile.dob.date)
      addClass(date, 'profile__date')
      date.innerHTML = `(${year.getFullYear()})`
      
      // Get the location. Need function to map two-letter country to full name
      addClass(location, 'profile__location')
      location.innerHTML = `${profile.location.city}, ${profile.nat}` 

      // Add all profileInfo content (h2)
      addClass(profileInfo, 'profile__info')
      appender(profileInfo, [name, date, location])

      // Clone the existing element. 
      // @TODO: Need to remove hidden markup.
      let button = document.querySelector('.accordion__indicator.is-hidden')
      let indicator = button.cloneNode(true)
      indicator.classList.remove('is-hidden')

      // Add all profile content
      addClass(profileContainer, 'accordion__profile')
      appender(profileContainer, [img, profileInfo, indicator])

      // Add all contact content
      addClass(phoneInfo, 'contact__phone')
      phoneInfo.innerHTML = `<h3>Phone</h3><span class="contact__phone-number">${profile.phone}</span>`
      
      addClass(emailInfo, 'contact__email')
      emailInfo.innerHTML = `<h3>Email</h3><span class="contact__email-address">${profile.email}</span>`      
      
      addClass(contactContainer, 'accordion__contact')
      appender(contactContainer, [phoneInfo, emailInfo])

      // Add content to accordion drawer
      addClass(drawer, 'accordion__drawer')
      appender(drawer, [profileContainer, contactContainer])

      // Finally, attach drawer to accordion
      appender(accordion, [drawer])
      
    })
  })
  .then(function(res) {
    // Toggle each accordion. Give large click area, not just arrows.
    // Use event delegation to add listener to parent (.accordion), listen for clicked child (.accordion__profile).
    accordion.addEventListener('click', toggler)
  })
  .catch(function(error) {
    // Show any data errors
    console.log(error);
  }
)



