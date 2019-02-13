/**
 * Profile data 
 */
const accordion = document.querySelector('.accordion')
const url = 'https://randomuser.me/api/?results=4&?nat=us,dk,fr,gb' // get 4 random users

 // Function to toggle expandables
 const toggler = e => {
    if (e.target.closest('.accordion__drawer')) {
      e.target.closest('.accordion__drawer').classList.toggle('is-open')
    }
    // currentTarget? I need drawer, not profile
}

 // Function to add a CSS class and append to another element (two params)

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
      img.src = profile.picture.medium
      img.classList.add('profile__image')
      
      // Get the profile name
      name.classList.add('profile__name')
      name.innerHTML = `${profile.name.first} ${profile.name.last}`
      
      // Convert the dob to a date object. Get only the year.
      let year = new Date(profile.dob.date)
      date.classList.add('profile__date')
      date.innerHTML = `(${year.getFullYear()})`
      
      // Get the location. Need function to map two-letter country to full name
      location.classList.add('profile__location')
      location.innerHTML = `${profile.location.city}, ${profile.nat}` 

      // Add all profileInfo content (h2)
      profileInfo.classList.add('profile__info')
      profileInfo.appendChild(name)
      profileInfo.appendChild(date)
      profileInfo.appendChild(location)

      // Clone the existing element. Need to remove hidden markup.
      let button = document.querySelector('.accordion__indicator.is-hidden')
      let indicator = button.cloneNode(true)
      indicator.classList.remove('is-hidden')

      // Add all profile content
      profileContainer.classList.add('accordion__profile')
      profileContainer.appendChild(img)
      profileContainer.appendChild(profileInfo)
      profileContainer.appendChild(indicator)

      // Add all contact content
      phoneInfo.classList.add('contact__phone')
      phoneInfo.innerHTML = `<h3>Phone</h3><span class="contact__phone-number">${profile.phone}</span>`
      emailInfo.classList.add('contact__email')
      emailInfo.innerHTML = `<h3>Email</h3><span class="contact__email-address">${profile.email}</span>`      
      contactContainer.classList.add('accordion__contact')
      contactContainer.appendChild(phoneInfo)
      contactContainer.appendChild(emailInfo)

      // Add content to accordion drawer
      drawer.classList.add('accordion__drawer')
      drawer.appendChild(profileContainer)
      drawer.appendChild(contactContainer)

      // Finally, attach drawer to accordion
      accordion.appendChild(drawer)
      
    })
  })
  .then(function(res) {
    // Toggle each accordion. Give large click area, not just arrows.
    const expandables = accordion.querySelectorAll('.accordion__profile')
    expandables.forEach(elem => {
      elem.addEventListener('click', toggler)
    })
  })
  .catch(function(error) {
    // Show any data errors
    console.log(error);
  }
)



