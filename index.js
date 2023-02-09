function Capitalize(name) {
  var words = name.split(" ");
  var capitalWords = [];
  words.forEach((e) => {
    const first = e[0].toUpperCase();
    const last = e.slice(1).toLowerCase();
    capitalWords.push(first + last);
  });
  return capitalWords.join(" ");
}

const dark = "🌙";
const light = "🌚";

let user = {
  name: "",
  theme: "",
  new_tab: "",
};

function setName() {
  let newName; 
  let preference = JSON.parse(localStorage.getItem("HELPAGE_SETTINGS"));
  if (localStorage.getItem("HELPAGE_SETTINGS") && preference.name != "") {
 
    newName = preference.name;
    user.name = newName;
  } else {
 
    let username_input = prompt("Please enter your name:");

   
    if (!username_input) {
      return;
    }

    newName = Capitalize(username_input); 
    user.name = Capitalize(username_input); 
    localStorage.setItem("HELPAGE_SETTINGS", JSON.stringify(user));
  }

  console.log("setName: " + JSON.stringify(user));
  $("#user_name").text(newName);
}

$("#name_change").click(function () {
  if (localStorage.getItem("HELPAGE_SETTINGS")) {

    let preference = JSON.parse(localStorage.getItem("HELPAGE_SETTINGS"));
    preference.name = "";
    user.name = "";
    localStorage.setItem("HELPAGE_SETTINGS", JSON.stringify(user));
  }
  setName();
});


function setTheme() {
  let newTheme; 
  let preference = JSON.parse(localStorage.getItem("HELPAGE_SETTINGS"));
  if (localStorage.getItem("HELPAGE_SETTINGS") && preference.theme != "") {
    
    newTheme = preference.theme;
    user.theme = preference.theme;
  }
  else {
    
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      newTheme = "dark";
    }
    else {
      newTheme = "light";
    }
    user.theme = newTheme; 
    localStorage.setItem("HELPAGE_SETTINGS", JSON.stringify(user));
  }
 
  $('.light_dark').addClass(newTheme);
  $('.light_dark_neo').addClass(newTheme + "_neo");
}


$("#dark-mode-toggle-button").on("click", function () {
  if ($("body").hasClass("dark")) {
 

    user.theme = "light";
    localStorage.setItem("HELPAGE_SETTINGS", JSON.stringify(user));
    
    $("#dark-mode-toggle-button").text("🌙");
   
    $(".light_dark").removeClass("dark");
    $(".light_dark").addClass("light");
 
    $(".icons").removeClass("dark_neo");
    $(".icons").addClass("light_neo");
   
    $(".searchBar, .searchButton").removeClass("dark_neo");
    $(".searchBar, .searchButton").addClass("light_neo");
  } else {
  

    user.theme = "dark";
    localStorage.setItem("HELPAGE_SETTINGS", JSON.stringify(user));
    
    $("#dark-mode-toggle-button").text("🌚");
   
    $(".light_dark").removeClass("light");
    $(".light_dark").addClass("dark");
    
    $(".icons").removeClass("light_neo");
    $(".icons").addClass("dark_neo");
   
    $(".searchBar, .searchButton").removeClass("light_neo");
    $(".searchBar, .searchButton").addClass("dark_neo");
  }
});

function setCC() {
  let openInNewTab; 
  let preference = JSON.parse(localStorage.getItem("HELPAGE_SETTINGS"));
  if (localStorage.getItem("HELPAGE_SETTINGS") && preference.cc != "") {
   
    openInNewTab = preference.cc;
    user.cc = preference.cc;
  } else {
   
    if ($("#closedCaptions").is(":not(:checked)")) {
      openInNewTab = "OFF";
    } else {
      openInNewTab = "ON";
    }
    user.cc = openInNewTab; 
    localStorage.setItem("HELPAGE_SETTINGS", JSON.stringify(user));
  }
  // action
  if (openInNewTab === "ON") {
    $("#closedCaptions").prop("checked", true); 
    $(".hover_txt").show();
  } else if (openInNewTab === "OFF") {
    $("#closedCaptions").prop("checked", false); 
    $(".hover_txt").hide();
  } else {
    console.log("CC Not recorded");
  }
}


$("#closedCaptions").click(function () {
  let preference = JSON.parse(localStorage.getItem("HELPAGE_SETTINGS"));
  if (localStorage.getItem("HELPAGE_SETTINGS")) {
    
    preference.cc = "";
    user.cc = "";
    localStorage.setItem("HELPAGE_SETTINGS", JSON.stringify(user));
  }
  setCC();
});

function setNewTab() {
  let openInNewTab; 
  let preference = JSON.parse(localStorage.getItem("HELPAGE_SETTINGS"));
  if (localStorage.getItem("HELPAGE_SETTINGS") && preference.new_tab != "") {
    
    openInNewTab = preference.new_tab;
    user.new_tab = preference.new_tab;
  } else {
    
    if ($("#newTab").is(":not(:checked)")) {
      openInNewTab = "OFF";
    } else {
      openInNewTab = "ON";
    }
    user.new_tab = openInNewTab; 
    localStorage.setItem("HELPAGE_SETTINGS", JSON.stringify(user));
  }
  // action
  if (openInNewTab === "ON") {
    $("#newTab").prop("checked", true); 
    $(".icons").children("a").attr("target", "_blank");
  } else if (openInNewTab === "OFF") {
    $("#newTab").prop("checked", false); 
    $(".icons").children("a").removeAttr("target");
  } else {
    console.log("New Tab Not recorded");
  }
}

$("#newTab").click(function () {
  let preference = JSON.parse(localStorage.getItem("HELPAGE_SETTINGS"));
  if (localStorage.getItem("HELPAGE_SETTINGS")) {
 
    preference.new_tab = "";
    user.new_tab = "";
    localStorage.setItem("HELPAGE_SETTINGS", JSON.stringify(user));
  }
  setNewTab();
});


function initializeHelpage() {
  setName();
  setTheme();
  setCC();
  setNewTab();
}


$(function () {
  console.log("ready!");
  initializeHelpage();
});
