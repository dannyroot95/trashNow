
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
let db = firebase.database();
let db2 = firebase.firestore();
var markers = []
var infoCowsArray = []

var sign = "Apetito"

    $("#signs").on("change", function () {
        var select = document.getElementById('signs');
        var value = select.options[select.selectedIndex].text;
        sign = value
      });

showCows()
infoCows()
//dataCows()

function showCows(){

        window.onload = function () {
            LoadMap();
        }

        function LoadMap() {

            db.ref('cows').on('value', (snapshot) => {
                markers = []
                snapshot.forEach((childSnapshot) => {
                    var location = childSnapshot.val().location
                    var lat = location.latitude
                    var lng = location.longitude
                    var time = location.time
                    var gender = location.gender
                    var obj = {title:childSnapshot.key,lat:lat,lng:lng,description:time,gender:gender}
                    markers.push(obj)
                });

                var latitude 
                var longitude
                var reference = JSON.parse(localStorage.getItem("reference"));
                if (reference != null && reference != "" && reference != undefined) {
                    latitude = reference.lat
                    longitude = reference.lng
                }else{
                    latitude = markers[0].lat
                    longitude = markers[0].lng
                }
        
                var mapOptions = {
                    center: new google.maps.LatLng(latitude, longitude),
                    zoom: 16,
                    mapTypeId: 'terrain'
                };
                var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);

                db2.collection("area").get().then(snapshot =>{
 
                    snapshot.forEach(query => {
                
                      // Construct the polygon.
                      const polygon = new google.maps.Polygon({
                        paths: query.data().shapes,
                        strokeWeight: 1,
                        fillColor: "#FFFFFF",
                        fillOpacity: .01,  //This changes throughout the program      
                        strokeColor: '#000000',
                        
                      });
                      
                      polygon.setMap(map);
                          
                    });
                  })
        
                //Create and open InfoWindow.
                var infoWindow = new google.maps.InfoWindow();
                var iconBase = {
                    url : '../imgs/icon-cow.png',
                    scaledSize: new google.maps.Size(50, 50)
                }

                var iconBase2 = {
                    url : '../imgs/icon-cow-male.png',
                    scaledSize: new google.maps.Size(50, 50)
                }
         
                for (var i = 0; i < markers.length; i++) {
                    var data = markers[i];
                    var marker 
                    var myLatlng = new google.maps.LatLng(data.lat, data.lng);
                    if(data.gender == "male"){
                        marker = new google.maps.Marker({
                            position: myLatlng,
                            map: map,
                            icon: iconBase2,
                            title: data.description
                        });
                    }else{
                        marker = new google.maps.Marker({
                            position: myLatlng,
                            map: map,
                            icon: iconBase,
                            title: data.description
                        });
                    }
               
         
                    //Attach click event to the marker.
                    (function (marker, data) {
                        google.maps.event.addListener(marker, "click", function (e) {
                            var str = data.title
                            var num_cow = str.split("cow")
                            //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
                            infoWindow.setContent(
                                '<div style = "width:250px;min-height:15px">' 
                                +'<label>'+'<strong>Vaca N°'+num_cow[1]+'</strong>'+'</label>'
                                +'</div>'+
                                '<div style = "width:250px;min-height:15px">' 
                                +'<label><strong>Fecha : </strong>'+onlyDateNumber(data.description*1000)+" - "+onlyHour(data.description*1000)+'</label>'
                                +'</div>'+

                                '<div style = "width:250px;min-height:15px;margin-top:8px;">' 
                                +'<center><button class="btnOptionConfig animate__animated animate__bounceIn" style="font-size:10px;" onclick="reportCow('+"'"+data.gender+","+data.title+","+data.lat+","+data.lng+"'"+')">Reportar</button>  <button class="btnOption animate__animated animate__bounceIn" onclick="showDataCow('+num_cow[1]+')" style="font-size:10px;">Ver datos</button></center>'
                                +'</div>'
                                );
                            infoWindow.open(map, marker);
                        });
                    })(marker, data);
                }

                document.getElementById("cows").innerHTML = ""
                dataCows()  

            });
        }    
}


function dataCows(){
    db.ref('cows').once('value', (snapshot) => {
        var ctx = 0
        var op = '<option value="0" style="display: none;">Seleccione.....</option>'
        $(op).appendTo('#cows');
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
          });
    
          document.getElementById("loading").style = "display:none;"
          document.getElementById("cows").style = "display:block;width:100%;"
      })
}

function reportCow(data){

    var array = data.split(",")
    var cow = array[1].split("cow")

    MicroModal.show("modal-report")
    document.getElementById("modal-title").innerHTML = "Reportar Vaca N°"+cow[1]

    if(array[0] == "female"){
        document.getElementById("gender").innerHTML = "Hembra"
        document.getElementById("gender").style = "font-weight:bold;color:#FA276A;"
        document.getElementById("img-gender").src = "../imgs/icon-cow.png"
    }else{
        document.getElementById("gender").innerHTML = "Macho"
        document.getElementById("gender").style = "font-weight:bold;color:#0262AD;"
        document.getElementById("img-gender").src = "../imgs/icon-cow-male.png"
    }
  
    document.getElementById("latitude").innerHTML = array[2]
    document.getElementById("longitude").innerHTML = array[3]
    document.getElementById("date").innerHTML = onlyDateNumber(Date.now())+" - "+onlyHour(Date.now())


}

function registerIncident(){

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

  function showDataCow(idCow){
    document.getElementById("common-name").value = ""
    document.getElementById("species").value = ""
    document.getElementById("race").value = ""
    document.getElementById("age").value = ""
    document.getElementById("birth-cow").value = ""
    document.getElementById("weight-cow").value = ""
    document.getElementById("status-cow").value = ""
    document.getElementById("origin-cow").value = ""
    document.getElementById("detail-cow").value = ""
    document.getElementById("footer-data-cow").innerHTML = ""
    var ctx = 0
    var cow 
    MicroModal.show("modal-data-cow")
    document.getElementById("modal-title-cow").innerHTML = "Datos de vaca #"+idCow

    document.getElementById("query-cow").innerHTML = "Buscando datos..."
    document.getElementById("query-cow").style = "font-weight:bold;" 

    db2.collection("info_cow").where("cow","==",idCow).get().then((query)=>{

        query.forEach((data)=>{

            if(data.data().cow == idCow){
                ctx++
                cow = data.data()
            }

        })

        if(ctx == 0){
            document.getElementById("query-cow").innerHTML = "No existen datos!"
            document.getElementById("query-cow").style = "color: red;font-weight:bold;" 
            document.getElementById("footer-data-cow").innerHTML = `<button onclick="saveInfoCow('${idCow}')" class="modal__btn modal__btn-primary" style="background: #fc0000;color: #fff;">Guardar datos</button>
            <button class="modal__btn" data-micromodal-close aria-label="Close this dialog window">
            Cancelar
            </button>`
        }else{
            document.getElementById("query-cow").innerHTML = ""
            document.getElementById("query-cow").style = "display:none;"

            document.getElementById("common-name").value = cow.common_name
            document.getElementById("species").value = cow.specie
            document.getElementById("race").value = cow.race
            document.getElementById("age").value = cow.age
            document.getElementById("birth-cow").value  = cow.cow_birth
            document.getElementById("weight-cow").value = cow.weight
            document.getElementById("status-cow").value = cow.status
            document.getElementById("origin-cow").value = cow.origin
            document.getElementById("detail-cow").value = cow.details

            document.getElementById("footer-data-cow").innerHTML = `<button onclick="editInfoCow('${idCow}')" class="modal__btn modal__btn-primary" style="background: #145A32;color: #fff;">Editar datos</button>
            <button class="modal__btn" data-micromodal-close aria-label="Close this dialog window">
            Cancelar
            </button>`
        }

    }).catch((error) => {
        document.getElementById("query-cow").innerHTML = "No existen datos!"
        document.getElementById("query-cow").style = "color: red;font-weight:bold;" 
    });

  }

  function saveInfoCow(id){

    var name = document.getElementById("common-name").value
    var specie = document.getElementById("species").value
    var race = document.getElementById("race").value
    var age = document.getElementById("age").value
    var birth = document.getElementById("birth-cow").value
    var weight = document.getElementById("weight-cow").value
    var status = document.getElementById("status-cow").value
    var origin = document.getElementById("origin-cow").value
    var details = document.getElementById("detail-cow").value

    if(name != "" && specie != "" && race != "" && age != "" && birth != "" && weight != "" && status != "" && origin != "" && details != ""){

        var data = {
            age : age,
            common_name : name,
            cow : parseInt(id),
            cow_birth : birth,
            details : details,
            origin : origin,
            race : race,
            specie : specie,
            status : status,
            weight : weight
        }

        db2.collection("info_cow").add(data)

        MicroModal.close("modal-data-cow")

        Swal.fire(
            'Muy bien!',
            'Los datos han sido registrados!',
            'success'
          )

    }else{
        Swal.fire(
            'Hey!',
            'Complete los campos!',
            'error'
          )
    }

  }

  function editInfoCow(id){

    var name = document.getElementById("common-name").value
    var specie = document.getElementById("species").value
    var race = document.getElementById("race").value
    var age = document.getElementById("age").value
    var birth = document.getElementById("birth-cow").value
    var weight = document.getElementById("weight-cow").value
    var status = document.getElementById("status-cow").value
    var origin = document.getElementById("origin-cow").value
    var details = document.getElementById("detail-cow").value

    if(name != "" && specie != "" && race != "" && age != "" && birth != "" && weight != "" && status != "" && origin != "" && details != ""){

        var data = {
            age : age,
            common_name : name,
            cow : parseInt(id),
            cow_birth : birth,
            details : details,
            origin : origin,
            race : race,
            specie : specie,
            status : status,
            weight : weight
        }

        db2.collection("info_cow").where("cow","==",parseInt(id)).get().then((query)=>{

            query.forEach((e) =>{
                console.log(e.data())
                if(e.data().cow == id){
                   
                    db2.collection("info_cow").doc(e.id).update(data)
                    MicroModal.close("modal-data-cow")
                    Swal.fire(
                        'Muy bien!',
                        'Los datos han sido actualizados!',
                        'success'
                      )
                }
            })

        })

    }else{
        Swal.fire(
            'Hey!',
            'Complete los campos!',
            'error'
          )
    }
}

function infoCows(){
    var ctx = 0
    db2.collection("info_cow").get().then((snap) =>{
        snap.forEach((e)=>{
            ctx++
            infoCowsArray.push([ctx,e.data().cow,e.data().common_name.toUpperCase(),
                e.data().specie.toUpperCase(),e.data().race.toUpperCase(),e.data().cow_birth,e.data().weight+"kg"])
        })
        document.getElementById("btn-info").style = "display:inline;margin-bottom: 8px;margin-top:-10px;font-size:12px;"
    })
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
    doc.text(30, 22, "Datos de informacion de animales : "+onlyDateNumber(Date.now()))
    doc.setFontSize(9)
    doc.text(155, 14, "RUC : "+"121212121212")
    doc.text(155, 19, "Direccion : "+"Jr.Los girasoles Mz6 L9")
    doc.text(155, 24, "Teléfono : "+"+51989280394")
	  doc.setFontSize(12)
	  doc.addImage('/dashboard/assets/imgs/cowlogo.png', 'JPEG', 7, 2, 20, 20)
      doc.autoTable({
      head: [['#','ID Vaca','Nombre común','Especie','Raza','Fecha de nacimiento','Peso']],
      body: infoCowsArray,
      theme: 'grid',
      styles : { halign : 'center'},
     headStyles :{fillColor : [0, 142, 118]}, 
     alternateRowStyles: {fillColor : [221, 252, 248]}, 
     tableLineColor: [0, 142, 118], 
     tableLineWidth: 0.1,
     margin: {top: 30},
      })
      doc.save('Informacion de animales_'+onlyDateNumber(Date.now())+'.pdf')
  
    }

    function showModalDeleteNode(){
        MicroModal.show("modal-delete-node")
    }

    function deleteNode(){

        var select = document.getElementById('cows');
        var selectValue = select.options[select.selectedIndex].text;
        var cow = selectValue.split("Vaca N°")[1]

        db.ref('cows/cow'+cow).remove()

        Toast.fire({
            icon: 'success',
            title: 'Nodo eliminado!'
          })

          MicroModal.close("modal-delete-node")
          document.getElementById("cows").innerHTML = ""
          dataCows()  
       
    }

    function alertDelete(){

        var select = document.getElementById('cows');
        var selectValue = select.options[select.selectedIndex].text;

        if(selectValue != "Seleccione....."){
            Swal.fire({
                title: 'Esta seguro de eliminar este nodo?',
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'No',
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  Swal.fire('Eliminado!', '', 'success')
                  deleteNode()
                } 
              })
        }else{
            Swal.fire(
                'Hey!',
                'Seleccione un nodo!',
                'error'
              )
        }

       

    }