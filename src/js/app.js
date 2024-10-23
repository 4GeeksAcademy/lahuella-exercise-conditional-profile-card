import "../style/index.css";

function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console
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
  let colorBackground = variables.colorBackground || "#2cdf9a";
  function lighterColor(color, percent) {
    const num = parseInt(color.slice(1), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      G = ((num >> 8) & 0x00ff) + amt,
      B = (num & 0x0000ff) + amt;
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
        .toUpperCase()
    );
  }
  let hoverColor = lighterColor(colorBackground, +20);
  document.querySelector("#widget_content").innerHTML = `<div class="widget">
            ${cover}
          <img src="${variables.avatarURL}" class="photo" />
          <h1>${variables.name} ${variables.lastName}</h1>
          <h2>${variables.role}</h2>
          <h3>${variables.bestLanguage}</h3>
          <h4>${variables.city}, ${variables.country}</h4>
          <ul class= ${variables.socialMediaPosition} style="background-color: ${colorBackground};">
            <li><a href="https://twitter.com/${variables.twitter}"><i class="fab fa-twitter"></i></a></li>
            <li><a href="https://github.com/${variables.github}"><i class="fab fa-github"></i></a></li>
            <li><a href="https://linkedin.com/in/${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>
            <li><a href="https://instagram.com/${variables.instagram}"><i class="fab fa-instagram"></i></a></li>
          </ul>
        </div>
        <style>
      .widget ul li:hover > a {
        background-color: ${hoverColor}; /* Color de hover dinámico */
      }
    </style>
    `;
}

window.onload = function() {
  window.variables = {
    includeCover: true,
    background:
      "https://officebanao.com/wp-content/uploads/2024/03/modern-office-room-with-white-walls.jpg",
    avatarURL:
      "https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-man-silhouette-on-white-background-png-image_4853539.png",
    socialMediaPosition: "position-left",
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
  render(window.variables);
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
  document
    .getElementById("colorSelector")
    .addEventListener("change", function(e) {
      const selectedColor = e.target.value;
      if (selectedColor) {
        window.variables.colorBackground = selectedColor;
        render(window.variables);
      }
    });

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      const attribute = e.target.getAttribute("for");
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values));
    });
  });
};
