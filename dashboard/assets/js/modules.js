

if (user.type == "super_admin") {
  console.log("super admin");
  $("#modules").html(
    `
    <li>
          <a href="#">
            <span class="icon">

              <img src="/dashboard/assets/imgs/cowlogo.png"" width="40px" height="40px" style="margin-top: 12px;" />
            </span>
            <span class="title2"><strong>TrashNow</strong>
              <p id="typeUser">Panel</p>
            </span>
          </a>
        </li>

        <li>
          <a href="#dashboard" class="links_modulo">
            <span class="icon">
              <ion-icon name="home-outline"></ion-icon>
            </span>
            <span class="title">Inicio</span>
          </a>
        </li>
        <script>;
          window.open("#dashboard", "_self");
        </script>

        <li>
          <a href="#users">
            <span class="icon">
              <ion-icon name="people-outline"></ion-icon>
            </span>
            <span class="title">Usuarios</span>
          </a>
        </li>
        <script>;
          window.open("#users", "_self");
        </script>

        <li>
          <a href="#drivers">
            <span class="icon">
            <ion-icon name="speedometer-outline"></ion-icon>
            </span>
            <span class="title">Conductores</span>
          </a>
        </li>
        <script>;
          window.open("#drivers", "_self");
        </script>


        <li>
          <a href="#vehicles">
            <span class="icon">
            <ion-icon name="car-outline"></ion-icon>
            </span>
            <span class="title">Vehículos</span>
          </a>
        </li>
        
        <li>
          <a href="#sectors">
            <span class="icon">
            <ion-icon name="map-outline"></ion-icon>
            </span>
            <span class="title">Sectores</span>
          </a>
        </li>
        <script>;
          window.open("#sectors", "_self");
        </script>

        <li>
          <a href="#zones">
            <span class="icon">
            <ion-icon name="compass-outline"></ion-icon>
            </span>
            <span class="title">Zonas</span>
          </a>
        </li>
        <script>;
          window.open("#zones", "_self");
        </script>

        <li>
          <a href="#routes">
            <span class="icon">
            <ion-icon name="location-outline"></ion-icon>
            </span>
            <span class="title">Microrutas</span>
          </a>
        </li>
        <script>;
          window.open("#routes", "_self");
        </script>

        <li>
          <a href="#reports">
            <span class="icon">
            <ion-icon name="stats-chart-outline"></ion-icon>
            </span>
            <span class="title">Reportes</span>
          </a>
        </li>
        <script>;
          window.open("#reports", "_self");
        </script>

        <li>
        <a href="#incidents">
          <span class="icon">
          <ion-icon name="albums-outline"></ion-icon>
          </span>
          <span class="title">Incidentes</span>
        </a>
      </li>
      <script>;
        window.open("#incidents", "_self");
      </script>

      <script>;
      window.open("#inicio", "_self");
    </script>

     
    `
  );
} else if (user.type == "operator") {
  console.log("operator");
  $("#modules").html(
    `
    <li>
          <a href="#">
            <span class="icon">

              <img src="/dashboard/assets/imgs/cowlogo.png"" width="40px" height="40px" style="margin-top: 12px;" />
            </span>
            <span class="title2"><strong>Cow Manager</strong>
              <p id="typeUser">Admin</p>
            </span>
          </a>
        </li>

        <li>
          <a href="#dashboard" class="links_modulo">
            <span class="icon">
              <ion-icon name="home-outline"></ion-icon>
            </span>
            <span class="title">Inicio</span>
          </a>
        </li>
        <script>;
          window.open("#dashboard", "_self");
        </script>

        <li>
          <a href="#users">
            <span class="icon">
              <ion-icon name="people-outline"></ion-icon>
            </span>
            <span class="title">Usuarios</span>
          </a>
        </li>
        <script>;
          window.open("#users", "_self");
        </script>


        <li>
          <a href="#branchs">
            <span class="icon">
            <ion-icon name="apps-outline"></ion-icon>
            </span>
            <span class="title">Area de pastoreo</span>
          </a>
        </li>

        <li>
          <a href="#transfers">
            <span class="icon">
            <ion-icon name="locate-outline"></ion-icon>
            </span>
            <span class="title">Monitoreo</span>
          </a>
        </li>
        <script>;
          window.open("#transfers", "_self");
        </script>

        <li>
          <a href="#checkout">
            <span class="icon">
            <ion-icon name="git-branch-outline"></ion-icon>
            </span>
            <span class="title">Rutas</span>
          </a>
        </li>

        <li>
          <a href="#reports">
            <span class="icon">
              <ion-icon name="bar-chart-outline"></ion-icon>
            </span>
            <span class="title">Reportes</span>
          </a>
        </li>

    `
  );
} 

function urlModulo(url) {
  return (
    "<iframe src='" +
    url +
    "' style='width: 100%; height: 100%; border: none;'></iframe>"
  );
}

function listaModulos_A(modulo, contenedor) {
  if ("#dashboard" == modulo) {
    contenedor.innerHTML = urlModulo("assets/modules/admin/dashboard.html");
    document.getElementById("start").innerText = "Inicio";
  } else if ("#transfers" == modulo) {
    contenedor.innerHTML = urlModulo("assets/modules/admin/transfers.html");
    document.getElementById("start").innerText = "Transferencias";
  } else if ("#" == modulo) {
    contenedor.innerHTML = "<br>&nbsp;&nbsp;Muy Pronto...";
  } else {
    contenedor.innerHTML = urlModulo("assets/modules/dashboard.html");
  }
}

function listaModulos_SA(modulo, contenedor) {
  if ("#dashboard" == modulo) {
    contenedor.innerHTML = urlModulo("assets/modules/dashboard.html");
    document.getElementById("start").innerText = "Panel de datos";
  } else if ("#users" == modulo) {
    contenedor.innerHTML = urlModulo("assets/modules/users.html");
    document.getElementById("start").innerText = "Usuarios";
  } else if ("#drivers" == modulo) {
    contenedor.innerHTML = urlModulo("assets/modules/drivers.html");
    document.getElementById("start").innerText = "Conductores";
  } else if ("#vehicles" == modulo) {
    contenedor.innerHTML = urlModulo("assets/modules/vehicles.html");
    document.getElementById("start").innerText = "Vehículos";
  }else if ("#sectors" == modulo) {
    contenedor.innerHTML = urlModulo("assets/modules/sectors.html");
    document.getElementById("start").innerText = "Sectores";
  } 
  else if ("#zones" == modulo) {
    contenedor.innerHTML = urlModulo("assets/modules/zones.html");
    document.getElementById("start").innerText = "Zonas";
  } else if ("#routes" == modulo) {
    contenedor.innerHTML = urlModulo("assets/modules/microroutes.html");
    document.getElementById("start").innerText = "Micro-rutas";
  }else if ("#incidents" == modulo) {
    contenedor.innerHTML = urlModulo("assets/modules/incidents.html");
    document.getElementById("start").innerText = "Incidentes";
  }else if ("#reports" == modulo) {
    contenedor.innerHTML = urlModulo("assets/modules/reports.html");
    document.getElementById("start").innerText = "Reportes";
  } else if ("#" == modulo) {
    contenedor.innerHTML = "<br>&nbsp;&nbsp;Muy Pronto...";
  } else {
    contenedor.innerHTML = urlModulo("assets/modules/dashboard.html");
  }
}

var contentModulo = document.querySelector(".body-content");
let linkModulo = document.querySelector(".nav-list").querySelectorAll("a");
if(user.type == "super_admin"){
  listaModulos_SA(window.location.hash, contentModulo);
}else if(user.type == "admin"){
  listaModulos_A(window.location.hash, contentModulo);
}

linkModulo.forEach((elemento) => {
  elemento.addEventListener("click", function () {
    if(user.type == "super_admin"){
      listaModulos_SA(elemento.getAttribute("href") + "", contentModulo);
    }else if(user.type == "admin"){
      listaModulos_A(elemento.getAttribute("href") + "", contentModulo);
    }
  });
});


