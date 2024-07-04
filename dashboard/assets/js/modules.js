

if (user.type == "super_admin") {
  console.log("super admin");
  $("#modules").html(
    `
    <li>
          <a href="#">
            <span class="icon">

              <img src="/dashboard/assets/imgs/cowlogo.png"" width="40px" height="40px" style="margin-top: 12px;" />
            </span>
            <span class="title2"><strong>TrashCar</strong>
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
        <a href="#monitoring">
          <span class="icon">
          <ion-icon name="aperture"></ion-icon>
          </span>
          <span class="title">Monitoreo</span>
        </a>
      </li>
      <script>;
        window.open("#monitoring", "_self");
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
} else if (user.type == "2") {
  console.log("editor");
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
        <a href="#monitoring">
          <span class="icon">
          <ion-icon name="location-outline"></ion-icon>
          </span>
          <span class="title">Monitoreo</span>
        </a>
      </li>
      <script>;
        window.open("#monitoring", "_self");
      </script>

    `
  );
} else if (user.type == "1") {
  console.log("admin");
  $("#modules").html(
    `
    <li>
    <a href="#">
      <span class="icon">

        <img src="/dashboard/assets/imgs/cowlogo.png"" width="40px" height="40px" style="margin-top: 12px;" />
      </span>
      <span class="title2"><strong>TrashCar</strong>
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
  <a href="#monitoring">
    <span class="icon">
    <ion-icon name="aperture"></ion-icon>
    </span>
    <span class="title">Monitoreo</span>
  </a>
</li>
<script>;
  window.open("#monitoring", "_self");
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
} 

function urlModulo(url) {
  return (
    "<iframe src='" +
    url +
    "' style='width: 100%; height: 100%; border: none;'></iframe>"
  );
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
  }else if ("#monitoring" == modulo) {
    contenedor.innerHTML = urlModulo("assets/modules/monitoring.html");
    document.getElementById("start").innerText = "Monitoreo";
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
if(user.type == "super_admin" || user.type == "1" || user.type == "2"){
  listaModulos_SA(window.location.hash, contentModulo);
}

linkModulo.forEach((elemento) => {
  elemento.addEventListener("click", function () {
    if(user.type == "super_admin" || user.type == "1" || user.type == "2"){
      listaModulos_SA(elemento.getAttribute("href") + "", contentModulo);
    }
  });
});
getReference()

function getReference(){
  db.collection("reference").doc("point").get().then(ref =>{
    if(ref.exists){
      let x = {lat:ref.data().lat,lng:ref.data().lng,zoom:ref.data().zoom}
      localStorage.setItem("reference",JSON.stringify(x))
    }
})
}