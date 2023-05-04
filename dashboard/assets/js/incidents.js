
var firebaseConfig = {
    apiKey: "AIzaSyC1rPBlZGVhDoca5IRkQYMOPsEJU_lKi5Q",
    authDomain: "cowiot.firebaseapp.com",
    databaseURL: "https://cowiot-default-rtdb.firebaseio.com",
    projectId: "cowiot",
    storageBucket: "cowiot.appspot.com",
    messagingSenderId: "359413020575",
    appId: "1:359413020575:web:2e64e053c12b4794d1afaa"
  };
  
  firebase.initializeApp(firebaseConfig);
  let db = firebase.firestore();
  var incidents = []
  var arrayInc = []

  allIncidents()

  function allIncidents(){

    db.collection("incidents").onSnapshot((snapshot) => {

        var ctx = 0

        incidents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        $("#tbody").html(
            incidents
              .map((file) => {

                var gender = file.gender
                if(gender == "male"){
                  gender = "MACHO"
                }else{
                  gender = "HEMBRA"
                }

                ctx++
                arrayInc.push([ctx,onlyDateNumber(file.date),onlyHour(file.date),file.cow,file.user,file.signs,gender])
                $("#cowsSpinner").hide();
                return `
                  <tr>
                    <td class="dnirow" scope='row' style='padding: 20px'>
                      ${ctx}
                    </td>
                    <td>
                    ${onlyDateNumber(file.date)}
                    </td>
                    <td>
                    ${onlyHour(file.date)}
                    </td>
                    <td>
                    <div class="div-typeuser"> 
                    ${file.user}
                    </div>
                    </td>
                    <td>
                    ${"Vaca N°"+file.cow}</b>
                    </td>
                      <td>
                    <button 
                    class="btnOptionConfig animate__animated animate__bounceIn"
                    onclick="setData('${file.cow}', '${file.date}', '${file.description}', '${file.gender}', '${file.lat}', '${file.lng}', '${file.user}')">
                    <ion-icon name="eye-outline" size="large"></ion-icon>
                      </button>
                    </td>
                  </tr>`;
              })
              .join("")
          );
       document.getElementById("btn-print").style = "display: block;background: #014581;color: #fff;"
    })

  }


  function onlyDateNumber(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();

      if(date <=9){
        date = "0"+date
      }
    var time = date + '/' + month + '/' + year;
    return time;
  }

  function onlyHour(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();

    var stringhour = hour
    var stringmin = min
    var stringseg = sec

    if(hour <=9){
      stringhour = "0"+hour
   }
    if(min <=9){
       stringmin = "0"+min
    }
    if(sec <=9){
      stringseg = "0"+sec
    }

    var time = stringhour + ':' + stringmin ;

    return time;
  }

  function setData(cow, date, description, gender, lat , lng , user) {

    var genderX = ""

    if(gender == "male"){
      genderX = "Macho"
    }else{genderX = "Hembra"}

    MicroModal.show("modal-1");
    document.getElementById("date-register").innerHTML = onlyDateNumber(parseInt(date))
    document.getElementById("id-cow").innerHTML = '#'+cow
    document.getElementById("gender-cow").innerHTML = genderX
    window.initMap = initMap(lat,lng)
    document.getElementById("description").value = description
    document.getElementById("register_by").innerHTML = user
  }



  function initMap(lat,lon) {
    const myLatLng = { lat: parseFloat(lat), lng: parseFloat(lon) };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 16,
      center: myLatLng,
    });
  
    new google.maps.Marker({
      position: myLatLng,
      map,
      title: "Hello World!",
    });
  }
  
  
  function printData(){

    Swal.fire({
      title: 'En breves se descargará el archivo!',
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },
    })
    

    var doc = new jspdf.jsPDF()
    doc.setFontSize(26)
    doc.text(30, 16, "Cow Manager")
    doc.setFontSize(8)
    doc.text(30, 22, "Fecha de generacion del reporte de incidentes : "+onlyDateNumber(Date.now()))
    doc.setFontSize(9)
    doc.text(155, 14, "RUC : "+"121212121212")
    doc.text(155, 19, "Direccion : "+"Jr.Los girasoles Mz6 L9")
    doc.text(155, 24, "Teléfono : "+"+51989280394")
	  doc.setFontSize(12)
	  doc.addImage('/dashboard/assets/imgs/cowlogo.png', 'JPEG', 7, 2, 20, 20)
      doc.autoTable({
      head: [['#','Fecha de incidente','Hora','ID Vaca','Reportado por','Signos','Género']],
      body: arrayInc,
      theme: 'grid',
      styles : { halign : 'center'},
     headStyles :{fillColor : [0, 142, 24]}, 
     alternateRowStyles: {fillColor : [221, 252, 216]}, 
     tableLineColor: [0, 142, 24], 
     tableLineWidth: 0.1,
     margin: {top: 30},
      })
      doc.save('Reporte general de incidentes_'+onlyDateNumber(Date.now())+'.pdf')
  
    }