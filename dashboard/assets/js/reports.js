
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
let db = firebase.firestore()

function usersContent(){

    document.getElementById("content").innerHTML = ""

    document.getElementById("select").style = "display: flex;justify-content:center;align-items:center;margin-bottom:10px;"

    var user_content = `

    <button class="btn btn-outline-success" onclick="printToUser('admin')" style="font-size:22px;">Administrador</button>
    &nbsp;&nbsp;
    <button class="btn btn-outline-primary" onclick="printToUser('operator')" style="font-size:22px;">Operador</button>
    &nbsp;&nbsp;
    <button class="btn btn-outline-dark" onclick="printToUser('all')" style="font-size:22px;">Todos</button>

    `
    $(user_content).appendTo('#content')

}

function diseasesContent(){

    document.getElementById("content").innerHTML = ""

    document.getElementById("select").style = "display: flex;justify-content:center;align-items:center;margin-bottom:10px;"

    var diseases_content = `

    <div>
    <button class="btn btn-outline-dark" onclick="printToIllness('MASTITIS')" style="font-size:18px;">MASTITIS</button>
    <button class="btn btn-outline-dark" onclick="printToIllness('BABESIOSIS')" style="font-size:18px;">BABESIOSIS</button>
    <button class="btn btn-outline-dark" onclick="printToIllness('BRUCELOSIS')" style="font-size:18px;">BRUCELOSIS</button>
    <button class="btn btn-outline-dark" onclick="printToIllness('FIEBRE AFTOSA')" style="font-size:18px;">FIEBRE AFTOSA</button>
    <button class="btn btn-outline-dark" onclick="printToIllness('TUBERCULOSIS')" style="font-size:18px;">TUBERCULOSIS</button>
    <button class="btn btn-outline-dark" onclick="printToIllness('CLOSTRIDIOSIS')" style="font-size:18px;">CLOSTRIDIOSIS</button>
    <center style="margin-top:8px;">
    <button class="btn btn-outline-dark" onclick="printToIllness('LEPTOSPIROSIS')" style="font-size:18px;">LEPTOSPIROSIS</button>
    <button class="btn btn-outline-dark" onclick="printToIllness('PROBLEMAS EN LAS PEZUÑAS')" style="font-size:18px;">PROBLEMAS EN LAS PEZUÑAS</button>
    <button class="btn btn-outline-dark" onclick="printToIllness('PARÁSITOS')" style="font-size:18px;">PARÁSITOS</button>
    <button class="btn btn-outline-success" onclick="printToIllness('all')" style="font-size:18px;">TODOS</button>
    </div></center>
    `
    $(diseases_content).appendTo('#content')

}

function incidentContent(){

    document.getElementById("content").innerHTML = ""

    document.getElementById("select").style = "display: flex;justify-content:center;align-items:center;margin-bottom:10px;"

    var incident_content = `

    <button class="btn btn-outline-danger" onclick="printToIncident('today')" style="font-size:22px;">Hoy</button>
    &nbsp;&nbsp;
    <button class="btn btn-outline-warning" onclick="printToIncident('date_specific')" style="font-size:22px;">Fecha específica</button>
    &nbsp;&nbsp;
    <button class="btn btn-outline-primary" onclick="printToIncident('all')" style="font-size:22px;">Todos</button>

    `
    $(incident_content).appendTo('#content')

}


function printToUser(typeUser){

    Swal.fire({
        title: 'En breves se descargará el archivo!',
        timer: 4000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        },
      })
      

    var users = []
    var ctx = 0

    db.collection("users").get().then((query) =>{

        query.forEach(data => {
         
            if(data.data().type == typeUser){
                ctx++
                var type = ""

                if(data.data().type == "operator"){

                    type = "Operador"

                }else if(data.data().type == "admin"){
                    type = "Administrador"
                }


                users.push([ctx,data.data().name,type,data.data().dni,data.data().phone,data.data().email])

            }else if (typeUser == "all"){
                ctx++
                var type = ""
            
                if(data.data().type != "super_admin"){

                    if(data.data().type == "operator"){
                        type = "Operador"
    
                    }else if(data.data().type == "admin"){
                        type = "Administrador"
                    }
    
    
                    users.push([ctx,data.data().name,type,data.data().dni,data.data().phone,data.data().email])
                }

             

            }

        });

        if(typeUser == "all"){
            typeUser = "Todos los usuarios"
        }else if (typeUser == "operator"){
            typeUser = "Usuarios operadores"
        }else{
            typeUser = "Usuarios administradores"
        }

        printUsers(users,typeUser)

    })



}


function printToIllness(illness){

    Swal.fire({
        title: 'En breves se descargará el archivo!',
        timer: 5000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        },
      })
      

    var arrayIllness = []
    var ctx = 0

    if(illness != "all") {

        db.collection("incidents").where("signs", "==" ,illness).get().then((query) =>{

            query.forEach(data => {

                ctx++
                var gender = ""

                if(data.data().gender == "male"){

                    gender = "Macho"

                }else{
                    gender = "Hembra"
                }

                
                arrayIllness.push([ctx,data.data().cow,gender,data.data().signs])
    
            });

            if(ctx != 0){
                console.log(arrayIllness)
                printIllness(arrayIllness,illness)
            }else{
                    Swal.fire(
                        'Oopss!',
                        'No existen datos!',
                        'warning'
                      )
            }
    
           
    
        })
    }else{
        db.collection("incidents").get().then((query) =>{

            query.forEach(data => {

                ctx++

                var gender = ""

                if(data.data().gender == "male"){

                    gender = "Macho"

                }else{
                    gender = "Hembra"
                }

                arrayIllness.push([ctx,data.data().cow,gender,data.data().signs])
    
            });
    
            if(ctx != 0){
                console.log(arrayIllness)
                printIllness(arrayIllness,illness)
            }else{
                    Swal.fire(
                        'Oopss!',
                        'No existen datos!',
                        'warning'
                      )
            }
    
        })
    }
}

function printToIncident(typeQuery){


    var incidents = []
    var date

    if(typeQuery == "today"){

        
    Swal.fire({
        title: 'En breves se descargará el archivo!',
        timer: 4000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        },
      })

        var today = Date.now()
        date = onlyDateNumber(today)
        var first = onlyDateNumber(today).split("/")
        first = first[2]+"/"+first[1]+"/"+first[0]+" 00:01"
        first = toTimestamp(first)

        var second = onlyDateNumber(today).split("/")
        second = second[2]+"/"+second[1]+"/"+second[0]+" 23:59"
        second = toTimestamp(second)

        db.collection("incidents").where("date", ">=" ,first).where("date","<=",second).get().then((query) =>{

            var ctx = 0

            query.forEach(data => {
                ctx++
                var gender = ""

                if(data.data().gender == "male"){

                    gender = "Macho"

                }else{
                    gender = "Hembra"
                }
                incidents.push([ctx,data.data().cow,gender,data.data().signs,data.data().description,data.data().user])
            });

            if(ctx != 0){
                printIncident(incidents,date)
            }else{
                Swal.fire(
                    'Oopss!',
                    'No existen datos!',
                    'warning'
                  )
            }

            console.log(incidents)
            

        })

    }else if(typeQuery == "date_specific"){
        Swal.fire({
            title: 'Seleccione una fecha',
            html:
              '<input id="specific" type="date" placeholder="Selccione una fecha" />',
          
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Ok',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {

              var value = document.getElementById("specific").value
              if(value != ""){

                date = value
                var first = value+" 00:01"
                first = toTimestamp(first)

                var second = value+" 23:59"
                second = toTimestamp(second)


                Swal.fire({
                    title: 'En breves se descargará el archivo!',
                    timer: 4000,
                    timerProgressBar: true,
                    didOpen: () => {
                      Swal.showLoading()
                    },
                  })

                  db.collection("incidents").where("date", ">=" ,first).where("date","<=",second).get().then((query) =>{

                    var ctx = 0
        
                    query.forEach(data => {
                        ctx++
                        var gender = ""
        
                        if(data.data().gender == "male"){
        
                            gender = "Macho"
        
                        }else{
                            gender = "Hembra"
                        }
                        incidents.push([ctx,data.data().cow,gender,data.data().signs,data.data().description,data.data().user])
                    });
        
                    if(ctx != 0){
                        printIncident(incidents,date)
                    }else{
                        Swal.fire(
                            'Oopss!',
                            'No existen datos!',
                            'warning'
                          )
                    }
        
                    console.log(incidents)
                    
        
                })


              }else{

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
                    icon: 'error',
                    title: 'Seleccione una fecha'
                  })
              }  

            } 
          })
    }else{
        Swal.fire({
            title: 'En breves se descargará el archivo!',
            timer: 4000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
            },
          })


          db.collection("incidents").get().then((query) =>{

            var ctx = 0

            query.forEach(data => {
                ctx++
                var gender = ""

                if(data.data().gender == "male"){

                    gender = "Macho"

                }else{
                    gender = "Hembra"
                }
                incidents.push([ctx,data.data().cow,gender,data.data().signs,data.data().description,data.data().user])
            });

            if(ctx != 0){
                date = onlyDateNumber(Date.now())
                printIncident(incidents,date)
            }else{
                Swal.fire(
                    'Oopss!',
                    'No existen datos!',
                    'warning'
                  )
            }

            console.log(incidents)
            

        })

    }
}


function printUsers(array,type){
   
    var doc = new jspdf.jsPDF()
    doc.setFontSize(26)
    doc.text(30, 16, "Cow Manager")
    doc.setFontSize(9)
    doc.text(30, 22, "Lista de usuarios : "+onlyDateNumber(Date.now()))
    doc.setFontSize(9)
    doc.text(155, 14, "RUC : "+"121212121212")
    doc.text(155, 19, "Direccion : "+"Jr.Los girasoles Mz6 L9")
    doc.text(155, 24, "Teléfono : "+"+51989280394")
    doc.setFontSize(12)
    doc.addImage('/dashboard/assets/imgs/cowlogo.png', 'JPEG', 7, 2, 20, 20)
      doc.autoTable({
      head: [['#','Apellidos y Nombres','Tipo de usuario','DNI','Teléfono','Correo']],
      body: array,
      theme: 'grid',
      styles : { halign : 'center'},
     headStyles :{fillColor : [0, 142, 138]}, 
     alternateRowStyles: {fillColor : [238, 255, 254]}, 
     tableLineColor: [0, 142, 138], 
     tableLineWidth: 0.1,
     margin: {top: 32},
      })
      doc.save(type+'_'+onlyDateNumber(Date.now())+'.pdf')
  
  }

  function printIllness(array,type){

    if(type == "all"){
        type = "Reporte de enfermedades : "
    }else{
        type = "Reporte de la enfermedad "+type+" : "
    }
   
    var doc = new jspdf.jsPDF()
    doc.setFontSize(26)
    doc.text(30, 16, "Cow Manager")
    doc.setFontSize(9)
    doc.text(30, 22, type+onlyDateNumber(Date.now()))
    doc.setFontSize(9)
    doc.text(155, 14, "RUC : "+"121212121212")
    doc.text(155, 19, "Direccion : "+"Jr.Los girasoles Mz6 L9")
    doc.text(155, 24, "Teléfono : "+"+51989280394")
    doc.setFontSize(12)
    doc.addImage('/dashboard/assets/imgs/cowlogo.png', 'JPEG', 7, 2, 20, 20)
      doc.autoTable({
      head: [['#','ID de Vaca','Género','Enfermedad']],
      body: array,
      theme: 'grid',
      styles : { halign : 'center'},
     headStyles :{fillColor : [0, 142, 138]}, 
     alternateRowStyles: {fillColor : [238, 255, 254]}, 
     tableLineColor: [0, 142, 138], 
     tableLineWidth: 0.1,
     margin: {top: 32},
      })
      doc.save(type+'_'+onlyDateNumber(Date.now())+'.pdf')
  
  }

  function printIncident(array,date){

    var doc = new jspdf.jsPDF()
    doc.setFontSize(26)
    doc.text(30, 16, "Cow Manager")
    doc.setFontSize(9)
    doc.text(30, 22, "Reporte de incidente : "+date)
    doc.setFontSize(9)
    doc.text(155, 14, "RUC : "+"121212121212")
    doc.text(155, 19, "Direccion : "+"Jr.Los girasoles Mz6 L9")
    doc.text(155, 24, "Teléfono : "+"+51989280394")
    doc.setFontSize(12)
    doc.addImage('/dashboard/assets/imgs/cowlogo.png', 'JPEG', 7, 2, 20, 20)
      doc.autoTable({
      head: [['#','ID de Vaca','Género','Enfermedad','Descripción','Reportado por']],
      body: array,
      theme: 'grid',
      styles : { halign : 'center'},
     headStyles :{fillColor : [0, 142, 138]}, 
     alternateRowStyles: {fillColor : [238, 255, 254]}, 
     tableLineColor: [0, 142, 138], 
     tableLineWidth: 0.1,
     margin: {top: 32},
      })
      doc.save('Reporte de incidentes'+'_'+date+'.pdf')
  
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

  function toTimestamp(strDate){
	var datum = Date.parse(strDate);
	return datum;
 }