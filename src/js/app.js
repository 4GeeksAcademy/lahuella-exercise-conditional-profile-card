import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "right", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console
  // here we ask the logical questions to make decisions on how to build the html
  // if includeCover==false then we reset the cover code without the <img> tag to make the cover transparent.
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";
  if (variables.name == null) variables.name = "Write your name";
  if (variables.lastName == null) variables.lastName = "";
  if (variables.role == null) variables.role = "Your Job";
  if (variables.city == null) variables.city = "Your City";
  if (variables.country == null) variables.country = "Your Country";
  if (variables.bestLanguage == null) variables.bestLanguage = "Best Language";
  if (variables.avatarURL == null)
    variables.avatarURL =
      "https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-man-silhouette-on-white-background-png-image_4853539.png";
  // reset the website body with the new html output
  document.querySelector("#widget_content").innerHTML = `<div class="widget">
            ${cover}
          <img src="${variables.avatarURL}" class="photo" />
          <h1>${variables.name} ${variables.lastName}</h1>
          <h2>${variables.role}</h2>
          <h3>${variables.bestLanguage}</h3>
          <h4>${variables.city}, ${variables.country}</h4>
          <ul class= ${variables.socialMediaPosition}>
            <li><a href="https://twitter.com/${variables.twitter}"><i class="fab fa-twitter"></i></a></li>
            <li><a href="https://github.com/${variables.github}"><i class="fab fa-github"></i></a></li>
            <li><a href="https://linkedin.com/in/${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>
            <li><a href="https://instagram.com/${variables.instagram}"><i class="fab fa-instagram"></i></a></li>
          </ul>
        </div>
    `;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background:
      "https://officebanao.com/wp-content/uploads/2024/03/modern-office-room-with-white-walls.jpg",
    // this is the url for the profile avatar
    avatarURL:
      "https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-man-silhouette-on-white-background-png-image_4853539.png",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    bestLanguage: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time
  const avatars = {
    Placeholder:
      "https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-man-silhouette-on-white-background-png-image_4853539.png",
    FemaleAvatar:
      "https://img.freepik.com/foto-gratis/muy-sonriente-alegremente-femenina-cabello-rubio-vestida-casualmente-mirando-satisfaccion_176420-15187.jpg",
    MaleAvatar:
      "https://r2.erweima.ai/imgcompressed/img/compressed_c5b0073e2f4244f269ef19b63b36acaa.webp"
  };
  const backgrounds = {
    OfficeImg:
      "https://officebanao.com/wp-content/uploads/2024/03/modern-office-room-with-white-walls.jpg",
    CityImg:
      "https://as2.ftcdn.net/v2/jpg/03/10/42/27/1000_F_310422728_gvGj4cxa8MZDbJOPws9MgQXUslt7jpxF.jpg",
    HouseImg:
      "https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440"
  };
  document
    .getElementById("avatarSelector")
    .addEventListener("change", function(e) {
      const selectedAvatar = e.target.value;
      if (selectedAvatar && avatars[selectedAvatar]) {
        window.variables.avatarURL = avatars[selectedAvatar];
        render(window.variables);
      }
    });
  document
    .getElementById("backgroundSelector")
    .addEventListener("change", function(e) {
      const selectedBackground = e.target.value;
      if (selectedBackground && backgrounds[selectedBackground]) {
        window.variables.background = backgrounds[selectedBackground];
        render(window.variables);
      }
    });

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
