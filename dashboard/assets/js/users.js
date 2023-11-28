let selector = document.getElementById("inputGroupSelectType"); 
createDatatable()

let cacheV = localStorage.getItem("users")
let vCache = JSON.parse(cacheV)


if(vCache == null){
  document.getElementById("bgspinner").style = "display:block;"
  getUsersFromDatabase()
}else{
  document.getElementById("bgspinner").style = "display:none;"
  getUsersFromCache()
}


   

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
    let button = '<button style="margin-left:10px;" onclick="showAddModal()" class="btn btn-dark">Agregar usuario</button>'
    $(button).appendTo('#tb-data_length')
}



function showAddModal(){
    $('#modalShow').modal('show')
  }
  
  function closeAddModal(){
    $('#modalShow').modal('hide')  
  }

  function closeEditModal(){
    $('#modalEdit').modal('hide')  
  }

 function modalEditUser(id,lastname,name,dni,phone,email){
    $('#modalEdit').modal('show')

    document.getElementById("ETIdUser").innerHTML = id

    document.getElementById("dniET").value = dni
    document.getElementById("fullnameET").value = name
    document.getElementById("phoneET").value = phone
    document.getElementById("lastnameET").value = lastname
    document.getElementById("emailET").value = email

 } 
  
  function clearInputs(){
    document.getElementById("dni").value = ""
    document.getElementById("fullname").value = ""
    document.getElementById("inputGroupSelectType").value = "0"
    document.getElementById("password").value = ""
    document.getElementById("phone").value = ""
    document.getElementById("lastname").value = ""
    document.getElementById("email").value = ""
}


function createUser(){

  let dni = document.getElementById("dni").value
  let lastname = document.getElementById("lastname").value
  let name = document.getElementById("fullname").value
  let type = document.getElementById("inputGroupSelectType").value
  let phone = document.getElementById("phone").value
  let password = document.getElementById("pass").value
  let email = document.getElementById("email").value

  if(dni != "" && lastname !="" && name != "" && type != "" && password != "" && email != ""){
  
    document.getElementById("onload").style = "display:block;"
    document.getElementById("btnCreateUser").style = "display:none;"
    document.getElementById("btnCancel").style = "display:none;"


    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user.uid;

    let data = {
      dni : dni,
      email : email,
      id : user,
      image : null,
      lastname : lastname,
      name : name,
      phone : phone,
      token : "",
      type : type,
      account : 1,
      pass:btoa(password)
    }

    db.collection("users").doc(user).set(data)
    document.getElementById("onload").style = "display:none;"
    document.getElementById("btnCreateUser").style = "display:block;"
    document.getElementById("btnCancel").style = "display:block;"
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
    document.getElementById("onload").style = "display:none;"
    document.getElementById("btnCreateUser").style = "display:block;"
    document.getElementById("btnCancel").style = "display:block;"
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

  db.collection("users").onSnapshot((querySnapshot) => {

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
          let btn = `<button onclick="modalDisable('${v.id}')" class="btn btn-danger">Eliminar</button>
          &nbsp;&nbsp;&nbsp;
          <button style="background-color:#2874A6;color:#fff;" 
          onclick="modalEditUser('${v.id}','${v.lastname}','${v.name}','${v.dni}','${v.phone}','${v.email}')" class="btn btn-light">Editar</button>
          `
    
          if(v.account == "0"){
            status = `<b style="color:red;">Eliminado<b>`
            btn = `<center><button onclick="modalEnable('${v.id}')" class="btn btn-success">Habilitar</button></center>`
          }

          let t = v.type
          let x = ""
    
          if(t == "1"){
            x = "Administrador"
          }else{
            x = "Editor"
          }

          if(v.type != "super_admin"){
            ctx++

            return `
            <tr style="cursor: pointer">
            <td><strong>${ctx}</strong></td>
            <td>${v.lastname+" "+v.name}</td>
            <td>${(v.dni)}</td>
            <td>${v.email}</td>
            <td>${v.phone}</td>
            <td>${status}</td>
            <td>${x}</td>
            <td>${btn}</td>
            </tr>`;
          }

        })
        .join("")
    );

    //console.log(students)
    createDatatable()
    localStorage.setItem("users",JSON.stringify(users))
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
      let btn = `<button onclick="modalDisable('${v.id}')" class="btn btn-danger">Eliminar</button>
           &nbsp;&nbsp;&nbsp;
          <button style="background-color:#2874A6;color:#fff;" 
          onclick="modalEditUser('${v.id}','${v.lastname}','${v.name}','${v.dni}','${v.phone}','${v.email}')" class="btn btn-light">Editar</button>
      `

      if(v.account == "0"){
        status = `<b style="color:red;">Eliminado<b>`
        btn = `<center><button onclick="modalEnable('${v.id}')" class="btn btn-success">Habilitar</button></center>`
      }

      let t = v.type
      let x = ""

      if(t == "1"){
        x = "Administrador"
      }else{
        x = "Editor"
      }

      if(v.type != "super_admin"){
        ctx++

        return `
        <tr style="cursor: pointer">
          <td><strong>${ctx}</strong></td>
          <td>${v.lastname+" "+v.name}</td>
          <td>${(v.dni)}</td>
          <td>${v.email}</td>
          <td>${v.phone}</td>
          <td>${status}</td>
          <td>${x}</td>
          <td>${btn}</td>
          </tr>`;
      }

     
     
    })
    .join("")
);

//console.log(students)
createDatatable()
document.getElementById("bgspinner").style = "display:none;"
getUsersFromDatabase() 

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
      db.collection("users").doc(id).update({account:"1"})
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
      db.collection("users").doc(id).update({account:"0"})
      Swal.fire('Eliminado!')
    }
  })
}

function validarEntrada(event) {
  const charCode = event.charCode;
  if (charCode < 48 || charCode > 57) {
    event.preventDefault(); // Evita la entrada del carácter
  }
}

function updateData(){
  let dni = document.getElementById("dniET").value
  let lastname = document.getElementById("lastnameET").value
  let name = document.getElementById("fullnameET").value
  let phone = document.getElementById("phoneET").value
  let id = document.getElementById("ETIdUser").innerHTML
  let email = document.getElementById("emailET").value

  let data = {
    dni : dni,
    lastname : lastname,
    name : name,
    phone : phone,
    email : email
  }

  if(dni != "" && lastname != "" && name != "" && phone != "" && email != ""){
    db.collection("users").doc(id).update(data)
    $('#modalEdit').modal('hide')
    Swal.fire('Datos actualizados!')
  }else{
    Swal.fire('Complete los campos!')
  }


}