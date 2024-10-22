const _paq = window._paq || [];
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(["disableCookies"]);
_paq.push(["trackPageView"]);
_paq.push(["enableLinkTracking"]);
_paq.push(["setTrackerUrl", "https://stats.cihar.com/matomo.php"]);
_paq.push(["setSiteId", "12"]);

const ready = (callback) => {
  if (document.readyState !== "loading") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
};

/* Actual table switching logic */
function switchTabs(removal, enable) {
  for (const child of document.querySelectorAll(removal)) {
    child.classList.remove("current");
  }
  document.getElementById(enable).classList.add("current");
}

/* Generic tab toggling code */
function tabToggle(targets, removal) {
  for (const element of document.querySelectorAll(targets)) {
    element.addEventListener("click", (e) => {
      const tab = e.target.getAttribute("data-tab");
      switchTabs(removal, tab);
      e.target.classList.add("current");
      if (tab === "monthly") {
        document.getElementById("dedicated-checkbox").checked = false;
      }
    });
  }
}

ready(() => {
  /* Mobile menu display */
  document.querySelector(".menu-show").addEventListener("click", (e) => {
    document.querySelector("body").classList.toggle("open-mobile");
    document.querySelector(".mobile-menu").classList.toggle("is-visible");
    e.preventDefault();
  });

  /* Languages menu */
  document.querySelector(".open-langs").addEventListener("click", (e) => {
    const thisParent = e.target.parentElement;
    const thisNext = e.target.nextElementSibling;
    if (thisParent.classList.contains("opened")) {
      thisParent.classList.remove("opened");
      thisNext.style.opacity = "0";
      setTimeout(() => {
        thisNext.classList.toggle("is-visible");
        thisNext.style.opacity = null;
      }, 350);
    } else {
      thisNext.style.display = "block";
      thisParent.classList.add("opened");
      setTimeout(() => {
        thisNext.classList.toggle("is-visible");
        thisNext.style.display = null;
      }, 20);
    }
    e.preventDefault();
  });

  /* Pricing tabs */
  tabToggle("ul.pricing-tabs li", "ul.pricing-tabs li, .tab-content");

  /* Yearly/monthly toggle */
  tabToggle(
    ".pricing-table-tabs-menu ul li",
    ".pricing-table-tabs-menu ul li, .tab-content",
  );
  /* Dedicated hosting toggle */
  for (const element of document.querySelectorAll("#dedicated-checkbox")) {
    element.addEventListener("change", (e) => {
      const yearly_pricing = document.getElementById("yearly-pricing");
      if (e.target.checked) {
        yearly_pricing.dispatchEvent(new Event("click"));
        switchTabs(".pricing-table-tabs-menu ul li, .tab-content", "dedicated");
      } else {
        switchTabs(".pricing-table-tabs-menu ul li, .tab-content", "yearly");
      }
      yearly_pricing.classList.add("current");
    });
  }
  for (const element of document.querySelectorAll(".dedicated-toggle")) {
    element.addEventListener("click", (e) => {
      const target = document.getElementById("dedicated-checkbox");
      target.checked = element.classList.contains("dedicated-enable");
      target.dispatchEvent(new Event("change"));
    });
  }

  /* Donate rewards selection */
  const donate_input = document.getElementById("donate-amount");
  if (donate_input) {
    for (const element of document.querySelectorAll(".rewards .choose")) {
      element.addEventListener("click", (e) => {
        const container = e.target.parentElement;
        container.parentElement
          .querySelector(".reward.checked")
          .classList.remove("checked");
        container.classList.add("checked");
        container.querySelector("input").checked = true;
        e.preventDefault();
      });
    }
    for (const element of document.querySelectorAll(".rewards .close")) {
      element.addEventListener("click", (e) => {
        document
          .querySelector(".rewards .fourth .choose")
          .dispatchEvent(new Event("click"));
        e.preventDefault();
      });
    }
    donate_input.addEventListener("change", (e) => {
      const amount = Number.parseInt(e.target.value);
      let found = 0;
      let highest = document.querySelector(".rewards .fourth");
      let highest_amount = Number.parseInt(highest.getAttribute("data-amount"));
      for (const element of document.querySelectorAll(".reward")) {
        const current_amount = Number.parseInt(
          element.getAttribute("data-amount"),
        );
        if (current_amount <= amount) {
          element.classList.remove("small");
          found++;
          if (highest_amount < current_amount) {
            highest = element;
            highest_amount = current_amount;
          }
        } else {
          element.classList.add("small");
          if (element.classList.contains("checked")) {
            element.querySelector(".close").dispatchEvent(new Event("click"));
          }
        }
      }
      highest.querySelector(".choose").click();

      if (found > 1) {
        document.querySelector(".whoa").classList.add("is-visible");
        document.querySelector(".nowhoa").classList.remove("is-visible");
      } else {
        document.querySelector(".whoa").classList.remove("is-visible");
        document.querySelector(".nowhoa").classList.add("is-visible");
      }
    });
    donate_input.dispatchEvent(new Event("change"));
  }

  /* VAT form */
  const vat_input = document.getElementById("id_vat_0");
  if (vat_input) {
    vat_input.addEventListener("change", (e) => {
      const value = e.target.value;
      if (value !== "") {
        document.querySelector(
          `#id_country·option[value="${value}"]`,
        ).selected = true;
      }
    });
    for (const element of document.querySelectorAll("#id_vat_0,#id_vat_1")) {
      element.addEventListener("focusout", (e) => {
        const country = document.getElementById("id_vat_0").value;
        const code = document.getElementById("id_vat_1").value;
        if (country && code) {
          const payload = new FormData();
          payload.append("vat", country + code);
          payload.append(
            "payment",
            document.querySelector('input[name="payment"]').value,
          );
          payload.append(
            "csrfmiddlewaretoken",
            document.querySelector('input[name="csrfmiddlewaretoken"]').value,
          );
          fetch("/js/vat/", {
            method: "POST",
            body: payload,
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.valid && data.name !== "---") {
                document.querySelector('input[name="name"]').value = data.name;
                const parts = data.address.trim().split("\n");
                document.querySelector('input[name="address"]').value =
                  parts[0];
                if (parts.length > 2) {
                  document.querySelector('input[name="address_2"]').value =
                    parts[1];
                }
                const city_parts = parts[parts.length - 1].split("  ");
                console.log(city_parts);
                console.log(parts[parts.length - 1]);
                if (city_parts.length > 1) {
                  document.querySelector('input[name="postcode"]').value =
                    city_parts[0];
                  document.querySelector('input[name="city"]').value =
                    city_parts.slice(1).join(" ");
                } else {
                  document.querySelector('input[name="city"]').value =
                    city_parts[0];
                }
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      });
    }
  }

  const sso = document.getElementById("SSO_Login");
  if (sso) {
    sso.submit();
  }

  for (const element of document.querySelectorAll("[data-clipboard-text]")) {
    element.addEventListener("click", (e) => {
      navigator.clipboard
        .writeText(e.target.getAttribute("data-clipboard-text"))
        .then(() => {
          e.preventDefault();
        });
    });
  }

  console.log(
    "%cStop!",
    "color: red; font-weight: bold; font-size: 50px; font-family: sans-serif; -webkit-text-stroke: 1px black;",
  );
  console.log(
    "%cThis is a browser feature intended for developers. If someone told you to copy-paste something here, they are likely trying to compromise your Weblate account.",
    "font-size: 20px; font-family: sans-serif",
  );
  console.log(
    "%cSee https://en.wikipedia.org/wiki/Self-XSS for more information.",
    "font-size: 20px; font-family: sans-serif",
  );
});

if (typeof SimpleSlider === "function") {
  new SimpleSlider(".page-slider", {
    slidesPerView: {
      850: 2,
      1165: 3,
    },
  });
}
