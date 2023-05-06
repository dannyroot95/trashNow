let selector = document.getElementById("inputGroupSelectType"); 
var vehicles = []
createDatatable()

let cacheV = localStorage.getItem("drivers")
let vCache = JSON.parse(cacheV)

if(vCache == null){
  document.getElementById("bgspinner").style = "display:block;"
  getUsersFromDatabase()
}else{
  document.getElementById("bgspinner").style = "display:none;"
  getUsersFromCache()
}
getVehicles()

selector.addEventListener("change", () => {
      // if value switched by client
        if(selector.value == "1"){
            document.getElementById("li-b").style = "display:none;"
            document.getElementById("li").value = ""
        }else{
            document.getElementById("li-b").style = "display:flex;"
        }
      });
   

function createDatatable(){

  $('#tb-data').DataTable({
      language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ datos",
            "infoEmpty": "<b>Mostrando 0 to 0 of 0 datos</b>",
            "infoFiltered": "(Filtrado de _MAX_ total datos)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ datos",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar en la lista: ",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
     },scrollY: '50vh',scrollX: true, sScrollXInner: "100%",
     scrollCollapse: true,
    });

    var table = $('#tb-data').DataTable();
    $('#container').css( 'display', 'block' );
    table.columns.adjust().draw();
    document.getElementById("tb-data_filter").style = "margin-bottom:10px;"
    document.getElementById("tb-data_length").style = "margin-bottom:10px;"
    let button = '<button style="margin-left:10px;" onclick="showAddModal()" class="btn btn-primary">Agregar conductor</button>'
    $(button).appendTo('#tb-data_length')
}



function showAddModal(){
    $('#modalShow').modal('show')
  }
  
  function closeAddModal(){
    $('#modalShow').modal('hide')
  }

  function closeAddVehicle(){
    $('#addVehicle').modal('hide')
  }
  
  function clearInputs(){
    document.getElementById("dni").value = ""
    document.getElementById("fullname").value = ""
    document.getElementById("inputGroupSelectType").value = "0"
    document.getElementById("li").value = ""
    document.getElementById("password").value = ""
    document.getElementById("phone").value = ""
    document.getElementById("lastname").value = ""
}


function createUser(){

  let dni = document.getElementById("dni").value
  let lastname = document.getElementById("lastname").value
  let name = document.getElementById("fullname").value
  let type = document.getElementById("inputGroupSelectType").value
  let lic = document.getElementById("li").value
  let phone = document.getElementById("phone").value
  let password = document.getElementById("pass").value
  let email = document.getElementById("email").value

  if(dni != "" && lastname !="" && name != "" && type != "" && password != "" && email != ""){
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user.uid;

    let data = {
      dni : dni,
      brandCar : null,
      colorCar : null,
      email : email,
      id : user,
      image : null,
      lastname : lastname,
      licence : lic,
      name : name,
      phone : phone,
      plateNumber : null,
      token : "",
      type : type,
      account : "1",
      hasVehicle : "0"
    }

    db.collection("Drivers").doc(user).set(data)
    closeAddModal()
    Swal.fire(
      'Muy bien!',
      'Usuario creado!',
      'success'
    )
    clearInputs()

    // ...
  })
  .catch((error) => {

    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
  }else{
    Swal.fire(
      'Oops!',
      'Complete los campos!',
      'info'
    )
  }

}

function getUsersFromDatabase(){

  db.collection("Drivers").onSnapshot((querySnapshot) => {

    let ctx = 0

      users = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        
        $('#tb-data').DataTable().destroy()
        $("#tbody").html(
      users
        .map((v) => {

          let status = `<b style="color:green;">Activo<b>`
          let btn = `<button onclick="modalDisable('${v.id}')" class="btn btn-danger">Eliminar</button>`
          let hasVehicle = `<button onclick="showAddVehicle('${v.account}','${v.id}')" class="btn btn-danger"><ion-icon name="car-outline"></ion-icon></button>`
          let t = v.type
          let x = ""
          let plate = v.plateNumber
    
          if(v.account == "0"){
            status = `<b style="color:red;">Eliminado<b>`
            btn = `<button onclick="modalEnable('${v.id}')" class="btn btn-success">Habilitar</button>`
          }

    
          if(v.hasVehicle != "0"){
            hasVehicle = `<button onclick="showAddVehicle('${v.account}','${v.id}')" class="btn btn-success"><ion-icon name="car-outline"></ion-icon></button>`
          }
    
          if(t == "1"){
            x = "Co-conductor"
          }else{
            x = "Conductor"
          }

          
          if(plate == null ){
            plate = `<a style="color:red;">Sin registro</a>`
          }


          ctx++

          return `
          <tr style="cursor: pointer">
          <td><strong>${ctx}</strong></td>
          <td>${v.lastname+" "+v.name}</td>
          <td>${(v.dni)}</td>
          <td>${v.email}</td>
          <td>${v.phone}</td>
          <td>${v.licence}</td>
          <td>${status}</td>
          <td>${x}</td>
          <td><b><center>${plate}</center></b></td>
          <td>${hasVehicle}</td>
          <td>${btn}</td>
          </tr>`;
       
         
        })
        .join("")
    );

    //console.log(students)
    createDatatable()
    localStorage.setItem("drivers",JSON.stringify(users))
    document.getElementById("bgspinner").style = "display:none;"
     
           
  }, (error) => {
    console.log(error)
}); 

}

function getUsersFromCache(){

  let ctx = 0
   
    $('#tb-data').DataTable().destroy()
    $("#tbody").html(
  vCache
    .map((v) => {

      let status = `<b style="color:green;">Activo<b>`
          let btn = `<button onclick="modalDisable('${v.id}')" class="btn btn-danger">Eliminar</button>`
          let hasVehicle = `<button onclick="showAddVehicle('${v.account}','${v.id}')" class="btn btn-danger"><ion-icon name="car-outline"></ion-icon></button>`
          let t = v.type
          let x = ""
          let plate = v.plateNumber
    
          if(v.account == "0"){
            status = `<b style="color:red;">Eliminado<b>`
            btn = `<button onclick="modalEnable('${v.id}')" class="btn btn-success">Habilitar</button>`
          }

    
          if(v.hasVehicle != "0"){
            hasVehicle = `<button onclick="showAddVehicle('${v.account}','${v.id}')" class="btn btn-success"><ion-icon name="car-outline"></ion-icon></button>`
          }
    
          if(t == "1"){
            x = "Co-conductor"
          }else{
            x = "Conductor"
          }

          if(plate == null ){
            plate = `<a style="color:red;">Sin registro</a>`
          }


      ctx++

        return `
        <tr style="cursor: pointer">
          <td><strong>${ctx}</strong></td>
          <td>${v.lastname+" "+v.name}</td>
          <td>${(v.dni)}</td>
          <td>${v.email}</td>
          <td>${v.phone}</td>
          <td>${v.licence}</td>
          <td>${status}</td>
          <td>${x}</td>
          <td><b><center>${plate}</center></b></td>
          <td>${hasVehicle}</td>
          <td>${btn}</td>
          </tr>`;
     
    })
    .join("")
);

//console.log(students)
createDatatable()
document.getElementById("bgspinner").style = "display:none;"
getUsersFromDatabase() 

}

function showAddVehicle(account,id){
  if(account != "0"){
    $('#addVehicle').modal('show')
    document.getElementById("id").innerHTML = id
  }else{
    Swal.fire(
      'Error!',
      'No se puede agregar vehiculo a este usuario!',
      'warning'
    )
  }
}


function modalEnable(id){
  Swal.fire({
    title: 'Esta seguro de <b style="color:green;">habilitar</b> esta cuenta?',
    showDenyButton: true,
    confirmButtonText: 'Si',
    denyButtonText: `No`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      db.collection("Drivers").doc(id).update({account:"1"})
      Swal.fire('Habilitado')
    }
  })
}

function modalDisable(id){
  Swal.fire({
    title: 'Esta seguro de <b style="color:red;">eliminar</b> esta cuenta?',
    showDenyButton: true,
    confirmButtonText: 'Si',
    denyButtonText: `No`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      db.collection("Drivers").doc(id).update({
        account:"0",
        hasVehicle : "0",
        plateNumber : null
      })
      Swal.fire('Eliminado!')
    }
  })
}

function getVehicles(){
  db.collection("vehicles").get().then((querySnapshot) =>{
    querySnapshot.forEach(element => {
      let option = `<option value="${element.data().placa}">${element.data().placa}</option>`
      $(option).appendTo('#inputGroupSelectVehicle')
    });
    document.getElementById("wait").style = "display:none;"
    document.getElementById("selectV").style = "display:flex;"
    document.getElementById("asing").disabled = false
  })
}

function asing(){
  //plateNumber
  let id = document.getElementById("id").innerHTML
  let plate = document.getElementById("inputGroupSelectVehicle").value

  db.collection("Drivers").doc(id).update({
    plateNumber:plate,
    hasVehicle:"1"
  })

  closeAddVehicle()

  Swal.fire(
    'Muy bien!',
    'Vehiculo asignado!',
    'success'
  )


}