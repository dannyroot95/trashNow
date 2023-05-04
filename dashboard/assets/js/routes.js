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
  let db = firebase.database()
  let db2 = firebase.firestore()
  let currentCow 
  let currentCowData 
  picker()

  document.addEventListener("DOMContentLoaded", (_) => {
    document.getElementById("filters").addEventListener("change", (a) => {
      selectTypeFilter(a.target.value);
    });
  });

  document.addEventListener("DOMContentLoaded", (_) => {
    document.getElementById("datePerDay").addEventListener("change", (b) => {
      const dayMidnight = toTimestamp(b.target.value +" "+"00:01")
      const dayNight = toTimestamp(b.target.value +" "+"23:59")
      showCustomRoutes(dayMidnight/1000,dayNight/1000);
    });
  });


  document.addEventListener("DOMContentLoaded", (_) => {
    document.getElementById("datePerMonth").addEventListener("change", (c) => {
      const dateOfMonth = c.target.value
      const ds = dateOfMonth.split("-")
      const month = ds[1]
		  const year = ds[0]
	
   		const firstDay = new Date(year, (month-1), 1);
	   	const lastDay = new Date(year, (month-1) + 1, 0);

       showCustomRoutes(toTimestamp(firstDay)/1000,toTimestamp(lastDay)/1000)
    
    });
  });

  

  db.ref('cows').once('value', (snapshot) => {
    var ctx = 0
    snapshot.forEach(document =>{
      ctx++
      var result = document.key
      var cow = result.split("cow")
      var area = '<option value="'+ctx+'">Vaca N°'+cow[1]+'</option>'
      $(area).appendTo('#cows');
    })

    $("#cows").on("change", function () {
        var select = document.getElementById('cows');
        var value = select.options[select.selectedIndex].text;
       
        var cow = value.split("Vaca N°")

        searchRoutes("cow"+cow[1])
        currentCow = "cow"+cow[1]

      });

      document.getElementById("loading").style = "display:none;"
      document.getElementById("cows").style = "position:relative;top:-30px;left: -360px;"

  })

  function searchRoutes(cow){

    var points = []
    var ctx = 0

    db.ref('cows/'+cow).once('value', (snapshot) => {

        snapshot.forEach(document =>{

            if(document.key != "location"){
              ctx++
                var location = document.val()
                currentCowData = location
                points.push({lat:location.latitude,lng:location.longitude,time:location.time})
            }

        })

        if(ctx == 0){
          Swal.fire(
            'Oopss!',
            'No existen datos!',
            'warning'
          )
        }

        console.log(points)
        showRoutes(points)

    })

  }


  function showRoutes(points){


    var mapOptions = {
      center: new google.maps.LatLng(points[0].lat,points[0].lng),
      zoom: 18,
      mapTypeId: 'terrain'
    };
    
    var map = new google.maps.Map(document.getElementById("routes-map"), mapOptions);
    var infoWindow = new google.maps.InfoWindow();
    var iconBase = {
      url : '../imgs/point-route.png',
      scaledSize: new google.maps.Size(50, 50)
  }

  var lines = []
  var pos = 0

  for (var i = 0; i < points.length; i++) {

    var data = points[i];
    var marker 
    var myLatlng = new google.maps.LatLng(data.lat, data.lng);

    lines.push({lat:data.lat,lng:data.lng})
    
    marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      icon: iconBase,
      title: data.description
    });
    //Attach click event to the marker.
    (function (marker, data) {
        google.maps.event.addListener(marker, "click", function (e) {
          pos++
            //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
            infoWindow.setContent(
                '<div style = "width:200px;min-height:15px">'
                +'<label>'+'<strong>Poscición : '+"#"+pos+"</strong>"+''+'</label>'
                +'<br>' 
                +'<label>'+'<strong>Latitud : </strong>'+data.lat+''+'</label>'
                +'<br>'
                +'<label>'+'<strong>Longitud : </strong>'+data.lng+''+'</label>'
                +'</div>'+
                '<div style = "width:200px;min-height:15px">' 
                +'<label><strong>Fecha : </strong>'+onlyDateNumber(data.time*1000)+" - "+onlyHour(data.time*1000)+'</label>'
                +'</div>'
                );
            infoWindow.open(map, marker);
        });
    })(marker, data);
  }

  const flightPath = new google.maps.Polyline({
    path: lines,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  flightPath.setMap(map);
  document.getElementById("div-filters").style = "display:block;margin-bottom:20px;"

}


function showCustomRoutes(time1,time2){

    var points = []
  
    db.ref('cows/'+currentCow).once('value', (snapshot) => {

        snapshot.forEach(document =>{

            if(document.key != "location"){
                var location = document.val()
                if(location.time > time1 && location.time < time2){
                  points.push({lat:location.latitude,lng:location.longitude,time:location.time})
                }
            }

        })

        console.log(points)
        if (points.length === 0){
          Swal.fire(
            'Oopss!',
            'No existen datos!',
            'warning'
          )
        }else{
          showRoutes(points)
     }
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

function toTimestamp(strDate){
	var datum = Date.parse(strDate);
	return datum;
 }
   

function selectTypeFilter(value){

  if(value == "1"){

    document.getElementById("datePerDay").style = "display:inline;"
    document.getElementById("datePerRange").style = "display:none;"
    document.getElementById("datePerMonth").style = "display:none;"

  }else if(value == "2"){

    document.getElementById("datePerRange").style = "display:inline;"
    document.getElementById("datePerDay").style = "display:none;"
    document.getElementById("datePerMonth").style = "display:none;"

  }else{

    document.getElementById("datePerMonth").style = "display:inline;"
    document.getElementById("datePerDay").style = "display:none;"
    document.getElementById("datePerRange").style = "display:none;"

  }

}
function picker(){
  const picker = new easepick.create({
    element: document.getElementById('datePerRange'),
      css: ['https://cdn.jsdelivr.net/npm/@easepick/core@1.2.0/dist/index.css',
            'https://cdn.jsdelivr.net/npm/@easepick/range-plugin@1.2.0/dist/index.css',
          ],
             plugins: ['RangePlugin'],
             zIndex: 10,
             position:top,
             lang: "es-ES",
             format: "DD/MM/YYYY",
             setup(picker) {
                   picker.on('select', (e) => {
                   let startDate =  picker.getStartDate('DD MMM YYYY');
                   let endDate =  picker.getEndDate('DD MMM YYYY');
                   showCustomRoutes(toTimestamp(startDate)/1000,toTimestamp(endDate)/1000)
              })}
          });
}



function printRoute() {

Swal.fire({
  title: 'En breves se descargará el archivo!',
  timer: 3000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
  },
})


var cow = $("#cows option:selected").text()

html2canvas(document.querySelector("#routes-map")).then(canvas => {
  //document.body.appendChild(canvas)
  var pdf = new jspdf.jsPDF()

  pdf.setFontSize(26)
  pdf.text(30, 16, "Cow Manager")
  pdf.setFontSize(9)
  pdf.text(30, 22, "Ruta : "+cow)
  pdf.text(30, 26, "Fecha : "+onlyDateNumber(Date.now()))
  pdf.setFontSize(9)
  pdf.text(155, 14, "RUC : "+"121212121212")
  pdf.text(155, 19, "Direccion : "+"Jr.Los girasoles Mz6 L9")
  pdf.text(155, 24, "Teléfono : "+"+51989280394")
  pdf.setFontSize(12)
  pdf.addImage('/dashboard/assets/imgs/cowlogo.png', 'JPEG', 7, 2, 20, 20)

  pdf.addImage(canvas, 'JPEG', 7, 32, 195, 90);
  pdf.save('ruta '+cow+'.pdf')

});


}

function reportCow(){
  var select = document.getElementById('cows');
  var value = select.options[select.selectedIndex].text;
  MicroModal.show("modal-report")
  document.getElementById("modal-title").innerHTML = "Reportar "+value

  if(currentCowData.gender == "female"){
      document.getElementById("gender").innerHTML = "Hembra"
      document.getElementById("gender").style = "font-weight:bold;color:#FA276A;"
      document.getElementById("img-gender").src = "../imgs/icon-cow.png"
  }else{
      document.getElementById("gender").innerHTML = "Macho"
      document.getElementById("gender").style = "font-weight:bold;color:#0262AD;"
      document.getElementById("img-gender").src = "../imgs/icon-cow-male.png"
  }

  document.getElementById("latitude").innerHTML = currentCowData.latitude
  document.getElementById("longitude").innerHTML = currentCowData.longitude
  document.getElementById("date").innerHTML = onlyDateNumber(Date.now())+" - "+onlyHour(Date.now())


}

function registerIncident(){

  var select = document.getElementById('signs');
  var sign = select.options[select.selectedIndex].text;

  var user = JSON.parse(localStorage.getItem("user"))
  var splitter = (document.getElementById("modal-title").innerHTML).split("N°")
  var cow = splitter[1]
  var description = document.getElementById("description").value
  var gender = document.getElementById("gender").innerHTML
  var latitude = document.getElementById("latitude").innerHTML
  var longitude = document.getElementById("longitude").innerHTML

  if(description != ""){

      document.getElementById("add").style = "display:none;"
      document.getElementById("registering").style = "display:block;"

      if(gender == "Hembra"){
          gender = "female"
      }else{
          gender = "male"
      }

      var obj = {
          cow : cow,
          date : Date.now(),
          description : description,
          gender : gender,
          lat : parseFloat(latitude),
          lng : parseFloat(longitude),
          signs : sign,
          user : user.name
      }

      db2.collection("incidents").add(obj).then(response =>{

          document.getElementById("registering").style = "display:none;"
          document.getElementById("description").value = ""
          MicroModal.close("modal-report")
          document.getElementById("add").style = "display: flex; justify-content: space-around;"

          const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'success',
              title: 'Incidente registrado!'
            })
         

      })

  }else{
    Swal.fire(
      'Oopss!',
      'Agregue una descripción!',
      'warning'
    )
  }


}